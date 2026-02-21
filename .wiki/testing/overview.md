# Testing Overview

The project includes comprehensive E2E testing with Playwright: **73 automated tests** covering routing, i18n, SEO, hash navigation, and page functionality.

---

## Test Suites

### hash-navigation.spec.ts

12 tests for hash fragment navigation and smooth scrolling to sections:

- **Direct URL navigation**: `/ua/#contact`, `/ua/#services`, `/en/#about`, `/en/#founder`, `/en/#contact` scroll to the correct section
- **Both languages**: Ukrainian (`/ua/`) and English (`/en/`) routes
- **Cross-page navigation**: From service pages (e.g., `/ua/services/voice-agents`) clicking the CTA link navigates to main page and scrolls to `#contact`
- **Edge cases**: Invalid hash (`#nonexistent`) loads page normally; empty hash (`/ua/#`) loads at top; regular navigation without hash works

### i18n-routing.spec.ts

Validates all language routes work correctly:

- Root route (`/`) accessibility
- English routes (`/en`, `/en/`) accessibility
- Ukrainian routes (`/ua`, `/ua/`) accessibility
- 404 handling for invalid routes
- Different language routes serve different HTML (title content)
- Language routes are accessible and distinct
- HTML `lang` attribute matches route language
- Trailing slash redirects (`/en` → `/en/`, `/ua` → `/ua/`)
- Content rendering (not blank page) for `/en/` and `/ua/`

### seo-tags.spec.ts

Verifies meta tags, canonical URLs, hreflang tags, and structured data:

- Canonical URLs for `/`, `/en`, `/ua`
- Trailing slash normalization in canonical URLs
- hreflang tags (en, uk, x-default) on all pages
- Meta description presence and length
- Open Graph tags (og:title, og:description, og:url, og:image)
- Twitter Card tags (summary_large_image, title, description, image)
- Page title reflects current language
- HTML `lang` attribute for SEO
- `og:locale` matches language (en_US, uk_UA)

### uzhhorod-page.spec.ts

38 tests for the Uzhhorod local landing page functionality:

- **Route Accessibility**: `/en/uzhhorod`, `/ua/uzhhorod`, trailing slash handling
- **SEO Tags**: Titles, descriptions, canonical URLs, hreflang, Open Graph, LocalBusiness schema
- **Light Theme**: Root element class, white background, dark text
- **Navigation**: Logo, language switcher, sticky nav
- **Content Rendering**: Hero, CTA, advantages, services, footer, images
- **Mobile Responsiveness**: Viewport, single column layout
- **Language Switching**: Direct navigation, switcher (UA↔EN), path preservation, no 404s
- **CTA Functionality**: Hero and bottom CTA button attributes

---

## Coverage Breakdown

| Area | Tests | Coverage |
|------|-------|----------|
| **Main Site** | 35 | Routes, 404, language switcher, canonical URLs, hreflang, meta descriptions, Open Graph, Twitter Cards, HTML lang, localStorage persistence, hash navigation |
| **Uzhhorod Landing Page** | 38 | Route accessibility, SEO tags, LocalBusiness schema, Open Graph, Twitter Cards, light theme, navigation, mobile responsiveness, language switching, content rendering, CTA functionality |

### Main Site (35 tests)

- All routes accessible (`/`, `/en`, `/en/`, `/ua`, `/ua/`)
- 404 handling for invalid routes
- Language switcher functionality
- Canonical URLs and hreflang tags
- Meta descriptions and Open Graph tags
- Twitter Card tags
- HTML lang attribute matching
- localStorage persistence
- Hash navigation: direct URL with hash scrolls to section (#contact, #services, #about, #founder); cross-page navigation from service pages; edge cases (invalid/empty hash)

### Uzhhorod Landing Page (38 tests)

- Route accessibility (`/en/uzhhorod`, `/ua/uzhhorod`)
- SEO tags (titles, descriptions, canonical URLs, hreflang)
- LocalBusiness schema validation
- Open Graph and Twitter Cards
- Light theme application
- Navigation and mobile responsiveness
- Language switching without 404 errors
- Content rendering and CTA functionality

---

## npm Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run Playwright tests (headless) |
| `npm run test:ui` | Run tests with Playwright UI mode |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Run tests in debug mode |

---

## CI Integration

Tests run automatically in `.github/workflows/deploy.yml` on every push to `main`:

1. **Checkout** → `actions/checkout@v4`
2. **Setup Node.js** → `actions/setup-node@v4` (Node 20, npm cache)
3. **Install dependencies** → `npm ci`
4. **Install Playwright Browsers** → `npx playwright install --with-deps`
5. **Build** → `npm run build`
6. **Run Playwright tests** → `npm run test`
7. **Upload Playwright Report** → Artifact `playwright-report` (retention: 30 days), uploaded even on failure (`if: always()`)
8. **Deploy** → Build must pass before deployment to GitHub Pages

The Playwright report artifact is available in the Actions run for debugging failed tests.
