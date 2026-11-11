import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 20_000,
    expect: { timeout: 8_000 },
    fullyParallel: false,   // tests share a single serve process; avoid port conflicts
    workers: 1,
    reporter: 'list',
    use: {
        // E2E_BASE_URL runs the tests against another address, for example the dev server on http://localhost:3000
        // (the service-worker and reload checks only mean something against the static build).
        baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:4567',
        headless: true,
        ...devices['Desktop Chrome'],
        // Run against a Chromium you already have (for example the Chrome for Testing in
        // ~/Library/Caches/ms-playwright) instead of the one `npx playwright install` downloads.
        launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {},
    },
    webServer: process.env.E2E_BASE_URL ? undefined : {
        command: 'npx serve out -l 4567 --no-clipboard',
        url: 'http://localhost:4567',
        reuseExistingServer: !process.env.CI,
        timeout: 15_000,
    },
});
