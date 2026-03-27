/**
 * E2E tests for /games/ticktacktoe.html
 */
import { test, expect, BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const MOCK_SCRIPT = fs.readFileSync(
    path.join(__dirname, '../peerjs-mock.js'),
    'utf8'
);
const BASE_URL = 'http://localhost:4567/games/ticktacktoe';

// ─── Page factory ─────────────────────────────────────────────────────────

async function newPage(ctx: BrowserContext, url = BASE_URL): Promise<Page> {
    const page = await ctx.newPage();
    // ticktacktoe uses unpkg CDN (different version); mock it too
    await page.route('**/peerjs**', route =>
        route.fulfill({ contentType: 'application/javascript', body: MOCK_SCRIPT })
    );
    await page.goto(url);
    return page;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Fill name, click Create Game, wait for waiting screen, return the 4-char room code. */
async function createGame(page: Page, name = 'Alice'): Promise<string> {
    await page.fill('#player-name-input', name);
    await page.click('#create-game-btn');
    await expect(page.locator('#waiting-screen')).toHaveClass(/active/);
    const raw = (await page.locator('#room-code-text').textContent()) ?? '';
    return raw.trim().toUpperCase();
}

/** Fill name + room code, click Join, wait for game screen. */
async function joinGame(page: Page, code: string, name = 'Bob') {
    await page.fill('#player-name-input', name);
    await page.fill('#room-code-input', code.toUpperCase());
    await page.click('#join-game-btn');
    await expect(page.locator('#game-screen')).toHaveClass(/active/, { timeout: 10_000 });
}

// ─── Tests ────────────────────────────────────────────────────────────────

test.describe('Home screen', () => {
    test('name input persists to localStorage', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.fill('#player-name-input', 'Alice');
        await page.click('#create-game-btn');
        await expect(page.locator('#waiting-screen')).toHaveClass(/active/);

        const stored = await page.evaluate(() => localStorage.getItem('ttt-name'));
        expect(stored).toBe('Alice');

        await ctx.close();
    });

    test('name is pre-populated from localStorage on reload', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.evaluate(() => localStorage.setItem('ttt-name', 'Stored'));
        await page.reload();
        await page.route('**/peerjs**', route =>
            route.fulfill({ contentType: 'application/javascript', body: MOCK_SCRIPT })
        );

        const val = await page.locator('#player-name-input').inputValue();
        expect(val).toBe('Stored');

        await ctx.close();
    });

    test('room code input has maxlength=4', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        const max = await page.locator('#room-code-input').getAttribute('maxlength');
        expect(max).toBe('4');

        await ctx.close();
    });
});

test.describe('Theme toggle', () => {
    test('clicking theme button adds body.day class', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.click('#theme-btn');
        const hasDay = await page.evaluate(() => document.body.classList.contains('day'));
        expect(hasDay).toBe(true);

        await ctx.close();
    });

    test('theme is saved to localStorage', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.click('#theme-btn');
        const theme = await page.evaluate(() => localStorage.getItem('ttt-theme'));
        expect(theme).toBe('day');

        await ctx.close();
    });

    test('theme is restored on page reload', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.evaluate(() => localStorage.setItem('ttt-theme', 'day'));
        await page.reload();
        await page.route('**/peerjs**', route =>
            route.fulfill({ contentType: 'application/javascript', body: MOCK_SCRIPT })
        );

        const hasDay = await page.evaluate(() => document.body.classList.contains('day'));
        expect(hasDay).toBe(true);

        await ctx.close();
    });

    test('clicking theme button twice restores dark mode', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.click('#theme-btn');
        await page.click('#theme-btn');
        const hasDay = await page.evaluate(() => document.body.classList.contains('day'));
        expect(hasDay).toBe(false);

        await ctx.close();
    });
});

test.describe('Room code', () => {
    test('host creates game and sees a 4-char uppercase code', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);

        const code = await createGame(host, 'Alice');

        expect(code).toHaveLength(4);
        expect(code).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/);

        await ctx.close();
    });

    test('invalid code length shows an error', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.fill('#room-code-input', 'AB');
        await page.click('#join-game-btn');

        await expect(page.locator('#join-error')).toHaveClass(/show/);
        await expect(page.locator('#join-error')).toContainText('4-character');

        await ctx.close();
    });
});

test.describe('Multiplayer', () => {
    test('guest joins and game screen becomes active for both', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');

        // Host should also be on game screen
        await expect(host.locator('#game-screen')).toHaveClass(/active/, { timeout: 10_000 });

        await ctx.close();
    });

    test('player names are shown in the game header', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');

        await expect(host.locator('#game-screen')).toHaveClass(/active/, { timeout: 10_000 });

        // Host is X — their name should appear in the player-x span
        await expect(host.locator('#player-x span')).toContainText('Alice');
        // Guest is O — guest's name should appear in the player-o span
        await expect(host.locator('#player-o span')).toContainText('Bob');

        await ctx.close();
    });

    test('host plays X and guest plays O', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');

        await expect(host.locator('#game-screen')).toHaveClass(/active/, { timeout: 10_000 });

        // X always goes first; host is X so host should see "Your turn"
        await expect(host.locator('.game-status.your-turn')).toBeVisible();

        await ctx.close();
    });

    test('clicking a cell marks it and the opponent sees it', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');

        await expect(host.locator('#game-screen')).toHaveClass(/active/, { timeout: 10_000 });
        await expect(guest.locator('#game-screen')).toHaveClass(/active/, { timeout: 10_000 });

        // Host is X and goes first — click the first cell
        const cells = host.locator('.cell');
        await cells.first().click();

        // Guest's board should show X in that cell
        await expect(guest.locator('.cell').first()).toHaveClass(/x/, { timeout: 5_000 });

        await ctx.close();
    });
});
