import { test, expect } from '@playwright/test';

test.describe('Hash Navigation', () => {
  test.describe('Direct URL navigation with hash', () => {
    test('/ua/#contact should scroll to contact section', async ({ page }) => {
      await page.goto('/ua/#contact', { waitUntil: 'networkidle' });

      await expect(page.locator('#contact')).toBeAttached();
      await expect(page.locator('#contact')).toBeInViewport({ timeout: 10000 });
      expect(page.url()).toContain('#contact');
    });

    test('/ua/#services should scroll to services section', async ({ page }) => {
      await page.goto('/ua/#services', { waitUntil: 'networkidle' });

      await expect(page.locator('#services')).toBeAttached();
      await expect(page.locator('#services')).toBeInViewport({ timeout: 10000 });
      expect(page.url()).toContain('#services');
    });

    test('/en/#about should scroll to about section', async ({ page }) => {
      await page.goto('/en/#about', { waitUntil: 'networkidle' });

      await expect(page.locator('#about')).toBeAttached();
      await expect(page.locator('#about')).toBeInViewport({ timeout: 10000 });
      expect(page.url()).toContain('#about');
    });

    test('/en/#founder should scroll to founder section', async ({ page }) => {
      await page.goto('/en/#founder', { waitUntil: 'networkidle' });

      await expect(page.locator('#founder')).toBeAttached();
      await expect(page.locator('#founder')).toBeInViewport({ timeout: 10000 });
      expect(page.url()).toContain('#founder');
    });

    test('/en/#contact should scroll to contact section', async ({ page }) => {
      await page.goto('/en/#contact', { waitUntil: 'networkidle' });

      await expect(page.locator('#contact')).toBeAttached();
      await expect(page.locator('#contact')).toBeInViewport({ timeout: 10000 });
      expect(page.url()).toContain('#contact');
    });

    test('/ua/#services should scroll to services section (Ukrainian)', async ({ page }) => {
      await page.goto('/ua/#services', { waitUntil: 'networkidle' });

      await expect(page.locator('#services')).toBeAttached();
      await expect(page.locator('#services')).toBeInViewport({ timeout: 10000 });
    });
  });

  test.describe('Cross-page navigation from service pages', () => {
    test('navigating from /ua/services/voice-agents and clicking CTA should scroll to contact', async ({
      page,
    }) => {
      await page.goto('/ua/services/voice-agents/', { waitUntil: 'networkidle' });

      const contactLink = page.locator('a[href*="#contact"]').first();
      await expect(contactLink).toBeVisible();
      await contactLink.click();

      await page.waitForURL(/\/ua\/.*#contact/, { timeout: 5000 });

      expect(page.url()).toContain('#contact');
      await expect(page.locator('#contact')).toBeAttached();
      await expect(page.locator('#contact')).toBeInViewport({ timeout: 10000 });
    });

    test('navigating from /en/services/voice-agents and clicking CTA should scroll to contact', async ({
      page,
    }) => {
      await page.goto('/en/services/voice-agents/', { waitUntil: 'networkidle' });

      const contactLink = page.locator('a[href*="#contact"]').first();
      await expect(contactLink).toBeVisible();
      await contactLink.click();

      await page.waitForURL(/\/en\/.*#contact/, { timeout: 5000 });

      expect(page.url()).toContain('#contact');
      await expect(page.locator('#contact')).toBeAttached();
      await expect(page.locator('#contact')).toBeInViewport({ timeout: 10000 });
    });

    test('navigating from /ua/services/ai-assistants and clicking CTA should scroll to contact', async ({
      page,
    }) => {
      await page.goto('/ua/services/ai-assistants/', { waitUntil: 'networkidle' });

      const contactLink = page.locator('a[href*="#contact"]').first();
      await expect(contactLink).toBeVisible();
      await contactLink.click();

      await page.waitForURL(/\/ua\/.*#contact/, { timeout: 5000 });

      expect(page.url()).toContain('#contact');
      await expect(page.locator('#contact')).toBeAttached();
      await expect(page.locator('#contact')).toBeInViewport({ timeout: 10000 });
    });
  });

  test.describe('Edge cases', () => {
    test('invalid hash (#nonexistent) should load page normally without error', async ({ page }) => {
      const response = await page.goto('/ua/#nonexistent', { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);

      await expect(page.locator('#root')).toBeAttached();
      await expect(page.locator('body')).toContainText('Mission101.ai');
      expect(page.url()).toContain('#nonexistent');
    });

    test('empty hash (/ua/#) should load page at top', async ({ page }) => {
      await page.goto('/ua/#', { waitUntil: 'networkidle' });

      await expect(page.locator('#root')).toBeAttached();
      await expect(page.locator('body')).toContainText('Mission101.ai');
    });

    test('regular navigation without hash should work normally', async ({ page }) => {
      await page.goto('/ua/', { waitUntil: 'networkidle' });

      await expect(page.locator('#root')).toBeAttached();
      await expect(page.locator('body')).toContainText('Mission101.ai');
      expect(page.url()).not.toContain('#');
    });
  });
});
