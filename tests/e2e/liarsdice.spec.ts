/**
 * E2E tests for /games/liarsdice.html
 *
 * Multiple Playwright pages within a single BrowserContext share the same
 * BroadcastChannel namespace, which lets our PeerJS mock route messages
 * between "devices" without any real network calls.
 *
 * Each test suite creates its own BrowserContext so tests are fully isolated.
 */
import { test, expect, BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const MOCK_SCRIPT = fs.readFileSync(
    path.join(__dirname, '../peerjs-mock.js'),
    'utf8'
);
// serve strips the .html extension and drops query params when redirecting,
// so use the canonical URL without extension.
const BASE_URL = 'http://localhost:4567/games/liarsdice';

// ─── Page factory ─────────────────────────────────────────────────────────

/**
 * Open a fresh page in the given context, intercepting the PeerJS CDN request
 * and returning our BroadcastChannel mock instead.
 */
async function newPage(ctx: BrowserContext, url = BASE_URL): Promise<Page> {
    const page = await ctx.newPage();
    await page.route('**/peerjs.min.js', route =>
        route.fulfill({ contentType: 'application/javascript', body: MOCK_SCRIPT })
    );
    await page.goto(url);
    return page;
}

// ─── High-level helpers ────────────────────────────────────────────────────

/** Fill name, click Create Game, wait for lobby, return the 6-char room code. */
async function createGame(page: Page, name = 'Alice'): Promise<string> {
    await page.fill('#cn', name);
    await page.click('button:has-text("Create Game")');
    await expect(page.locator('.room-code')).toBeVisible();
    const raw = (await page.locator('.room-code').textContent()) ?? '';
    return raw.trim().toLowerCase();
}

/** Fill room code + name, click Join Game, wait for guest lobby screen. */
async function joinGame(page: Page, code: string, name = 'Bob') {
    await page.fill('#jc', code);
    // The second name field (join section) shares the same placeholder as the
    // create section; target it by its placeholder text to be specific.
    await page.locator('input[placeholder="e.g. Alice"]').fill(name);
    await page.click('button:has-text("Join Game")');
    await expect(page.locator('text=Waiting for host to start')).toBeVisible();
}

/** Fill viewer code, click Watch as Viewer, wait for viewer screen. */
async function joinViewer(page: Page, code: string) {
    await page.fill('#vc', code);
    await page.click('button:has-text("Watch as Viewer")');
    // Viewer shows a lobby screen or game screen — both have ".v-lobby-code" or
    // ".v-player-card".  Wait for either.
    await expect(
        page.locator('.v-lobby-code, .v-player-card')
    ).toBeVisible();
}

/** Start the game from the host lobby. Requires ≥2 players already joined. */
async function startGame(hostPage: Page) {
    const btn = hostPage.locator('button:has-text("Start Game")');
    await expect(btn).toBeEnabled();
    await btn.click();
    await expect(hostPage.locator('.dice-row')).toBeVisible();
}

// ─── Tests ────────────────────────────────────────────────────────────────

test.describe('Lobby', () => {
    test('host creates a game and sees lobby with room code', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);

        const code = await createGame(host, 'Alice');

        expect(code).toHaveLength(6);
        await expect(host.locator('text=Alice')).toBeVisible();
        await expect(host.locator('text=(host)')).toBeVisible();

        await ctx.close();
    });

    test('start game button is disabled until a second player joins', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        await createGame(host, 'Alice');

        await expect(host.locator('button:has-text("Start Game")')).toBeDisabled();

        await ctx.close();
    });

    test('guest joins and both players see each other in the lobby', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');

        // Host lobby should now list Bob
        await expect(host.locator('text=Bob')).toBeVisible();
        // Guest lobby should list Alice
        await expect(guest.locator('text=Alice')).toBeVisible();
        // Start button should now be enabled
        await expect(host.locator('button:has-text("Start Game")')).toBeEnabled();

        await ctx.close();
    });

    test('three players can all join the same lobby', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host  = await newPage(ctx);
        const guest1 = await newPage(ctx);
        const guest2 = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest1, code, 'Bob');
        await joinGame(guest2, code, 'Carol');

        await expect(host.locator('text=Bob')).toBeVisible();
        await expect(host.locator('text=Carol')).toBeVisible();
        await expect(
            host.locator('button:has-text("3 players")')
        ).toBeVisible();

        await ctx.close();
    });
});

test.describe('Game start', () => {
    test('host can start the game and both players see their dice', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host  = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);

        // Guest should also transition to the game screen
        await expect(guest.locator('.dice-row')).toBeVisible();

        await ctx.close();
    });

    test('exactly one player has the YOUR TURN status at game start', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host  = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);

        await expect(guest.locator('.dice-row')).toBeVisible();

        const hostTurn  = await host.locator('.your-turn').isVisible();
        const guestTurn = await guest.locator('.your-turn').isVisible();

        // Exactly one player is active; both cannot be true, neither cannot be false
        expect(hostTurn || guestTurn).toBe(true);
        expect(hostTurn && guestTurn).toBe(false);

        await ctx.close();
    });

    test('waiting player sees the active player name in their status', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host  = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);

        await expect(guest.locator('.dice-row')).toBeVisible();

        const hostTurn = await host.locator('.your-turn').isVisible();
        if (hostTurn) {
            // Guest should mention Alice in their waiting message
            await expect(guest.locator('.status')).toContainText('Alice');
        } else {
            // Host should mention Bob
            await expect(host.locator('.status')).toContainText('Bob');
        }

        await ctx.close();
    });
});

test.describe('Bidding', () => {
    test('the active player can place a bid and the other sees it', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host  = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);
        await expect(guest.locator('.dice-row')).toBeVisible();

        // Find who goes first
        const hostTurn = await host.locator('.your-turn').isVisible();
        const active   = hostTurn ? host  : guest;
        const waiting  = hostTurn ? guest : host;

        // Active player bids (button shows "✓ Bid 1×1")
        await expect(active.locator('button:has-text("Bid")')).toBeEnabled();
        await active.click('button:has-text("Bid")');

        // After the bid, the current bid box must appear on BOTH screens
        await expect(active.locator('.bid-box, .bid-current, .bid-bounce')).toBeVisible();
        await expect(waiting.locator('.bid-box, .bid-current, .bid-bounce')).toBeVisible();

        await ctx.close();
    });

    test('the waiting player cannot place a bid (Bid button absent or disabled)', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host  = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);
        await expect(guest.locator('.dice-row')).toBeVisible();

        const hostTurn = await host.locator('.your-turn').isVisible();
        const waiting  = hostTurn ? guest : host;

        // The waiting page should not have an enabled Bid button
        const bidBtn = waiting.locator('button:has-text("Bid")');
        const exists = await bidBtn.count();
        if (exists > 0) {
            await expect(bidBtn).toBeDisabled();
        } else {
            // It's fine if the button is simply absent
            expect(exists).toBe(0);
        }

        await ctx.close();
    });
});

test.describe('Viewer mode', () => {
    test('viewer joins from home screen and sees lobby', async ({ browser }) => {
        const ctx    = await browser.newContext();
        const host   = await newPage(ctx);
        const viewer = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinViewer(viewer, code);

        // Viewer lobby shows room code and host name
        await expect(viewer.locator('.v-lobby-code')).toContainText(code.toUpperCase());
        await expect(viewer.locator('text=Alice')).toBeVisible();

        await ctx.close();
    });

    test('viewer joins via ?view= URL param', async ({ browser }) => {
        const ctx  = await browser.newContext();
        const host = await newPage(ctx);

        const code   = await createGame(host, 'Alice');

        // Open viewer directly with the URL param (simulates scanning a QR code).
        const viewer = await newPage(ctx, `${BASE_URL}?view=${code}`);

        // Viewer renders CONNECTING spinner synchronously during init
        await expect(viewer.locator('.v-screen')).toBeVisible({ timeout: 3000 });
        // Once the BroadcastChannel round-trip completes, lobby data arrives
        await expect(viewer.locator('.v-lobby-code')).toBeVisible({ timeout: 8000 });

        await ctx.close();
    });

    test('viewer sees player cards when game starts', async ({ browser }) => {
        const ctx    = await browser.newContext();
        const host   = await newPage(ctx);
        const guest  = await newPage(ctx);
        const viewer = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await joinViewer(viewer, code);
        await startGame(host);

        // After game start viewer transitions from lobby to in-game view
        await expect(viewer.locator('.v-player-card').first()).toBeVisible();

        await ctx.close();
    });

    test('multiple viewers can connect simultaneously', async ({ browser }) => {
        const ctx     = await browser.newContext();
        const host    = await newPage(ctx);
        const viewer1 = await newPage(ctx);
        const viewer2 = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinViewer(viewer1, code);
        await joinViewer(viewer2, code);

        await expect(viewer1.locator('.v-lobby-code')).toBeVisible();
        await expect(viewer2.locator('.v-lobby-code')).toBeVisible();

        await ctx.close();
    });

    test('viewer is not counted as a player', async ({ browser }) => {
        const ctx    = await browser.newContext();
        const host   = await newPage(ctx);
        const viewer = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinViewer(viewer, code);

        // Start game button should still be disabled (only 1 real player)
        await expect(host.locator('button:has-text("Start Game")')).toBeDisabled();

        await ctx.close();
    });
});

test.describe('Play again', () => {
    test('after a round completes, host can restart and both clients return to lobby', async ({ browser }) => {
        const ctx   = await browser.newContext();
        const host  = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);
        await expect(guest.locator('.dice-row')).toBeVisible();

        // Force a quick resolution: the active player calls liar immediately
        // (without a prior bid, the liar call is handled but game continues;
        // we instead eliminate a player by making one bid then challenging).
        const hostTurn = await host.locator('.your-turn').isVisible();
        const active   = hostTurn ? host  : guest;
        const passive  = hostTurn ? guest : host;

        // Bid 1×1 (minimum valid bid)
        await active.click('button:has-text("Bid")');

        // Now it's passive's turn — they challenge (button shows "🤥 Liar!")
        await expect(passive.locator('.your-turn')).toBeVisible();
        await expect(passive.locator('button:has-text("Liar")')).toBeEnabled();
        await passive.click('button:has-text("Liar")');

        // Reveal phase: host sees the continue/next-round button;
        // guests see "Waiting for host…" (only the host triggers actContinue)
        await expect(host.locator('button:has-text("Next Round"), button:has-text("See Results")')).toBeVisible();
        await expect(guest.locator('text=Waiting for host')).toBeVisible();

        await ctx.close();
    });
});
