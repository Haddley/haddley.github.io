import { test, expect } from '@playwright/test';

// All tests run against the static build served at localhost:4567.
// WebGPU is not available in headless Chrome, so every test that opens the
// panel will see the "unsupported" state — the model never loads and the
// input row is never shown. That is the correct testable surface.

test.describe('Blog Agent — chat bubble', () => {
  test('bubble is visible on the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Open AI assistant' })).toBeVisible();
  });

  test('bubble is visible on the posts listing', async ({ page }) => {
    await page.goto('/posts/');
    await expect(page.getByRole('button', { name: 'Open AI assistant' })).toBeVisible();
  });

  test('bubble is visible on a post page', async ({ page }) => {
    await page.goto('/posts/localagent/');
    await expect(page.getByRole('button', { name: 'Open AI assistant' })).toBeVisible();
  });
});

test.describe('Blog Agent — panel open / close', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking bubble opens the panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText('Blog AI Assistant')).toBeVisible();
  });

  test('clicking bubble again closes the panel', async ({ page }) => {
    const bubble = page.getByRole('button', { name: 'Open AI assistant' });
    await bubble.click();
    await expect(page.getByText('Blog AI Assistant')).toBeVisible();
    // aria-label flips to "Close AI assistant" when open
    await page.getByRole('button', { name: 'Close AI assistant' }).click();
    await expect(page.getByText('Blog AI Assistant')).not.toBeVisible();
  });

  test('panel header shows "Powered by WebLLM" subtitle', async ({ page }) => {
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText('Powered by WebLLM')).toBeVisible();
  });

  test('New chat button is present in the panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByRole('button', { name: 'Start new chat' })).toBeVisible();
  });

  test('input row is not shown before model is ready', async ({ page }) => {
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByPlaceholder('Ask about the blog…')).not.toBeVisible();
  });
});

test.describe('Blog Agent — WebGPU unsupported state', () => {
  test('shows unsupported message when WebGPU is unavailable', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    // Wait up to 8 s for the unsupported message to appear after the model
    // load attempt fails (the component checks navigator.gpu on open).
    await expect(page.getByText(/WebGPU is required/i)).toBeVisible({ timeout: 8000 });
  });

  test('does not show a Retry button for the unsupported state', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText(/WebGPU is required/i)).toBeVisible({ timeout: 8000 });
    // Retry button only appears on 'error', not 'unsupported'
    await expect(page.getByRole('button', { name: 'Retry' })).not.toBeVisible();
  });
});

test.describe('Blog Agent — panel on different pages', () => {
  test('panel opens correctly on a category page', async ({ page }) => {
    await page.goto('/posts/category/azure/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText('Blog AI Assistant')).toBeVisible();
  });

  test('panel opens correctly on the categories overview', async ({ page }) => {
    await page.goto('/categories/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText('Blog AI Assistant')).toBeVisible();
  });
});
