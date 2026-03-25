import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 20_000,
    expect: { timeout: 8_000 },
    fullyParallel: false,   // tests share a single serve process; avoid port conflicts
    workers: 1,
    reporter: 'list',
    use: {
        headless: true,
        ...devices['Desktop Chrome'],
    },
    webServer: {
        command: 'npx serve public -l 4567 --no-clipboard',
        url: 'http://localhost:4567',
        reuseExistingServer: !process.env.CI,
        timeout: 15_000,
    },
});
