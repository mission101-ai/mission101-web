import { test, expect } from '@playwright/test';

test.describe('i18n Routing', () => {
  test('root route should be accessible without 404', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeVisible();
  });

  test('/en route should be accessible without 404', async ({ page }) => {
    const response = await page.goto('/en', { waitUntil: 'networkidle' });
    expect([200, 301]).toContain(response?.status() || 0);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeAttached();
    await page.waitForLoadState('domcontentloaded');
  });

  test('/en/ route with trailing slash should be accessible', async ({ page }) => {
    const response = await page.goto('/en/', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeAttached();
    await page.waitForLoadState('domcontentloaded');
  });

  test('/ua route should be accessible without 404', async ({ page }) => {
    const response = await page.goto('/ua', { waitUntil: 'networkidle' });
    expect([200, 301]).toContain(response?.status() || 0);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeAttached();
    await page.waitForLoadState('domcontentloaded');
  });

  test('/ua/ route with trailing slash should be accessible', async ({ page }) => {
    const response = await page.goto('/ua/', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeAttached();
    await page.waitForLoadState('domcontentloaded');
  });

  test('invalid route should return 404 status', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    
    // Python HTTP server returns 404 for non-existent files
    expect(response?.status()).toBe(404);
  });

  test('different language routes serve different HTML', async ({ page }) => {
    // Get English page HTML
    await page.goto('/en/', { waitUntil: 'networkidle' });
    const enTitle = await page.title();
    
    // Get Ukrainian page HTML
    await page.goto('/ua/', { waitUntil: 'networkidle' });
    const uaTitle = await page.title();
    
    // Titles should be different for different languages
    expect(enTitle).not.toBe(uaTitle);
    expect(enTitle).toContain('Intelligent Automation');
    expect(uaTitle).toContain('Розумна Автоматизація');
  });

  test('language routes are accessible and distinct', async ({ page }) => {
    // Test that all language variations are accessible
    const routes = ['/', '/en', '/en/', '/ua', '/ua/'];
    
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      const status = response?.status();
      
      // Should either be 200 (direct) or 301 (redirect)
      expect([200, 301]).toContain(status || 0);
    }
  });

  test('HTML lang attribute should match route language', async ({ page }) => {
    // Test English route
    await page.goto('/en/', { waitUntil: 'networkidle' });
    
    let htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en');
    
    // Test Ukrainian route
    await page.goto('/ua/', { waitUntil: 'networkidle' });
    
    htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('uk');
  });

  test('routes without trailing slash redirect to version with trailing slash', async ({ page }) => {
    // Test that /en redirects to /en/
    await page.goto('/en', { waitUntil: 'networkidle' });
    expect(page.url()).toContain('/en/');
    expect(page.url()).toMatch(/\/en\/$/);
    
    // Test that /ua redirects to /ua/
    await page.goto('/ua', { waitUntil: 'networkidle' });
    expect(page.url()).toContain('/ua/');
    expect(page.url()).toMatch(/\/ua\/$/);
  });

  test('/en/ should render actual content, not blank page', async ({ page }) => {
    await page.goto('/en/', { waitUntil: 'networkidle' });
    
    // Wait for React to mount and render content
    await page.waitForSelector('#root', { state: 'attached' });
    
    // Check that root div has actual content (React has rendered)
    const rootContent = await page.locator('#root').innerHTML();
    expect(rootContent.length).toBeGreaterThan(100); // Should have substantial content
    
    // Verify specific content is visible (from HeroSection)
    await expect(page.locator('body')).toContainText('Mission101.ai');
  });

  test('/ua/ should render actual content, not blank page', async ({ page }) => {
    await page.goto('/ua/', { waitUntil: 'networkidle' });
    
    // Wait for React to mount and render content
    await page.waitForSelector('#root', { state: 'attached' });
    
    // Check that root div has actual content (React has rendered)
    const rootContent = await page.locator('#root').innerHTML();
    expect(rootContent.length).toBeGreaterThan(100); // Should have substantial content
    
    // Verify specific content is visible (from HeroSection)
    await expect(page.locator('body')).toContainText('Mission101.ai');
  });
});

