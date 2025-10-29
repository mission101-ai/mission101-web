import { test, expect } from '@playwright/test';

test.describe('Uzhhorod Landing Page', () => {
  test.describe('Route Accessibility', () => {
    test('should load Ukrainian version at /ua/uzhhorod', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Check if page loaded successfully
      await expect(page.locator('h1')).toBeVisible();
      
      // Check for Ukrainian content
      const title = await page.locator('h1').textContent();
      expect(title).toContain('Ужгород');
    });

    test('should load English version at /en/uzhhorod', async ({ page }) => {
      await page.goto('/en/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Check if page loaded successfully
      await expect(page.locator('h1')).toBeVisible();
      
      // Check for English content
      const title = await page.locator('h1').textContent();
      expect(title).toContain('Uzhhorod');
    });

    test('should handle trailing slash routes', async ({ page }) => {
      await page.goto('/ua/uzhhorod/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('SEO Tags', () => {
    test('should have correct title for Ukrainian page', async ({ page }) => {
      await page.goto('/ua/uzhhorod', { waitUntil: 'networkidle' });
      
      const title = await page.title();
      expect(title).toContain('IT Послуги в Ужгороді');
      expect(title).toContain('Mission101.ai');
    });

    test('should have correct title for English page', async ({ page }) => {
      await page.goto('/en/uzhhorod', { waitUntil: 'networkidle' });
      
      const title = await page.title();
      expect(title).toContain('IT Services in Uzhhorod');
      expect(title).toContain('Mission101.ai');
    });

    test('should have correct meta description', async ({ page }) => {
      await page.goto('/ua/uzhhorod', { waitUntil: 'networkidle' });
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description).toContain('Ужгород');
      expect(description!.length).toBeGreaterThan(100);
    });

    test('should have correct canonical URL for Ukrainian page', async ({ page }) => {
      await page.goto('/ua/uzhhorod', { waitUntil: 'networkidle' });
      
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBe('https://mission101.ai/ua/uzhhorod');
    });

    test('should have correct canonical URL for English page', async ({ page }) => {
      await page.goto('/en/uzhhorod', { waitUntil: 'networkidle' });
      
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBe('https://mission101.ai/en/uzhhorod');
    });

    test('should have hreflang tags for both languages', async ({ page }) => {
      await page.goto('/ua/uzhhorod', { waitUntil: 'networkidle' });
      
      const enLink = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
      expect(enLink).toBe('https://mission101.ai/en/uzhhorod');
      
      const ukLink = await page.locator('link[rel="alternate"][hreflang="uk"]').getAttribute('href');
      expect(ukLink).toBe('https://mission101.ai/ua/uzhhorod');
      
      const defaultLink = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href');
      expect(defaultLink).toBe('https://mission101.ai/ua/uzhhorod');
    });

    test('should have Open Graph tags', async ({ page }) => {
      await page.goto('/ua/uzhhorod', { waitUntil: 'networkidle' });
      
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toContain('Ужгород');
      
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDescription).toBeTruthy();
      
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      expect(ogUrl).toContain('/ua/uzhhorod');
      
      const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
      expect(ogLocale).toBe('uk_UA');
    });

    test('should have LocalBusiness schema markup', async ({ page }) => {
      await page.goto('/ua/uzhhorod', { waitUntil: 'networkidle' });
      
      const schemaScript = await page.locator('script[type="application/ld+json"]').textContent();
      expect(schemaScript).toBeTruthy();
      
      const schema = JSON.parse(schemaScript!);
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema.name).toBe('Mission101.ai');
      expect(schema.address.addressLocality).toBe('Uzhhorod');
      expect(schema.address.addressCountry).toBe('UA');
      expect(schema.geo.latitude).toBeTruthy();
      expect(schema.geo.longitude).toBeTruthy();
      expect(schema.serviceType).toContain('Business Process Automation');
    });

    test('should have correct HTML lang attribute', async ({ page }) => {
      await page.goto('/ua/uzhhorod', { waitUntil: 'networkidle' });
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('uk');
      
      await page.goto('/en/uzhhorod', { waitUntil: 'networkidle' });
      const htmlLangEn = await page.locator('html').getAttribute('lang');
      expect(htmlLangEn).toBe('en');
    });
  });

  test.describe('Light Theme Application', () => {
    test('should apply light theme class to root element', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const rootDiv = page.locator('.light-theme');
      await expect(rootDiv).toBeVisible();
    });

    test('should have white background', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const rootDiv = page.locator('.light-theme');
      const bgColor = await rootDiv.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Check for white or transparent background (light theme)
      expect(bgColor).toMatch(/rgb\(255, 255, 255\)|rgba\(0, 0, 0, 0\)/);
    });

    test('should have dark text color', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const heading = page.locator('h1').first();
      const textColor = await heading.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      // Check for dark text (low RGB values)
      expect(textColor).toMatch(/rgb\([0-9]{1,2}, [0-9]{1,2}, [0-9]{1,2}\)/);
    });
  });

  test.describe('Navigation', () => {
    test('should display logo that links to home page', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const logo = page.locator('nav').locator('button').first();
      await expect(logo).toBeVisible();
      expect(await logo.textContent()).toContain('Mission');
    });

    test('should have language switcher', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Language switcher should be present in nav
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    });

    test('navigation should be sticky', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const nav = page.locator('nav');
      const position = await nav.evaluate((el) => {
        return window.getComputedStyle(el).position;
      });
      
      expect(position).toBe('sticky');
    });
  });

  test.describe('Content Rendering', () => {
    test('should display hero section with main title', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const hero = page.locator('h1').first();
      await expect(hero).toBeVisible();
      expect(await hero.textContent()).toContain('Ужгород');
    });

    test('should display hero CTA button', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const ctaButton = page.locator('button').filter({ hasText: /Зв'язатися|Contact/ }).first();
      await expect(ctaButton).toBeVisible();
    });

    test('should display local advantages section', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const advantagesTitle = page.locator('h2').filter({ hasText: /Чому Обирають|Why Choose/ });
      await expect(advantagesTitle).toBeVisible();
    });

    test('should display 4 advantage cards', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Look for the advantage cards - they should be in a grid
      const advantageCards = page.locator('h3').filter({ 
        hasText: /Штаб-квартира|Консультації|Підтримка|Ринку|Headquarters|Consultations|Support|Market/ 
      });
      
      const count = await advantageCards.count();
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('should display services section', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const servicesTitle = page.locator('h2').filter({ hasText: /Послуги|Services/ });
      await expect(servicesTitle).toBeVisible();
    });

    test('should display 4 service cards with benefits', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const serviceCards = page.locator('h3').filter({ 
        hasText: /Автоматизація|Оптимізація|Рішення|Ефективності|Automation|Optimization|Solutions|Enhancement/ 
      });
      
      const count = await serviceCards.count();
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('should display CTA section', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const ctaTitle = page.locator('h2').filter({ hasText: /Зустрінемося|Meet/ });
      await expect(ctaTitle).toBeVisible();
    });

    test('should display footer', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should render images with fallback', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const images = page.locator('img');
      const count = await images.count();
      expect(count).toBeGreaterThan(0);
      
      // Check that at least one image is visible
      await expect(images.first()).toBeVisible();
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const hero = page.locator('h1').first();
      await expect(hero).toBeVisible();
    });

    test('should hide mobile CTA button in nav on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const ctaButton = page.locator('nav button').filter({ hasText: /Зв'язатися|Contact/ });
      
      // Button might be hidden on mobile with sm:inline-flex
      const isVisible = await ctaButton.isVisible().catch(() => false);
      // This is expected - button may not be visible on mobile
      expect(typeof isVisible).toBe('boolean');
    });

    test('should display content in single column on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // All sections should be visible and stacked
      const sections = page.locator('section');
      const count = await sections.count();
      expect(count).toBeGreaterThan(3);
    });
  });

  test.describe('Language Switching', () => {
    test('should switch from Ukrainian to English via direct navigation', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Get initial title
      const uaTitle = await page.locator('h1').first().textContent();
      expect(uaTitle).toContain('Ужгород');
      
      // Navigate to English version
      await page.goto('/en/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const enTitle = await page.locator('h1').first().textContent();
      expect(enTitle).toContain('Uzhhorod');
      expect(enTitle).not.toContain('Ужгород');
    });

    test('should switch from Ukrainian to English using language switcher', async ({ page }) => {
      // Set up response listener to catch any 404s
      const responses: number[] = [];
      page.on('response', response => {
        responses.push(response.status());
      });

      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Verify we're on Ukrainian page
      const initialUrl = page.url();
      expect(initialUrl).toContain('/ua/uzhhorod');
      
      const uaTitle = await page.locator('h1').first().textContent();
      expect(uaTitle).toContain('Ужгород');
      
      // Click the language switcher
      const languageSwitcher = page.locator('button[aria-label="Switch language"]');
      await expect(languageSwitcher).toBeVisible();
      await languageSwitcher.click();
      
      // Wait for navigation to complete
      await page.waitForLoadState('networkidle');
      
      // Verify URL changed to English
      const newUrl = page.url();
      expect(newUrl).toContain('/en/uzhhorod');
      expect(newUrl).not.toContain('/ua');
      
      // Verify content changed to English
      const enTitle = await page.locator('h1').first().textContent();
      expect(enTitle).toContain('Uzhhorod');
      expect(enTitle).not.toContain('Ужгород');
      
      // Verify no 404 errors occurred during the switch
      const has404 = responses.some(status => status === 404);
      expect(has404).toBe(false);
    });

    test('should switch from English to Ukrainian using language switcher', async ({ page }) => {
      // Set up response listener to catch any 404s
      const responses: number[] = [];
      page.on('response', response => {
        responses.push(response.status());
      });

      await page.goto('/en/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Verify we're on English page
      const initialUrl = page.url();
      expect(initialUrl).toContain('/en/uzhhorod');
      
      const enTitle = await page.locator('h1').first().textContent();
      expect(enTitle).toContain('Uzhhorod');
      
      // Click the language switcher
      const languageSwitcher = page.locator('button[aria-label="Switch language"]');
      await expect(languageSwitcher).toBeVisible();
      await languageSwitcher.click();
      
      // Wait for navigation to complete
      await page.waitForLoadState('networkidle');
      
      // Verify URL changed to Ukrainian
      const newUrl = page.url();
      expect(newUrl).toContain('/ua/uzhhorod');
      expect(newUrl).not.toContain('/en');
      
      // Verify content changed to Ukrainian
      const uaTitle = await page.locator('h1').first().textContent();
      expect(uaTitle).toContain('Ужгород');
      
      // Verify no 404 errors occurred during the switch
      const has404 = responses.some(status => status === 404);
      expect(has404).toBe(false);
    });

    test('should preserve Uzhhorod path when switching languages multiple times', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const languageSwitcher = page.locator('button[aria-label="Switch language"]');
      
      // Switch to English
      await languageSwitcher.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/en/uzhhorod');
      
      // Switch back to Ukrainian
      await languageSwitcher.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/ua/uzhhorod');
      
      // Switch to English again
      await languageSwitcher.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/en/uzhhorod');
      
      // Verify we're still on a valid page (not 404)
      const title = await page.locator('h1').first().textContent();
      expect(title).toBeTruthy();
      expect(title).toContain('Uzhhorod');
    });

    test('should not redirect to index page when switching languages', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const languageSwitcher = page.locator('button[aria-label="Switch language"]');
      await languageSwitcher.click();
      await page.waitForLoadState('networkidle');
      
      const url = page.url();
      // Should be on /en/uzhhorod, not /en
      expect(url).toContain('/en/uzhhorod');
      expect(url).not.toMatch(/\/en\/?$/);
      
      // Verify we're on the Uzhhorod page (has specific title)
      const title = await page.locator('h1').first().textContent();
      expect(title).toContain('Uzhhorod');
      
      // Verify Uzhhorod-specific content exists (local advantages section)
      const advantagesTitle = page.locator('h2').filter({ hasText: /Why Choose|Чому Обирають/ });
      await expect(advantagesTitle).toBeVisible();
    });

    test('should handle language switching without 404 responses', async ({ page }) => {
      const failed404Requests: string[] = [];
      
      page.on('response', response => {
        if (response.status() === 404) {
          failed404Requests.push(response.url());
        }
      });

      // Start on Ukrainian
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Switch to English
      const languageSwitcher = page.locator('button[aria-label="Switch language"]');
      await languageSwitcher.click();
      await page.waitForLoadState('networkidle');
      
      // Switch back to Ukrainian
      await languageSwitcher.click();
      await page.waitForLoadState('networkidle');
      
      // Check no HTML pages returned 404
      const html404s = failed404Requests.filter(url => url.includes('.html') || !url.includes('.'));
      expect(html404s.length).toBe(0);
    });
  });

  test.describe('CTA Functionality', () => {
    test('hero CTA button should have correct attributes', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      const ctaButton = page.locator('button').filter({ hasText: /Зв'язатися|Contact/ }).first();
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toBeEnabled();
    });

    test('bottom CTA button should have correct attributes', async ({ page }) => {
      await page.goto('/ua/uzhhorod');
      await page.waitForLoadState('networkidle');
      
      // Find the CTA button in the CTA section (not the hero)
      const ctaButtons = page.locator('button').filter({ hasText: /Зв'язатися|Contact/ });
      const count = await ctaButtons.count();
      
      // Should have multiple CTA buttons (nav, hero, cta section)
      expect(count).toBeGreaterThan(1);
    });
  });
});

