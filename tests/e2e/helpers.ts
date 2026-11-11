import { expect, type Page } from '@playwright/test';
import { readdirSync } from 'node:fs';

/** Every topic page in the wiki, so a new topic is tested without editing the tests. */
export const TOPIC_SLUGS: string[] = readdirSync('wiki/concepts')
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''));

/** Requests that are allowed to fail: analytics and fonts load from other sites and can be blocked. */
const IGNORED = /googletagmanager|google-analytics|googleapis|gstatic|doubleclick/;

export interface PageWatch {
  errors: string[];
  navigations: () => number;
}

/** Starts recording console errors, failed requests and top-level navigations. Call before page.goto. */
export function watch(page: Page): PageWatch {
  const errors: string[] = [];
  let navigations = 0;
  page.on('console', m => { if (m.type() === 'error' && !IGNORED.test(m.text())) errors.push(`console: ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => errors.push(`pageerror: ${String(e).slice(0, 200)}`));
  page.on('requestfailed', r => { if (!IGNORED.test(r.url()) && r.failure()?.errorText !== 'net::ERR_ABORTED') errors.push(`request failed: ${r.url().slice(0, 120)} (${r.failure()?.errorText})`); });
  page.on('response', r => { if (r.status() >= 400 && !IGNORED.test(r.url())) errors.push(`HTTP ${r.status()}: ${r.url().slice(0, 120)}`); });
  page.on('framenavigated', f => { if (f === page.mainFrame()) navigations++; });
  return { errors, navigations: () => navigations };
}

/** Scrolls the whole page once so lazily loaded images start loading, then returns to the top. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
  });
}

/**
 * Installs a scripted stand-in for the model before the page loads (the chat panel looks for
 * window.__mlcEngineOverride). Each call returns the next reply, repeating the last one; every request
 * is kept in window.__calls so a test can look at what the page sent.
 */
export async function installMockModel(page: Page, replies: string[]) {
  await page.addInitScript((scripted: string[]) => {
    let n = 0;
    const w = window as unknown as { __calls: { messages: { role: string; content: string }[] }[]; __mlcEngineOverride: unknown };
    w.__calls = [];
    w.__mlcEngineOverride = {
      chat: { completions: { create: async (args: { messages: { role: string; content: string }[] }) => {
        w.__calls.push({ messages: args.messages });
        return { choices: [{ message: { content: scripted[Math.min(n++, scripted.length - 1)] }, finish_reason: 'stop' }] };
      } } },
      interruptGenerate: () => {},
    };
  }, replies);
}

export async function openAssistant(page: Page) {
  await page.getByRole('button', { name: 'Open AI assistant' }).click();
  await expect(page.getByPlaceholder('Ask about the blog…')).toBeVisible();
}

export async function ask(page: Page, text: string) {
  await page.getByPlaceholder('Ask about the blog…').fill(text);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByPlaceholder('Ask about the blog…')).toBeEnabled({ timeout: 15_000 });
  await page.waitForTimeout(700);   // let the smooth scroll finish
}

export const chatPanel = (page: Page) => page.locator('div[style*="position: fixed"][style*="bottom: 92px"]');
export const chatScroller = (page: Page) => page.locator('[data-msg]').first().locator('xpath=..');
