import { test, expect } from '@playwright/test';
import { watch, scrollThrough, TOPIC_SLUGS } from './helpers';

// These guard the published static site: pages load, nothing reloads itself, nothing is broken.
// (The reload loop that hit every /topics/ page came from a service worker that only existed in the
// static build, so a dev-server check could never see it.)

const PAGES = [
  '/', '/posts/', '/posts/localagent2/', '/posts/claudecode17/', '/posts/azuresearchvector/',
  '/categories/', '/categories/ai/', '/topics/',
  ...TOPIC_SLUGS.map(s => `/topics/${s}/`),
];

test.describe('every key page loads cleanly', () => {
  for (const path of PAGES) {
    test(path, async ({ page }) => {
      const w = watch(page);
      const res = await page.goto(path, { waitUntil: 'load' });
      expect(res?.status()).toBe(200);
      await page.waitForTimeout(2500);          // long enough for a reload loop to show itself
      expect(w.navigations(), 'the page reloaded itself').toBeLessThanOrEqual(3);
      expect(w.errors).toEqual([]);
      await expect(page.locator('h1, h3').first()).toBeVisible();
    });
  }
});

test.describe('no leftover service worker', () => {
  test('a visitor ends up with no cross-origin-isolation worker', async ({ page }) => {
    await page.goto('/posts/');
    await page.waitForTimeout(1500);
    const workers = await page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).map(r => (r.active ?? r.waiting ?? r.installing)?.scriptURL ?? ''));
    expect(workers.filter(u => u.includes('coi-serviceworker'))).toEqual([]);
  });

  test('a returning visitor who still has the old worker has it removed, and nothing loops', async ({ page }) => {
    // Install the old kind of worker (any worker at the old address stands in for it), then come back.
    await page.goto('/404.html');
    await page.evaluate(async () => {
      await navigator.serviceWorker.register('/coi-serviceworker.js');
      await navigator.serviceWorker.ready;
    });
    const w = watch(page);
    await page.goto('/topics/');
    await page.waitForTimeout(2500);
    const remaining = await page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length);
    expect(remaining).toBe(0);
    expect(w.navigations()).toBeLessThanOrEqual(3);
  });
});

test.describe('styles and images', () => {
  test('the Mobirise stylesheet is the pruned one, not the 3 MB export', async ({ request }) => {
    const res = await request.get('/assets/mobirise/css/mbr-additional.css');
    expect(res.status()).toBe(200);
    expect((await res.body()).length).toBeLessThan(100_000);
  });

  test('the page is styled: the menu bar has its navy background', async ({ page }) => {
    await page.goto('/');
    const bg = await page.locator('nav').first().evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    expect(bg).not.toBe('rgb(255, 255, 255)');
  });

  for (const path of ['/', '/posts/claudecode17/', '/posts/docker/', '/posts/azuresearchvector/']) {
    test(`every image loads on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'load' });
      await scrollThrough(page);
      await page.waitForTimeout(1500);
      const broken = await page.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src));
      expect(broken).toEqual([]);
    });
  }
});
