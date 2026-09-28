import { test, expect, type Page } from '@playwright/test';

async function getMainText(page: Page): Promise<string> {
  const text = await page.locator('main').innerText();
  return text.replace(/\s+/g, ' ').trim();
}

test.describe('Static body content (no JavaScript execution)', () => {
  const routes: { path: string; expectSubstring: string }[] = [
    { path: '/en/', expectSubstring: 'Mission101' },
    { path: '/ua/', expectSubstring: 'Mission101' },
    { path: '/en/uzhhorod/', expectSubstring: 'Uzhhorod' },
    { path: '/en/services/voice-agents/', expectSubstring: 'voice agent' },
    { path: '/en/products/legal/', expectSubstring: 'Mission101 Legal' },
    { path: '/en/events/', expectSubstring: 'Events' },
  ];

  for (const { path, expectSubstring } of routes) {
    test(`${path} renders real main content without JavaScript`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(path);

      const text = await getMainText(page);
      expect(text.length).toBeGreaterThan(200);
      expect(text.toLowerCase()).toContain(expectSubstring.toLowerCase());

      await context.close();
    });
  }

  test('voice agents service page ships FAQ question and answer text without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/services/voice-agents/');

    const questions = await page.locator('main h3').allTextContents();
    const answers = await page.locator('main h3 + p').allTextContents();
    expect(questions.length).toBeGreaterThanOrEqual(2);
    expect(answers.length).toBe(questions.length);
    for (const answer of answers) {
      expect(answer.length).toBeGreaterThan(20);
    }

    await context.close();
  });

  test('Uzhhorod page ships FAQ question and answer text without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/uzhhorod/');

    const questions = await page.locator('#faq h3').allTextContents();
    const answers = await page.locator('#faq h3 + p').allTextContents();
    expect(questions.length).toBeGreaterThanOrEqual(2);
    expect(answers.length).toBe(questions.length);

    await context.close();
  });

  test('static and hydrated main content are identical for a service page', async ({ page, browser }) => {
    const path = '/en/services/ai-assistants/';

    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(path);
    const staticText = await getMainText(noJsPage);
    await noJsContext.close();

    await page.goto(path, { waitUntil: 'networkidle' });
    const hydratedText = await getMainText(page);

    expect(staticText).toBe(hydratedText);
  });

  test('static and hydrated main content are identical for the Uzhhorod page', async ({ page, browser }) => {
    const path = '/ua/uzhhorod/';

    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(path);
    const staticText = await getMainText(noJsPage);
    await noJsContext.close();

    await page.goto(path, { waitUntil: 'networkidle' });
    const hydratedText = await getMainText(page);

    expect(staticText).toBe(hydratedText);
  });

  test('hydration does not log a mismatch/failure on a prerendered route', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/en/services/marketing-automation/', { waitUntil: 'networkidle' });

    const relevant = errors.filter((message) => !/ERR_BLOCKED_BY_CLIENT/.test(message));
    expect(relevant).toEqual([]);
  });
});
