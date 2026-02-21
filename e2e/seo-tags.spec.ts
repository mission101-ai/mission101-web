import { test, expect } from '@playwright/test';

test.describe('SEO Tags', () => {
  test('root page should have correct canonical URL', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/');
  });

  test('/en page should have correct canonical URL', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/en/');
  });

  test('/ua page should have correct canonical URL', async ({ page }) => {
    await page.goto('/ua');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/ua/');
  });

  test('trailing slash routes should normalize to canonical without trailing slash', async ({ page }) => {
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mission101.ai/en/');
    expect(canonical).toMatch(/\/$/);
  });

  test('hreflang tags should be present on all pages', async ({ page }) => {
    const routes = ['/', '/en', '/ua'];
    
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      
      // Check for English alternate
      const enLink = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
      expect(enLink).toBe('https://mission101.ai/en/');
      
      // Check for Ukrainian alternate
      const ukLink = await page.locator('link[rel="alternate"][hreflang="uk"]').getAttribute('href');
      expect(ukLink).toBe('https://mission101.ai/ua/');
      
      // Check for x-default
      const defaultLink = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href');
      expect(defaultLink).toBeTruthy();
    }
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
    expect(ogImage).toContain('mission101-og-2026.png');
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
    expect(twitterImage).toContain('mission101-og-2026.png');
  });

  test('page title should reflect current language', async ({ page }) => {
    // English page
    await page.goto('/en/', { waitUntil: 'networkidle' });
    let title = await page.title();
    expect(title).toContain('Intelligent Automation');
    
    // Ukrainian page  
    await page.goto('/ua/', { waitUntil: 'networkidle' });
    title = await page.title();
    expect(title).toContain('Розумна Автоматизація');
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

