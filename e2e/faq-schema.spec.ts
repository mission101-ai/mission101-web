import { test, expect, type Page } from '@playwright/test';

const SERVICES_WITH_FAQ = [
  'voice-agents',
  'ai-assistants',
  'digital-transformation-strategy',
  'marketing-automation',
];
const SERVICES_WITHOUT_FAQ = ['employee-training', 'custom-ai-solutions', 'ai-websites', 'business-analytics'];
const LANGS = ['en', 'ua'] as const;

type SchemaEntity = { '@type'?: string; [key: string]: unknown };
type FaqPage = { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };

async function getSchemaGraph(page: Page): Promise<SchemaEntity[]> {
  const text = await page.locator('script[type="application/ld+json"]').textContent();
  expect(text).toBeTruthy();
  const schema = JSON.parse(text!);
  return Array.isArray(schema['@graph']) ? schema['@graph'] : [schema];
}

function findFaqPage(graph: SchemaEntity[]): FaqPage | undefined {
  return graph.find((entity) => entity['@type'] === 'FAQPage') as FaqPage | undefined;
}

test.describe('FAQPage structured data', () => {
  for (const lang of LANGS) {
    for (const slug of SERVICES_WITH_FAQ) {
      test(`${lang}/services/${slug}/ exposes FAQPage matching the on-page FAQ, without JS`, async ({ browser }) => {
        const context = await browser.newContext({ javaScriptEnabled: false });
        const page = await context.newPage();
        await page.goto(`/${lang}/services/${slug}/`);

        const questions = await page.locator('main h3').allTextContents();
        expect(questions.length).toBeGreaterThanOrEqual(2);

        const graph = await getSchemaGraph(page);
        const faq = findFaqPage(graph);
        expect(faq, `expected FAQPage schema on /${lang}/services/${slug}/`).toBeTruthy();
        expect(faq!.mainEntity.map((q) => q.name)).toEqual(questions);

        await context.close();
      });
    }

    for (const slug of SERVICES_WITHOUT_FAQ) {
      test(`${lang}/services/${slug}/ emits no FAQPage schema (page has no FAQ content)`, async ({ browser }) => {
        const context = await browser.newContext({ javaScriptEnabled: false });
        const page = await context.newPage();
        await page.goto(`/${lang}/services/${slug}/`);

        const graph = await getSchemaGraph(page);
        expect(findFaqPage(graph)).toBeUndefined();

        await context.close();
      });
    }

    test(`${lang}/uzhhorod/ exposes FAQPage matching the on-page FAQ, without JS`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(`/${lang}/uzhhorod/`);

      const questions = await page.locator('#faq h3').allTextContents();
      expect(questions.length).toBeGreaterThanOrEqual(2);

      const graph = await getSchemaGraph(page);
      const faq = findFaqPage(graph);
      expect(faq, `expected FAQPage schema on /${lang}/uzhhorod/`).toBeTruthy();
      expect(faq!.mainEntity.map((q) => q.name)).toEqual(questions);

      await context.close();
    });
  }

  test('FAQPage schema coexists with Service and BreadcrumbList schema on a service page', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/services/voice-agents/');

    const graph = await getSchemaGraph(page);
    const types = graph.map((entity) => entity['@type']);
    expect(types).toContain('Service');
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');

    await context.close();
  });

  test('FAQPage schema coexists with LocalBusiness schema on the Uzhhorod page', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/uzhhorod/');

    const graph = await getSchemaGraph(page);
    const types = graph.map((entity) => entity['@type']);
    expect(types).toContain('LocalBusiness');
    expect(types).toContain('FAQPage');

    await context.close();
  });

  test('static (no-JS) and hydrated FAQPage schema are identical for a service page', async ({ page, browser }) => {
    const path = '/en/services/voice-agents/';

    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(path);
    const staticFaq = findFaqPage(await getSchemaGraph(noJsPage));
    await noJsContext.close();

    await page.goto(path, { waitUntil: 'networkidle' });
    const hydratedFaq = findFaqPage(await getSchemaGraph(page));

    expect(staticFaq).toBeTruthy();
    expect(hydratedFaq).toBeTruthy();
    expect(staticFaq).toEqual(hydratedFaq);
  });

  test('static (no-JS) and hydrated FAQPage schema are identical for the Uzhhorod page', async ({ page, browser }) => {
    const path = '/ua/uzhhorod/';

    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(path);
    const staticFaq = findFaqPage(await getSchemaGraph(noJsPage));
    await noJsContext.close();

    await page.goto(path, { waitUntil: 'networkidle' });
    const hydratedFaq = findFaqPage(await getSchemaGraph(page));

    expect(staticFaq).toBeTruthy();
    expect(hydratedFaq).toBeTruthy();
    expect(staticFaq).toEqual(hydratedFaq);
  });
});
