import { test, expect } from '@playwright/test';

// All tests run against the static build served at localhost:4567.
// The agent backend is not running during these tests, so every test that opens
// the panel sees the "not reachable" error state — the input row is never shown.
// That is the correct testable surface.

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

  test('panel header shows the hosted model subtitle', async ({ page }) => {
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText('Hosted model')).toBeVisible();
  });

  test('there is no model picker', async ({ page }) => {
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText('Choose a model')).not.toBeVisible();
    await expect(page.getByRole('radio')).toHaveCount(0);
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

test.describe('Blog Agent — backend unreachable state', () => {
  test('shows a friendly message when the backend is unreachable', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText(/not reachable right now/i)).toBeVisible({ timeout: 8000 });
  });

  test('offers a Retry button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible({ timeout: 8000 });
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
