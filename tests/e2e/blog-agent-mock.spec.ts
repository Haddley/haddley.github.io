import { test, expect, type Page } from '@playwright/test';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Register a scripted mock engine via addInitScript so it is available
 *  before React hydrates. Must be called BEFORE page.goto(). */
async function injectMockEngine(page: Page, responses: string[]) {
  await page.addInitScript((resps) => {
    let i = 0;
    window.__mlcEngineOverride = {
      chat: {
        completions: {
          create: async () => ({
            choices: [{
              message: { content: resps[Math.min(i++, resps.length - 1)] },
              finish_reason: 'stop',
            }],
          }),
        },
      },
      interruptGenerate: () => {},
    };
  }, responses);
}

/** Open the panel, click Load model (uses the override), wait for input. */
async function openAndLoad(page: Page) {
  await page.getByRole('button', { name: 'Open AI assistant' }).click();
  await page.getByRole('button', { name: 'Load model' }).click();
  await expect(page.getByPlaceholder('Ask about the blog…')).toBeVisible();
}

/** Type a message and send it. */
async function sendMessage(page: Page, text: string) {
  await page.getByPlaceholder('Ask about the blog…').fill(text);
  await page.getByRole('button', { name: 'Send' }).click();
}

/** Wait for the agent to finish thinking (input re-enables). */
async function waitForResponse(page: Page) {
  await expect(page.getByPlaceholder('Ask about the blog…')).toBeEnabled({ timeout: 15_000 });
}

// ---------------------------------------------------------------------------
// Model selector UI
// ---------------------------------------------------------------------------

test.describe('Blog Agent — model selector', () => {
  test('shows all three model options', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByText('Qwen2.5 7B')).toBeVisible();
    await expect(page.getByText('Qwen2.5 3B')).toBeVisible();
    await expect(page.getByText('Qwen2.5 1.5B')).toBeVisible();
  });

  test('Load model button is present', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await expect(page.getByRole('button', { name: 'Load model' })).toBeVisible();
  });

  test('mock engine skips GPU check and goes straight to ready', async ({ page }) => {
    await injectMockEngine(page, ['Hello!']);
    await page.goto('/');
    await openAndLoad(page);
    await expect(page.getByPlaceholder('Ask about the blog…')).toBeVisible();
  });

  test('header shows selected model label when ready', async ({ page }) => {
    await injectMockEngine(page, ['Hello!']);
    await page.goto('/');
    await page.getByRole('button', { name: 'Open AI assistant' }).click();
    await page.getByLabel('Qwen2.5 3B').check();
    await page.getByRole('button', { name: 'Load model' }).click();
    await expect(page.getByPlaceholder('Ask about the blog…')).toBeVisible();
    await expect(page.getByText('Qwen2.5 3B · local WebGPU')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Direct text response (no tool call)
// ---------------------------------------------------------------------------

test.describe('Blog Agent — direct text response', () => {
  test('renders a plain-text answer', async ({ page }) => {
    await injectMockEngine(page, [
      'WebGPU is a modern web API for GPU-accelerated graphics and compute.',
    ]);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'What is WebGPU?');
    await waitForResponse(page);
    await expect(page.getByText('WebGPU is a modern web API')).toBeVisible();
  });

  test('renders markdown links in the response', async ({ page }) => {
    await injectMockEngine(page, [
      'Check out [Local Agent](/posts/localagent/) for an example.',
    ]);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'Any posts about agents?');
    await waitForResponse(page);
    await expect(page.getByRole('link', { name: 'Local Agent' })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// ```json tool call format (primary — what smaller models produce)
// ---------------------------------------------------------------------------

test.describe('Blog Agent — ```json tool call format', () => {
  test('executes a category search and renders the result', async ({ page }) => {
    await injectMockEngine(page, [
      '```json\n{"name":"get_posts_by_category","arguments":{"category":"Java"}}\n```',
      'Here are the Java posts on the blog.',
    ]);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'Any Java posts?');
    await waitForResponse(page);
    await expect(page.getByText('Here are the Java posts on the blog.')).toBeVisible();
  });

  test('executes a keyword search and renders the result', async ({ page }) => {
    await injectMockEngine(page, [
      '```json\n{"name":"search_posts","arguments":{"query":"azure functions"}}\n```',
      'I found several posts about Azure Functions.',
    ]);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'Search for Azure functions');
    await waitForResponse(page);
    await expect(page.getByText('I found several posts about Azure Functions.')).toBeVisible();
  });

  test('strips code block from final text answer if model leaks it', async ({ page }) => {
    await injectMockEngine(page, ['```\nHere is my answer.\n```']);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'Hello');
    await waitForResponse(page);
    await expect(page.getByText('```')).not.toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Preamble before the tool call (common 1.5B behaviour)
// ---------------------------------------------------------------------------

test.describe('Blog Agent — preamble before tool call', () => {
  test('strips preamble and still executes the tool', async ({ page }) => {
    await injectMockEngine(page, [
      "To find Java posts, I'll use get_posts_by_category.\n```json\n{\"name\":\"get_posts_by_category\",\"arguments\":{\"category\":\"Java\"}}\n```",
      'Here are the Java posts.',
    ]);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'Show me Java posts');
    await waitForResponse(page);
    await expect(page.getByText('Here are the Java posts.')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// <tool_call> tag fallback format
// ---------------------------------------------------------------------------

test.describe('Blog Agent — <tool_call> tag fallback', () => {
  test('parses a properly closed <tool_call> block', async ({ page }) => {
    await injectMockEngine(page, [
      '<tool_call>\n{"name":"list_categories","arguments":{}}\n</tool_call>',
      'The blog has 24 categories.',
    ]);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'What categories are there?');
    await waitForResponse(page);
    await expect(page.getByText('The blog has 24 categories.')).toBeVisible();
  });

  test('parses an unclosed <tool_call> block', async ({ page }) => {
    await injectMockEngine(page, [
      '<tool_call>\n{"name":"search_posts","arguments":{"query":"python"}}',
      'Here are some Python posts.',
    ]);
    await page.goto('/');
    await openAndLoad(page);
    await sendMessage(page, 'Python posts?');
    await waitForResponse(page);
    await expect(page.getByText('Here are some Python posts.')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Multi-turn conversation
// ---------------------------------------------------------------------------

test.describe('Blog Agent — multi-turn', () => {
  test('second message uses conversation history', async ({ page }) => {
    await injectMockEngine(page, [
      'I can help you find posts.',
      'Sure, here are the Azure posts.',
    ]);
    await page.goto('/');
    await openAndLoad(page);

    await sendMessage(page, 'Hello');
    await waitForResponse(page);
    await expect(page.getByText('I can help you find posts.')).toBeVisible();

    await sendMessage(page, 'Show Azure posts');
    await waitForResponse(page);
    await expect(page.getByText('Sure, here are the Azure posts.')).toBeVisible();
  });

  test('New chat clears messages', async ({ page }) => {
    await injectMockEngine(page, ['First response.', 'Second response.']);
    await page.goto('/');
    await openAndLoad(page);

    await sendMessage(page, 'Hello');
    await waitForResponse(page);
    await expect(page.getByText('First response.')).toBeVisible();

    await page.getByRole('button', { name: 'Start new chat' }).click();
    await expect(page.getByText('First response.')).not.toBeVisible();
  });
});
