/**
 * E2E tests for /games/boggle.html
 */
import { test, expect, BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const MOCK_SCRIPT = fs.readFileSync(
    path.join(__dirname, '../peerjs-mock.js'),
    'utf8'
);
const BASE_URL = 'http://localhost:4567/games/boggle';

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

/** Fill host name, click Host Game, wait for lobby, return the 4-char room code. */
async function hostGame(page: Page, name = 'Alice'): Promise<string> {
    // First name input is in the "Host a New Game" card
    await page.locator('input[placeholder="Enter name"]').first().fill(name);
    await page.click('#btn-host');
    await expect(page.locator('.room-code')).toBeVisible();
    const raw = (await page.locator('.room-code').textContent()) ?? '';
    return raw.trim().toUpperCase();
}

/** Fill room code + name in join section, click Join Game, wait for guest lobby. */
async function joinGame(page: Page, code: string, name = 'Bob') {
    await page.locator('input[placeholder="4-letter code"]').first().fill(code.toUpperCase());
    // Second name input is in the "Join a Game" card
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
        await page.click('#btn-host');
        await expect(page.locator('.room-code')).toBeVisible();

        const stored = await page.evaluate(() => localStorage.getItem('boggle-name'));
        expect(stored).toBe('Alice');

        await ctx.close();
    });

    test('name is pre-populated from localStorage on reload', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.evaluate(() => localStorage.setItem('boggle-name', 'Stored'));
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
        const theme = await page.evaluate(() => localStorage.getItem('boggle-theme'));
        expect(theme).toBe('day');

        await ctx.close();
    });

    test('theme is restored on page reload', async ({ browser }) => {
        const ctx = await browser.newContext();
        const page = await newPage(ctx);

        await page.evaluate(() => localStorage.setItem('boggle-theme', 'day'));
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

        const code = await hostGame(host, 'Alice');

        expect(code).toHaveLength(4);
        expect(code).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/);
        await expect(host.locator('text=Alice')).toBeVisible();

        await ctx.close();
    });

    test('start game button is disabled until a second player joins', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        await hostGame(host, 'Alice');

        await expect(host.locator('button:has-text("Start Game")')).toBeDisabled();

        await ctx.close();
    });

    test('guest joins and both players see each other in the lobby', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await hostGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');

        await expect(host.locator('text=Bob')).toBeVisible();
        await expect(guest.locator('text=Alice')).toBeVisible();
        await expect(host.locator('button:has-text("Start Game")')).toBeEnabled();

        await ctx.close();
    });
});

test.describe('Viewer mode', () => {
    test('viewer joins from home screen and sees lobby', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const viewer = await newPage(ctx);

        const code = await hostGame(host, 'Alice');
        await joinViewer(viewer, code);

        await expect(viewer.locator('.v-lobby-code')).toContainText(code);
        await expect(viewer.locator('text=Alice')).toBeVisible();

        await ctx.close();
    });

    test('viewer is not counted as a player', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const viewer = await newPage(ctx);

        const code = await hostGame(host, 'Alice');
        await joinViewer(viewer, code);

        await expect(host.locator('button:has-text("Start Game")')).toBeDisabled();

        await ctx.close();
    });
});

test.describe('Game board', () => {
    test('game starts and both players see a 16-tile board', async ({ browser }) => {
        const ctx = await browser.newContext();
        const host = await newPage(ctx);
        const guest = await newPage(ctx);

        const code = await hostGame(host, 'Alice');
        await joinGame(guest, code, 'Bob');
        await startGame(host);

        // Both players should see a game board with 16 tiles
        await expect(host.locator('.tile, .board-cell, [class*="tile"]').first()).toBeVisible({ timeout: 10_000 });
        await expect(guest.locator('.tile, .board-cell, [class*="tile"]').first()).toBeVisible({ timeout: 10_000 });

        await ctx.close();
    });
});
