import { test, expect, type Page } from '@playwright/test';

const box = (page: Page) => page.getByPlaceholder(/Search posts by title/);
const found = (page: Page) => page.locator('p', { hasText: /^Found / });

test.describe('search on the posts page', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/posts/'); });

  test('the hint says it covers topics and categories', async ({ page }) => {
    await expect(box(page)).toHaveAttribute('placeholder', /topic/);
    await expect(box(page)).toHaveAttribute('placeholder', /category/);
  });

  test('a topic name shows a topic chip and the posts behind that topic', async ({ page }) => {
    await box(page).fill('docker');
    await expect(page.getByRole('link', { name: 'Topic: Docker' })).toHaveAttribute('href', '/topics/docker/');
    await expect(found(page)).toContainText(/ 1 topic/);   // ("docker" also matches the DevOps category by alias)
  });

  test('a category name shows category chips with counts in their tooltips', async ({ page }) => {
    await box(page).fill('3d');
    const chip = page.getByRole('link', { name: 'Category: 3D', exact: true });
    await expect(chip).toHaveAttribute('href', '/categories/3d/');
    await expect(chip).toHaveAttribute('title', /^Category page: all \d+ of my 3D posts$/);
    await expect(page.getByRole('link', { name: 'Category: 3D printing' })).toBeVisible();
    await expect(found(page)).toContainText('2 categories');
  });

  test('a word that is only in the wiki shows the sentence that matched', async ({ page }) => {
    await box(page).fill('reasoning');
    const snippet = page.locator('p', { hasText: /^From the wiki:/ }).first();
    await expect(snippet).toBeVisible({ timeout: 10_000 });
    await expect(snippet).toContainText(/reasoning/i);
    await expect(page.getByRole('link', { name: 'Blog AI Assistant (Part 2)' }).first()).toBeVisible();
  });

  test('a direct match also shows its wiki sentence', async ({ page }) => {
    await box(page).fill('gatekeeper');
    await expect(page.locator('p', { hasText: /^From the wiki:.*gatekeeper/i }).first()).toBeVisible({ timeout: 10_000 });
  });

  test('a very short word does not trigger wiki matching', async ({ page }) => {
    await box(page).fill('ai');
    await expect(found(page)).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page.locator('p', { hasText: /^From the wiki:/ })).toHaveCount(0);
  });

  test('nothing matches: says so, and clearing the box brings the posts back', async ({ page }) => {
    await box(page).fill('zzzzqqqq');
    await expect(page.getByText(/No posts found/)).toBeVisible();
    await box(page).fill('');
    await expect(page.getByText('Featured Posts')).toBeVisible();
  });

  test('the count reads naturally for one post', async ({ page }) => {
    await box(page).fill('gatekeeper in front of a hosted');
    await expect(found(page)).toHaveText(/^Found 1 post( |$)/, { timeout: 10_000 });
  });
});
