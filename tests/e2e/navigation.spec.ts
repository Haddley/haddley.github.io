import { test, expect } from '@playwright/test';

test.describe('from a post to its topics and categories', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/posts/claudecode17/'); });

  test('shows a topic pill with a specific tooltip', async ({ page }) => {
    const pill = page.locator('a[title^="Topic page:"]', { hasText: 'Claude Code' });
    await expect(pill).toBeVisible();
    await expect(pill).toHaveAttribute('title', /^Topic page: what \d+ of my posts say about Claude Code$/);
    await expect(pill).toHaveAttribute('href', '/topics/claude-code/');
  });

  test('shows category pills whose tooltip says how many posts the category holds', async ({ page }) => {
    const ai = page.locator('a[title^="Category page:"]', { hasText: /^AI$/ });
    await expect(ai).toHaveAttribute('title', /^Category page: all \d+ of my AI posts$/);
    await expect(ai).toHaveAttribute('href', /\/categories\/ai\/?$/);
  });

  test('the topic pill leads to the topic page', async ({ page }) => {
    await page.locator('a[title^="Topic page:"]', { hasText: 'Claude Code' }).click();
    await expect(page).toHaveURL(/\/topics\/claude-code\/$/);
    await expect(page.locator('h3').first()).toContainText('Claude Code');
  });

  test('the category pill leads to the category page, which lists its posts', async ({ page }) => {
    await page.locator('a[title^="Category page:"]', { hasText: /^AI$/ }).click();
    await expect(page).toHaveURL(/\/categories\/ai\/$/);
    expect(await page.locator('a[href^="/posts/"]').count()).toBeGreaterThan(20);
  });
});

test.describe('from a category to related topics', () => {
  test('a big category lists related topics, each leading to a topic page', async ({ page }) => {
    await page.goto('/categories/ai/');
    await expect(page.getByText('Related topics:')).toBeVisible();
    const pills = page.locator('a[title^="Topic page:"]');
    expect(await pills.count()).toBeGreaterThanOrEqual(2);
    await pills.first().click();
    await expect(page).toHaveURL(/\/topics\/[a-z0-9-]+\/$/);
  });

  test('a category with no matching topic shows no related-topics row', async ({ page }) => {
    await page.goto('/categories/maps/');
    await expect(page.getByText('Related topics:')).toHaveCount(0);
  });
});
