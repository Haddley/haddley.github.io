/**
 * E2E tests for /games/pit.html
 */
import { test, expect, BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const MOCK_SCRIPT = fs.readFileSync(
    path.join(__dirname, '../peerjs-mock.js'),
    'utf8'
);
const BASE_URL = 'http://localhost:4567/games/pit';

// ─── Page factory ─────────────────────────────────────────────────────────

async function newPage(ctx: BrowserContext, url = BASE_URL): Promise<Page> {
    const page = await ctx.newPage();
    await page.route('**/peerjs.min.js', route =>
        route.fulfill({ contentType: 'application/javascript', body: MOCK_SCRIPT })
    );
    await page.goto(url);
    return page;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Fill name, click Create Game, wait for lobby, return the 4-char room code. */
async function createGame(page: Page, name = 'Alice'): Promise<string> {
    await page.locator('input[placeholder="Enter name"]').first().fill(name);
    await page.click('#btn-create');
    await expect(page.locator('.room-code')).toBeVisible();
    const raw = (await page.locator('.room-code').textContent()) ?? '';
    return raw.trim().toUpperCase();
}

/** Fill room code + name in join section, click Join Game, wait for guest lobby. */
async function joinGame(page: Page, code: string, name = 'Bob') {
    await page.locator('input[placeholder="4-letter code"]').first().fill(code.toUpperCase());
    await page.locator('input[placeholder="Enter name"]').nth(1).fill(name);
    await page.click('#btn-join');
    await expect(page.locator('text=Waiting for host to start')).toBeVisible();
}

/** Fill viewer code, click Watch, wait for viewer screen. */
async function joinViewer(page: Page, code: string) {
    await page.locator('input[placeholder="4-letter code"]').nth(1).fill(code.toUpperCase());
    await page.click('button:has-text("Watch")');
    await expect(page.locator('.v-lobby-code, .v-screen')).toBeVisible();
}

/** Start the game from the host lobby. */
async function startGame(hostPage: Page) {
    const btn = hostPage.locator('button:has-text("Start Game")');
    await expect(btn).toBeEnabled();
    await btn.click();
}

// ─── Tests ────────────────────────────────────────────────────────────────

test.describe('Home screen', () => {
    test('name input persists to localStorage', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.locator('input[placeholder="Enter name"]').first().fill('Alice');
        await page.click('#btn-create');
        await expect(page.locator('.room-code')).toBeVisible();

        const stored = await page.evaluate(() => localStorage.getItem('pit-name'));
        expect(stored).toBe('Alice');

        await ctx.close();
    });

    test('name is pre-populated from localStorage on reload', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.evaluate(() => localStorage.setItem('pit-name', 'Stored'));
        await page.reload();
        await page.route('**/peerjs.min.js', route =>
            route.fulfill({ contentType: 'application/javascript', body: MOCK_SCRIPT })
        );

        const val = await page.locator('input[placeholder="Enter name"]').first().inputValue();
        expect(val).toBe('Stored');

        await ctx.close();
    });

    test('room code input has maxlength=4', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        const max = await page.locator('input[placeholder="4-letter code"]').first().getAttribute('maxlength');
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
        const theme = await page.evaluate(() => localStorage.getItem('pit-theme'));
        expect(theme).toBe('day');

        await ctx.close();
    });

    test('theme is restored on page reload', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.evaluate(() => localStorage.setItem('pit-theme', 'day'));
        await page.reload();
        await page.route('**/peerjs.min.js', route =>
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

test.describe('Lobby', () => {
    test('host creates a game and sees lobby with 4-char room code', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);

        const code = await createGame(host, 'Alice');

        expect(code).toHaveLength(4);
        expect(code).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/);
        await expect(host.locator('text=Alice')).toBeVisible();

        await ctx.close();
    });

    test('start game button is disabled with only one player', async ({ browser }) => {
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

        await expect(host.locator('text=Bob')).toBeVisible();
        await expect(guest.locator('text=Alice')).toBeVisible();

        await ctx.close();
    });
});

test.describe('Viewer mode', () => {
    test('viewer joins from home screen and sees lobby', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const viewer = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinViewer(viewer, code);

        await expect(viewer.locator('.v-lobby-code')).toContainText(code);
        await expect(viewer.locator('text=Alice')).toBeVisible();

        await ctx.close();
    });

    test('viewer is not counted as a player', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const viewer = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinViewer(viewer, code);

        await expect(host.locator('button:has-text("Start Game")')).toBeDisabled();

        await ctx.close();
    });

    test('viewer joins via ?view= URL param', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        const viewer = await newPage(ctx, `${BASE_URL}?view=${code}`);

        await expect(viewer.locator('.v-screen')).toBeVisible({ timeout: 3000 });
        await expect(viewer.locator('.v-lobby-code')).toBeVisible({ timeout: 8000 });

        await ctx.close();
    });
});

test.describe('Game start', () => {
    test('host can start the game with two players', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await createGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);

        // Both should see trading cards or game UI after start
        await expect(host.locator('.card-hand, .hand, [class*="card"]').first()).toBeVisible({ timeout: 10_000 });

        await ctx.close();
    });
});
