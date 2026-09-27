import { test, expect } from '@playwright/test';

test.describe('Image Resizer product pages', () => {
  test.describe('Route accessibility', () => {
    test('English product page loads', async ({ page }) => {
      const response = await page.goto('/en/products/image-resizer', { waitUntil: 'networkidle' });
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Mission101 Image Resizer');
      await expect(page.getByTestId('image-resizer-support-email')).toHaveText('support@mission101.ai');
      await expect(page.getByTestId('image-resizer-logo')).toBeVisible();
      await expect(page.getByTestId('image-resizer-app-store-link')).toHaveAttribute(
        'href',
        '#app-store-coming-soon'
      );
      await expect(page.getByTestId('image-resizer-play-store-link')).toHaveAttribute(
        'href',
        'https://play.google.com/store/apps/details?id=ai.mission101.imageresizer'
      );
    });

    test('Ukrainian product page loads', async ({ page }) => {
      const response = await page.goto('/ua/products/image-resizer', { waitUntil: 'networkidle' });
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Mission101 Image Resizer');
      await expect(page.getByTestId('image-resizer-support-email')).toHaveText('support@mission101.ai');
    });

    test('English privacy page loads with key statements', async ({ page }) => {
      const response = await page.goto('/en/products/image-resizer/privacy-policy', {
        waitUntil: 'networkidle',
      });
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy');
      const body = await page.locator('main, body').innerText();
      expect(body).toContain('on your device');
      expect(body).toContain('Camera');
      expect(body).toContain('Photo Library');
      expect(body).toContain('Mission 101');
      expect(body).toContain('support@mission101.ai');
      expect(body).not.toContain('Meta App that publishes content to the mission101.ai Instagram');
    });

    test('Ukrainian privacy page loads', async ({ page }) => {
      const response = await page.goto('/ua/products/image-resizer/privacy-policy', {
        waitUntil: 'networkidle',
      });
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Політика конфіденційності');
      await expect(page.getByTestId('image-resizer-privacy-contact')).toContainText(
        'support@mission101.ai'
      );
    });

    test('trailing slash product and privacy routes work', async ({ page }) => {
      await page.goto('/en/products/image-resizer/', { waitUntil: 'networkidle' });
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Mission101 Image Resizer');

      await page.goto('/en/products/image-resizer/privacy-policy/', { waitUntil: 'networkidle' });
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy');
    });
  });

  test.describe('Navigation and language switcher', () => {
    test('product page links to privacy policy for active language', async ({ page }) => {
      await page.goto('/en/products/image-resizer', { waitUntil: 'networkidle' });
      await page.getByTestId('image-resizer-privacy-link').click();
      await expect(page).toHaveURL(/\/en\/products\/image-resizer\/privacy-policy\/?$/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy');
    });

    test('language switcher swaps product path between en and ua', async ({ page }) => {
      await page.goto('/en/products/image-resizer', { waitUntil: 'networkidle' });
      await page.getByRole('button', { name: 'Switch language' }).click();
      await expect(page).toHaveURL(/\/ua\/products\/image-resizer\/?$/);

      await page.getByRole('button', { name: 'Switch language' }).click();
      await expect(page).toHaveURL(/\/en\/products\/image-resizer\/?$/);
    });

    test('language switcher swaps privacy path between en and ua', async ({ page }) => {
      await page.goto('/en/products/image-resizer/privacy-policy', { waitUntil: 'networkidle' });
      await page.getByRole('button', { name: 'Switch language' }).click();
      await expect(page).toHaveURL(/\/ua\/products\/image-resizer\/privacy-policy\/?$/);

      await page.getByRole('button', { name: 'Switch language' }).click();
      await expect(page).toHaveURL(/\/en\/products\/image-resizer\/privacy-policy\/?$/);
    });
  });

  test.describe('SEO tags', () => {
    test('product page has English-default hreflang', async ({ page }) => {
      await page.goto('/en/products/image-resizer', { waitUntil: 'networkidle' });

      await expect(page).toHaveTitle(/Mission101 Image Resizer/);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toMatch(/\/en\/products\/image-resizer\/$/);

      expect(await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href')).toBe(
        'https://mission101.ai/en/products/image-resizer/'
      );
      expect(await page.locator('link[rel="alternate"][hreflang="uk"]').getAttribute('href')).toBe(
        'https://mission101.ai/ua/products/image-resizer/'
      );
      expect(
        await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href')
      ).toBe('https://mission101.ai/en/products/image-resizer/');
    });

    test('privacy page has English-default hreflang', async ({ page }) => {
      await page.goto('/en/products/image-resizer/privacy-policy', { waitUntil: 'networkidle' });

      await expect(page).toHaveTitle(/Privacy Policy/);
      expect(await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href')).toBe(
        'https://mission101.ai/en/products/image-resizer/privacy-policy/'
      );
      expect(await page.locator('link[rel="alternate"][hreflang="uk"]').getAttribute('href')).toBe(
        'https://mission101.ai/ua/products/image-resizer/privacy-policy/'
      );
      expect(
        await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href')
      ).toBe('https://mission101.ai/en/products/image-resizer/privacy-policy/');
    });
  });
});
