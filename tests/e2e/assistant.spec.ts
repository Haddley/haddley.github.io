import { test, expect } from '@playwright/test';
import { installMockModel, openAssistant, ask, chatPanel, chatScroller } from './helpers';

const LONG = Array.from({ length: 45 }, (_, i) => `Paragraph ${i + 1}: a deliberately long answer, so that the chat box has to scroll to show all of it.`).join('\n\n');

test.describe('starter questions', () => {
  const cases: [string, string][] = [
    ['/', 'What topics do you have?'],
    ['/posts/docker/', 'Summarise this post'],
    ['/categories/ai/', 'Summarise this category'],
    ['/topics/docker/', 'Summarise this topic'],
    ['/topics/', 'Which topic should I start with?'],
  ];
  for (const [path, question] of cases) {
    test(`${path} offers "${question}"`, async ({ page }) => {
      await installMockModel(page, ['ok']);
      await page.goto(path);
      await openAssistant(page);
      await expect(page.getByRole('button', { name: question })).toBeVisible();
    });
  }

  test('tapping one asks it', async ({ page }) => {
    await installMockModel(page, ['Here are the topics.']);
    await page.goto('/');
    await openAssistant(page);
    await page.getByRole('button', { name: 'What topics do you have?' }).click();
    await expect(page.getByText('Here are the topics.')).toBeVisible();
    await expect(page.locator('[data-msg="0"]')).toHaveText('What topics do you have?');   // sent as the visitor's message
    await expect(page.getByRole('button', { name: 'What topics do you have?' })).toHaveCount(0);   // the starters give way to the chat
  });
});

test.describe('the assistant knows which page it is on', () => {
  async function lastUserMessage(page: import('@playwright/test').Page) {
    return page.evaluate(() => {
      const calls = (window as unknown as { __calls: { messages: { role: string; content: string }[] }[] }).__calls;
      const msgs = calls[calls.length - 1].messages.filter(m => m.role === 'user');
      return msgs[msgs.length - 1].content;
    });
  }

  test('on a category page "this category" means that category', async ({ page }) => {
    await installMockModel(page, ['ok']);
    await page.goto('/categories/3d/');
    await openAssistant(page);
    await ask(page, 'summarise this category');
    const sent = await lastUserMessage(page);
    expect(sent).toContain('"3D" category page');
    expect(sent).toContain('get_posts_by_category with category "3D"');
  });

  test('on a topic page "this topic" names the topic', async ({ page }) => {
    await installMockModel(page, ['ok']);
    await page.goto('/topics/copilot-studio/');
    await openAssistant(page);
    await ask(page, 'summarise this topic');
    expect(await lastUserMessage(page)).toContain('get_topic with topic "copilot-studio"');
  });

  test('on a post page it names the post', async ({ page }) => {
    await installMockModel(page, ['ok']);
    await page.goto('/posts/docker/');
    await openAssistant(page);
    await ask(page, 'summarise post');
    expect(await lastUserMessage(page)).toContain('slug: "docker"');
  });
});

test.describe('conversation history', () => {
  test('stays small however long the chat goes', async ({ page }) => {
    await installMockModel(page, ['ok']);
    await page.goto('/');
    await openAssistant(page);
    for (let i = 1; i <= 6; i++) await ask(page, `question ${i}`);
    const sizes = await page.evaluate(() => (window as unknown as { __calls: { messages: unknown[] }[] }).__calls.map(c => c.messages.length));
    expect(sizes).toHaveLength(6);
    expect(Math.max(...sizes)).toBeLessThanOrEqual(8);        // system prompt + 6 remembered + the new question
    const last = await page.evaluate(() => (window as unknown as { __calls: { messages: { role: string }[] }[] }).__calls.at(-1)!.messages.map(m => m.role));
    expect(last[1]).toBe('user');                              // the window starts on a visitor message
  });

  test('sends only role and content, never the UI trace', async ({ page }) => {
    await installMockModel(page, ['one', 'two']);
    await page.goto('/');
    await openAssistant(page);
    await ask(page, 'first');
    await ask(page, 'second');
    const keys = await page.evaluate(() => [...new Set((window as unknown as { __calls: { messages: object[] }[] }).__calls.at(-1)!.messages.flatMap(m => Object.keys(m)))]);
    expect(keys.sort()).toEqual(['content', 'role']);
  });
});

test.describe('scrolling the chat', () => {
  test('a long answer starts at its first line, not its last', async ({ page }) => {
    await installMockModel(page, ['short', LONG]);
    await page.goto('/posts/');
    await openAssistant(page);
    await ask(page, 'one');
    await ask(page, 'a long one');
    const info = await page.evaluate(() => {
      const answer = document.querySelector('[data-msg="3"]') as HTMLElement;
      const scroller = answer.parentElement as HTMLElement;
      return {
        topInView: answer.getBoundingClientRect().top - scroller.getBoundingClientRect().top,
        canScroll: scroller.scrollHeight > scroller.clientHeight + 100,
        scrollTop: scroller.scrollTop,
      };
    });
    expect(info.canScroll).toBe(true);
    expect(info.scrollTop).toBeGreaterThan(0);
    expect(info.topInView).toBeGreaterThanOrEqual(-2);
    expect(info.topInView).toBeLessThan(40);
  });

  test('the panel keeps one height from empty to a long answer', async ({ page }) => {
    await installMockModel(page, [LONG]);
    await page.goto('/');
    await openAssistant(page);
    const empty = (await chatPanel(page).boundingBox())!.height;
    await ask(page, 'long');
    const full = (await chatPanel(page).boundingBox())!.height;
    expect(Math.abs(full - empty)).toBeLessThan(2);
  });

  test('wheeling past the end of the chat does not move the page behind it', async ({ page }) => {
    await installMockModel(page, [LONG]);
    await page.goto('/posts/');
    await openAssistant(page);
    await ask(page, 'long');
    const box = (await chatPanel(page).boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    for (let i = 0; i < 60; i++) await page.mouse.wheel(0, 500);
    await page.waitForTimeout(400);
    const scroller = chatScroller(page);
    const left = await scroller.evaluate(el => el.scrollHeight - el.scrollTop - el.clientHeight);
    expect(left).toBeLessThan(2);                              // the chat reached its end
    expect(await page.evaluate(() => window.scrollY)).toBe(0); // and the page did not move
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 390, height: 700 } });
    test('the panel fits above the chat button', async ({ page }) => {
      await installMockModel(page, ['ok']);
      await page.goto('/');
      await openAssistant(page);
      const box = (await chatPanel(page).boundingBox())!;
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(700 - 80);
      expect(box.x + box.width).toBeLessThanOrEqual(390);
    });
  });
});

test('the panel title links to the explanation of how the assistant works', async ({ page }) => {
  await installMockModel(page, ['ok']);
  await page.goto('/');
  await openAssistant(page);
  await expect(page.getByRole('link', { name: /Blog AI Assistant/ })).toHaveAttribute('href', /\/posts\/localagent2\/?$/);
});
