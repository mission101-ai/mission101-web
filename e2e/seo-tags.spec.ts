import { test, expect } from '@playwright/test';

test.describe('SEO Tags', () => {
  test('root page should have correct canonical URL', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/');
  });

  test('/en page should canonical to preferred English home (apex)', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/');
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBe('https://mission101.ai/');
  });

  test('/ua page should have correct canonical URL', async ({ page }) => {
    await page.goto('/ua');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/ua/');
  });

  test('/en/ trailing slash also canonicals to preferred English home', async ({ page }) => {
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/');
  });

  test('hreflang tags should be present on all pages', async ({ page }) => {
    const routes = ['/', '/en', '/ua'];
    
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      
      // Preferred English home is apex
      const enLink = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
      expect(enLink).toBe('https://mission101.ai/');
      
      const ukLink = await page.locator('link[rel="alternate"][hreflang="uk"]').getAttribute('href');
      expect(ukLink).toBe('https://mission101.ai/ua/');
      
      const defaultLink = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href');
      expect(defaultLink).toBe('https://mission101.ai/');
    }
  });

  test('homepage keeps Organization + WebSite JSON-LD after hydration', async ({ page }) => {
    await page.goto('/en/', { waitUntil: 'networkidle' });

    const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
    expect(schemaText).toBeTruthy();
    const schema = JSON.parse(schemaText!);
    const nodes = schema['@graph'] || [schema];
    const types = nodes.map((n: { '@type'?: string }) => n['@type']);
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');
  });

  test('service x-default targets English URL', async ({ page }) => {
    await page.goto('/en/services/voice-agents/', { waitUntil: 'networkidle' });

    const xDefault = await page
      .locator('link[rel="alternate"][hreflang="x-default"]')
      .getAttribute('href');
    expect(xDefault).toBe('https://mission101.ai/en/services/voice-agents/');

    const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
    const schema = JSON.parse(schemaText!);
    expect(schema['@type']).toBe('Service');
    expect(schema.url).toBe('https://mission101.ai/en/services/voice-agents/');
  });

  test('product static HTML head matches hydrated canonical/title', async ({ page, request }) => {
    const path = '/en/products/legal/';
    const staticRes = await request.get(path);
    expect(staticRes.ok()).toBeTruthy();
    const staticHtml = await staticRes.text();
    expect(staticHtml).toContain('Mission101 Legal');
    expect(staticHtml).toContain('rel="canonical" href="https://mission101.ai/en/products/legal/"');

    await page.goto(path, { waitUntil: 'networkidle' });
    expect(await page.title()).toContain('Mission101 Legal');
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://mission101.ai/en/products/legal/'
    );

    const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
    const schema = JSON.parse(schemaText!);
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.name).toBe('Mission101 Legal');
    expect(schema.url).toBe('https://mission101.ai/en/products/legal/');
  });

  test('events static HTML head matches hydrated canonical/title', async ({ page, request }) => {
    const path = '/en/events/';
    const staticRes = await request.get(path);
    expect(staticRes.ok()).toBeTruthy();
    const staticHtml = await staticRes.text();
    expect(staticHtml).toMatch(/<title>[^<]*Events[^<]*<\/title>/);
    expect(staticHtml).toContain('rel="canonical" href="https://mission101.ai/en/events/"');

    await page.goto(path, { waitUntil: 'networkidle' });
    expect(await page.title()).toContain('Events');
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://mission101.ai/en/events/'
    );
    expect(await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href')).toBe(
      'https://mission101.ai/en/events/'
    );
    expect(await page.locator('link[rel="alternate"][hreflang="uk"]').getAttribute('href')).toBe(
      'https://mission101.ai/ua/events/'
    );
    expect(
      await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href')
    ).toBe('https://mission101.ai/en/events/');
  });

  test('Uzhhorod LocalBusiness telephone is E.164', async ({ page }) => {
    await page.goto('/ua/uzhhorod/', { waitUntil: 'networkidle' });
    const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
    const schema = JSON.parse(schemaText!);
    expect(schema['@type']).toBe('LocalBusiness');
    expect(schema.telephone).toBe('+380974825097');
  });

  test('meta description should be present', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
  });

  test('Open Graph tags should be present', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check og:title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    // Check og:description
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
    
    // Check og:url
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBeTruthy();
    
    // Check og:image
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('mission101-og-1200x630.jpg');
  });

  test('Twitter Card tags should be present', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check twitter:card
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');
    
    // Check twitter:title
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toBeTruthy();
    
    // Check twitter:description
    const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
    expect(twitterDescription).toBeTruthy();
    
    // Check twitter:image
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toContain('mission101-og-1200x630.jpg');
  });

  test('page title should reflect current language', async ({ page }) => {
    // English page
    await page.goto('/en/', { waitUntil: 'networkidle' });
    let title = await page.title();
    expect(title).toContain('AI Automation');

    // Ukrainian page
    await page.goto('/ua/', { waitUntil: 'networkidle' });
    title = await page.title();
    expect(title).toContain('ШІ-автоматизації');
  });

  test('HTML lang attribute should match language for SEO', async ({ page }) => {
    // Test English
    await page.goto('/en/', { waitUntil: 'networkidle' });
    let htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en');
    
    // Test Ukrainian
    await page.goto('/ua/', { waitUntil: 'networkidle' });
    htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('uk');
  });

  test('og:locale should match language', async ({ page }) => {
    // Test English
    await page.goto('/en/', { waitUntil: 'networkidle' });
    let ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toBe('en_US');
    
    // Test Ukrainian
    await page.goto('/ua/', { waitUntil: 'networkidle' });
    ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toBe('uk_UA');
  });
});

