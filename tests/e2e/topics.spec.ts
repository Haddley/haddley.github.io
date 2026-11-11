import { test, expect } from '@playwright/test';
import { TOPIC_SLUGS } from './helpers';

test.describe('topics list', () => {
  test('lists every topic page with a summary and a link', async ({ page }) => {
    await page.goto('/topics/');
    const links = page.locator('a[href^="/topics/"][href$="/"]').filter({ hasText: 'Read the topic' });
    await expect(links).toHaveCount(TOPIC_SLUGS.length);
    await expect(page.getByRole('link', { name: 'Docker', exact: true }).first()).toBeVisible();
  });

  test('the menu has a Topics item between Categories and the icons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav').getByRole('link', { name: 'Topics' })).toBeVisible();
    await page.locator('nav').getByRole('link', { name: 'Topics' }).click();
    await expect(page).toHaveURL(/\/topics\/$/);
  });
});

test.describe('a topic page (Head First style)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/topics/docker/'); });

  test('opens with a question before the explanation, then the idea', async ({ page }) => {
    await expect(page.getByText('Before you read on')).toBeVisible();
    await expect(page.getByText('Brain Power')).toBeVisible();
    await expect(page.getByText('The idea').first()).toBeVisible();
    await expect(page.getByText('What I concluded').first()).toBeVisible();
  });

  test('every claim is a quotation that names and links its post', async ({ page }) => {
    const quotes = page.locator('blockquote');
    expect(await quotes.count()).toBeGreaterThanOrEqual(3);
    for (const q of await quotes.all()) {
      await expect(q.locator('a[href^="/posts/"]').first()).toBeVisible();
    }
  });

  test('ends with the trust question and lists the posts behind it', async ({ page }) => {
    await expect(page.getByText('Can I trust the quotes?')).toBeVisible();
    await expect(page.getByText('The posts behind this page')).toBeVisible();
    const posts = page.locator('ul li a[href^="/posts/"]');
    expect(await posts.count()).toBeGreaterThanOrEqual(5);
  });

  test('category pills carry a tooltip with a count and go to the category page', async ({ page }) => {
    const pill = page.locator('a[title^="Category page:"]').first();
    await expect(pill).toBeVisible();
    await expect(pill).toHaveAttribute('title', /^Category page: all \d+ of my .+ posts$/);
    const href = await pill.getAttribute('href');
    await pill.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });
});

test('a topic where the posts disagree shows a Watch it box', async ({ page }) => {
  await page.goto('/topics/power-automate-and-integration/');
  await expect(page.getByText('Watch it!')).toBeVisible();
});

test.describe('no broken links from the topic pages', () => {
  test('every internal link on every topic page resolves', async ({ page, request }) => {
    test.setTimeout(180_000);
    const targets = new Set<string>();
    for (const path of ['/topics/', ...TOPIC_SLUGS.map(s => `/topics/${s}/`)]) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      for (const href of await page.locator('a[href^="/"]').evaluateAll(as => as.map(a => (a as HTMLAnchorElement).getAttribute('href') as string))) {
        if (!href.startsWith('/_next') && !href.includes('#')) targets.add(href);
      }
    }
    expect(targets.size).toBeGreaterThan(100);
    const broken: string[] = [];
    for (const href of targets) {
      const res = await request.get(href);
      if (res.status() >= 400) broken.push(`${res.status()} ${href}`);
    }
    expect(broken).toEqual([]);
  });
});
