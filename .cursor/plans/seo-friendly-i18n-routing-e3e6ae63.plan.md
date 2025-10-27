<!-- e3e6ae63-4843-49aa-a2d9-6c03b2ad44a3 9a5cb890-7171-498f-9909-3248c356b8cd -->
# SEO-Friendly i18n Routing with Playwright Testing

## Problem

Current implementation may trigger 404s due to trailing slash variations. Search engines need to see `/en` and `/ua` as distinct pages without encountering 404 errors. Need automated testing to validate routing and SEO functionality.

## Solution Overview

Ensure all language route variations are handled without 404s, configure proper canonical URLs and hreflang tags, optimize for search engine indexing, and implement comprehensive E2E testing with Playwright that runs on every GitHub build.

## Implementation Steps

### 1. Update App.tsx Route Configuration

**File**: `src/App.tsx`

Add route variations to handle trailing slashes:

```typescript
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/en" element={<Index />} />
  <Route path="/en/" element={<Index />} />
  <Route path="/ua" element={<Index />} />
  <Route path="/ua/" element={<Index />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 2. Update SEO Component for Proper Canonical URLs

**File**: `src/components/SEO.tsx`

Normalize URLs (remove trailing slashes) and ensure consistent canonical URLs:

```typescript
const normalizedPath = currentPath.replace(/\/$/, '') || '/';
const canonicalUrl = canonical || `${baseUrl}${normalizedPath}`;
```

### 3. Update LanguageContext to Normalize Routes

**File**: `src/context/LanguageContext.tsx`

Ensure `changeLanguage` creates URLs without trailing slashes:

```typescript
const changeLanguage = async (lang: Language) => {
  setCurrentLanguage(lang);
  await i18n.changeLanguage(lang);
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  navigate(`/${lang}`); // Clean URL without trailing slash
};
```

### 4. Enhance 404.html for Better SEO

**File**: `public/404.html`

Handle valid language routes without showing 404 status:

```html
<script>
  var path = window.location.pathname;
  var validRoutes = ['/', '/en', '/en/', '/ua', '/ua/'];
  
  if (validRoutes.includes(path)) {
    window.location.replace(window.location.origin + '/#' + path);
  } else {
    // spa-github-pages redirect for true 404s
  }
</script>
```

### 5. Add Route Index Files for Static Hosting

**New Files**: `public/en/index.html`, `public/ua/index.html`

Create physical files that serve the same content as root, ensuring these routes never hit 404. Each file should include proper lang attribute and canonical URLs.

### 6. Update Build Process

**File**: `vite.config.ts`

Add build hook to copy `index.html` to language subfolders, or create a post-build script.

### 7. Update sitemap.xml

**File**: `public/sitemap.xml`

List all language versions as separate URLs with hreflang tags:

```xml
<url>
  <loc>https://mission101.ai/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://mission101.ai/en"/>
  <xhtml:link rel="alternate" hreflang="uk" href="https://mission101.ai/ua"/>
</url>
<url>
  <loc>https://mission101.ai/en</loc>
  ...
</url>
<url>
  <loc>https://mission101.ai/ua</loc>
  ...
</url>
```

### 8. Install Playwright and Setup Testing

Install Playwright:

```bash
npm install -D @playwright/test
npx playwright install --with-deps
```

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 9. Create Playwright E2E Tests

**Directory**: `e2e/`

**File**: `e2e/i18n-routing.spec.ts`

Tests for:

- All language routes accessible without 404
- Trailing slash variations work
- Language switcher changes URL and content
- localStorage persistence
- 404 page only shows for invalid routes

**File**: `e2e/seo-tags.spec.ts`

Tests for:

- Canonical URLs correct for each route
- hreflang tags properly set
- HTML lang attribute matches language
- Meta description, OG, Twitter tags present
- Language alternate links present

### 10. Update package.json Scripts

Add test scripts:

```json
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "test:report": "playwright show-report"
}
```

### 11. Update GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

Add Playwright testing step to build job before deployment:

```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Build
  run: npm run build

- name: Run Playwright tests
  run: npm run test

- name: Upload Playwright Report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

Tests will run after build but before deployment, ensuring only validated code is deployed.

## Key Benefits

- **No 404 Errors**: All language route variations handled by explicit routes
- **SEO-Friendly**: Search engines see distinct pages with proper canonical URLs
- **Proper hreflang Tags**: Correct alternate language links for international SEO
- **Clean URLs**: Normalized URLs without trailing slashes
- **Physical Files**: Static hosting serves actual HTML files for `/en/` and `/ua/`
- **Automated Testing**: Playwright tests validate routing and SEO on every build
- **CI/CD Integration**: Tests run automatically on GitHub before deployment
- **Comprehensive Coverage**: E2E tests cover all critical i18n and SEO functionality

## Testing Coverage

Playwright tests validate:

1. All routes (/, /en, /ua, /en/, /ua/) return 200 status
2. Invalid routes show 404 page
3. Language switcher correctly changes route and content
4. localStorage persists language preference
5. Canonical URLs are correct on all pages
6. hreflang alternate links are present
7. HTML lang attribute matches current language
8. Meta tags (description, OG, Twitter) are set correctly
9. Page title reflects current language
10. SEO component renders proper tags for each route

### To-dos

- [ ] Add route variations in App.tsx to handle trailing slashes for /en and /ua
- [ ] Update SEO component to normalize URLs and set proper canonical tags
- [ ] Ensure LanguageContext creates clean URLs without trailing slashes
- [ ] Update 404.html to handle valid language routes without showing 404 status
- [ ] Create physical index.html files in /en/ and /ua/ directories
- [ ] Configure build to copy index.html to language folders
- [ ] Add all language versions to sitemap.xml with hreflang tags
- [ ] Test all routes, verify no 404s, check canonical URLs and hreflang tags