import { test, expect } from '@playwright/test';

const EVENT_SLUG = 'uzhhorod-2026-03-18';

test.describe('Events List Page', () => {
  test('/en/events loads without 404 (status 200)', async ({ page }) => {
    const response = await page.goto('/en/events', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
  });

  test('/ua/events loads without 404 (status 200)', async ({ page }) => {
    const response = await page.goto('/ua/events', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
  });

  test('events hero section is visible', async ({ page }) => {
    await page.goto('/en/events', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1, name: 'Events' })).toBeVisible();
    await expect(
      page.getByText('Workshops and masterclasses on AI for your business', { exact: true }),
    ).toBeVisible();

    await page.goto('/ua/events', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1, name: 'Події' })).toBeVisible();
    await expect(
      page.getByText('Навчальні заходи та майстер-класи з AI для вашого бізнесу', { exact: true }),
    ).toBeVisible();
  });

  test('events list component is visible', async ({ page }) => {
    await page.goto('/en/events', { waitUntil: 'networkidle' });
    await expect(
      page.getByRole('heading', { level: 2, name: 'Events led by Mission101.ai' }),
    ).toBeVisible();

    await page.goto('/ua/events', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 2, name: 'Події від Mission101.ai' })).toBeVisible();
  });

  test('events list page has visible #root', async ({ page }) => {
    await page.goto('/en/events', { waitUntil: 'networkidle' });
    await expect(page.locator('#root')).toBeVisible();

    await page.goto('/ua/events', { waitUntil: 'networkidle' });
    await expect(page.locator('#root')).toBeVisible();
  });
});

test.describe('Event Detail Page', () => {
  test('/en/events/uzhhorod-2026-03-18 loads without 404', async ({ page }) => {
    const response = await page.goto(`/en/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
  });

  test('/ua/events/uzhhorod-2026-03-18 loads without 404', async ({ page }) => {
    const response = await page.goto(`/ua/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
  });

  test('event hero section is visible', async ({ page }) => {
    await page.goto(`/en/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Artificial Intelligence for Small and Medium Business. Practical Tools Without Big Expenses',
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Events' }).first()).toBeVisible();

    await page.goto(`/ua/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Штучний інтелект для малого та середнього бізнесу. Практичні інструменти без великих витрат',
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Події' }).first()).toBeVisible();
  });

  test('event details section is visible', async ({ page }) => {
    await page.goto(`/en/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 2, name: "What you'll learn" })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Target audience' })).toBeVisible();

    await page.goto(`/ua/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 2, name: 'Що ви дізнаєтесь' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Цільова аудиторія' })).toBeVisible();
  });

  test('event CTA section is visible', async ({ page }) => {
    await page.goto(`/en/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 2, name: 'Ready to participate?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register now' })).toBeVisible();

    await page.goto(`/ua/events/${EVENT_SLUG}`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 2, name: 'Готові взяти участь?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Зареєструватися' })).toBeVisible();
  });
});

test.describe('Events navigation flow', () => {
  test('navigates from events list to event detail with correct URL and content', async ({ page }) => {
    await page.goto('/en/events', { waitUntil: 'networkidle' });
    await expect(page.locator('#root')).toBeVisible();

    await page.getByRole('link', { name: 'Learn more' }).first().click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(new RegExp(`/en/events/${EVENT_SLUG}/?$`));
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Artificial Intelligence for Small and Medium Business. Practical Tools Without Big Expenses',
      }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: "What you'll learn" })).toBeVisible();
  });
});
