import { test, expect } from '@playwright/test';

test.describe('Mission101 Legal product page', () => {
  test('English product page loads with identity and external links', async ({ page }) => {
    const response = await page.goto('/en/products/legal', { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mission101 Legal');
    await expect(page.getByTestId('legal-logo')).toBeVisible();
    await expect(page.getByTestId('legal-support-email')).toHaveText('support@mission101.ai');
    await expect(page.getByTestId('legal-app-link')).toHaveAttribute('href', 'https://legal.mission101.ai/');
    await expect(page.getByTestId('legal-privacy-link')).toHaveAttribute(
      'href',
      'https://legal.mission101.ai/privacy'
    );
    await expect(page.getByTestId('legal-support-link')).toHaveAttribute(
      'href',
      'https://legal.mission101.ai/support'
    );
    await expect(page.getByTestId('legal-app-store-link')).toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/mission101-legal/id6782926649'
    );
    await expect(page.getByTestId('legal-play-store-link')).toHaveAttribute(
      'href',
      'https://play.google.com/apps/test/ai.mission101.legal/2'
    );
  });

  test('Ukrainian product page loads', async ({ page }) => {
    const response = await page.goto('/ua/products/legal', { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mission101 Legal');
    await expect(page.getByTestId('legal-support-email')).toHaveText('support@mission101.ai');
    await expect(page.getByTestId('legal-privacy-link')).toHaveAttribute(
      'href',
      'https://legal.mission101.ai/privacy'
    );
  });

  test('trailing slash product route works', async ({ page }) => {
    await page.goto('/en/products/legal/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mission101 Legal');
  });

  test('language switcher swaps legal product path between en and ua', async ({ page }) => {
    await page.goto('/en/products/legal', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Switch language' }).click();
    await expect(page).toHaveURL(/\/ua\/products\/legal\/?$/);

    await page.getByRole('button', { name: 'Switch language' }).click();
    await expect(page).toHaveURL(/\/en\/products\/legal\/?$/);
  });

  test('product page has English-default hreflang', async ({ page }) => {
    await page.goto('/en/products/legal', { waitUntil: 'networkidle' });

    await expect(page).toHaveTitle(/Mission101 Legal/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toMatch(/\/en\/products\/legal\/$/);

    expect(await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href')).toBe(
      'https://mission101.ai/en/products/legal/'
    );
    expect(await page.locator('link[rel="alternate"][hreflang="uk"]').getAttribute('href')).toBe(
      'https://mission101.ai/ua/products/legal/'
    );
    expect(
      await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href')
    ).toBe('https://mission101.ai/en/products/legal/');
  });
});

test.describe('Not Found page', () => {
  // Use spa-github-pages query bootstrap so static hosting still mounts the SPA
  // at an unmatched client route (same mechanism production 404.html uses).
  const unknownSpaPath = '/?/en/this-page-does-not-exist-404-check';

  test('unknown route shows aligned 404 with nav and footer', async ({ page }) => {
    await page.goto(unknownSpaPath, { waitUntil: 'networkidle' });

    await expect(page.getByTestId('not-found-page')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404');
    await expect(page.getByTestId('not-found-home-link')).toBeVisible();
    await expect(page.getByTestId('not-found-home-link')).toHaveAttribute('href', '/en');
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    const headingBox = await page.getByRole('heading', { level: 1 }).boundingBox();
    const linkBox = await page.getByTestId('not-found-home-link').boundingBox();
    expect(headingBox).toBeTruthy();
    expect(linkBox).toBeTruthy();

    const contentCenterX = headingBox!.x + headingBox!.width / 2;
    const linkCenterX = linkBox!.x + linkBox!.width / 2;
    expect(Math.abs(contentCenterX - linkCenterX)).toBeLessThan(8);
  });

  test('404 remains centered on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(unknownSpaPath, { waitUntil: 'networkidle' });

    await expect(page.getByTestId('not-found-page')).toBeVisible();
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(375 + 1);

    const headingBox = await page.getByRole('heading', { level: 1 }).boundingBox();
    const linkBox = await page.getByTestId('not-found-home-link').boundingBox();
    expect(headingBox).toBeTruthy();
    expect(linkBox).toBeTruthy();
    const contentCenterX = headingBox!.x + headingBox!.width / 2;
    const linkCenterX = linkBox!.x + linkBox!.width / 2;
    expect(Math.abs(contentCenterX - linkCenterX)).toBeLessThan(8);
  });
});
