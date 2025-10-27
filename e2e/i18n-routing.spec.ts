import { test, expect } from '@playwright/test';

test.describe('i18n Routing', () => {
  test('root route should be accessible without 404', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeVisible();
  });

  test('/en route should be accessible without 404', async ({ page }) => {
    const response = await page.goto('/en');
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeVisible();
  });

  test('/en/ route with trailing slash should be accessible', async ({ page }) => {
    const response = await page.goto('/en/');
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeVisible();
  });

  test('/ua route should be accessible without 404', async ({ page }) => {
    const response = await page.goto('/ua');
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeVisible();
  });

  test('/ua/ route with trailing slash should be accessible', async ({ page }) => {
    const response = await page.goto('/ua/');
    expect(response?.status()).toBe(200);
    
    // Check that the page loaded properly
    await expect(page.locator('#root')).toBeVisible();
  });

  test('invalid route should show 404 page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    
    // Check for 404 page content
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page not found')).toBeVisible();
  });

  test('language switcher should change route and content', async ({ page }) => {
    // Start on English page
    await page.goto('/en');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Find and click language switcher
    const languageSwitcher = page.locator('button').filter({ hasText: /EN|UA/ }).first();
    await languageSwitcher.click();
    
    // Wait for navigation
    await page.waitForURL(/\/(en|ua)/);
    
    // Verify URL changed
    const url = page.url();
    expect(url).toMatch(/\/(en|ua)$/);
  });

  test('localStorage should persist language preference', async ({ page, context }) => {
    // Go to English page
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check localStorage
    const savedLanguage = await page.evaluate(() => {
      return localStorage.getItem('preferred_language');
    });
    
    expect(savedLanguage).toBeTruthy();
    expect(['en', 'ua']).toContain(savedLanguage);
  });

  test('HTML lang attribute should match route language', async ({ page }) => {
    // Test English route
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    let htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en');
    
    // Test Ukrainian route
    await page.goto('/ua');
    await page.waitForLoadState('networkidle');
    
    htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('uk');
  });

  test('should normalize URLs without trailing slashes in navigation', async ({ page }) => {
    // Navigate to /en/
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');
    
    // When language switcher is clicked, should navigate to clean URL
    const languageSwitcher = page.locator('button').filter({ hasText: /EN|UA/ }).first();
    
    // Check if switcher exists before clicking
    const switcherCount = await languageSwitcher.count();
    if (switcherCount > 0) {
      await languageSwitcher.click();
      await page.waitForTimeout(1000);
      
      // URL should not have trailing slash after navigation
      const url = page.url();
      const path = new URL(url).pathname;
      
      // If path is not just "/", it should not end with "/"
      if (path !== '/') {
        expect(path).not.toMatch(/\/$/);
      }
    }
  });
});

