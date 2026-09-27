# product-pages/legal Specification

## Purpose

Provides the public Mission101 Legal product landing page on mission101.ai for visitors and as a company-site product URL, while reusing Legal’s existing privacy and support pages on legal.mission101.ai.

## Requirements

### Requirement: Language-prefixed Legal product page routes
The site MUST serve the Mission101 Legal product page at both:
- `/en/products/legal`
- `/ua/products/legal`

Trailing-slash variants of those paths MUST also resolve to the same page. The English URL `https://mission101.ai/en/products/legal` MUST be the mission101.ai canonical product URL for this product.

#### Scenario: English Legal product page is reachable
- **WHEN** a visitor opens `/en/products/legal` or `/en/products/legal/`
- **THEN** the Mission101 Legal product page renders successfully (HTTP 200 on production static hosting)

#### Scenario: Ukrainian Legal product page is reachable
- **WHEN** a visitor opens `/ua/products/legal` or `/ua/products/legal/`
- **THEN** the Mission101 Legal product page renders successfully in Ukrainian

### Requirement: Product page content and identity
The product page MUST present Mission101 Legal as a secure web and mobile workspace for legal-team report workflows and firm operations, include the listing-oriented product name `Mission101 Legal`, surface the support contact `support@mission101.ai`, and show a product logo.

#### Scenario: Core product identity is visible
- **WHEN** a visitor views the Legal product page in either language
- **THEN** the page shows the product name `Mission101 Legal`, describes secure web/mobile legal operations and report workflows, shows `support@mission101.ai`, and displays the product logo

### Requirement: Reuse existing Legal privacy and related public URLs
The product page MUST link visitors to Mission101 Legal’s existing public privacy policy at `https://legal.mission101.ai/privacy` rather than hosting a duplicated privacy-policy body under mission101.ai for this product. The page MUST also provide navigation to Legal’s public product/app surface at `https://legal.mission101.ai/` and support surface at `https://legal.mission101.ai/support`.

#### Scenario: Privacy CTA opens Legal’s existing policy
- **WHEN** a visitor activates the privacy policy call to action on the Legal product page
- **THEN** the browser navigates to `https://legal.mission101.ai/privacy`

#### Scenario: Product and support destinations are available
- **WHEN** a visitor views the Legal product page
- **THEN** the page exposes working links to `https://legal.mission101.ai/` and `https://legal.mission101.ai/support`

### Requirement: Product page SEO and language alternates
The product page MUST set page-specific title and description, a canonical URL for the current language path, and hreflang alternates for `en`, `uk`, and `x-default` pointing at the English and Ukrainian Legal product URLs on mission101.ai. The English product URL MUST be `x-default` for this product.

#### Scenario: Hreflang points at both Legal product locales
- **WHEN** the Legal product page is rendered
- **THEN** alternate links include the English and Ukrainian mission101.ai product URLs and `x-default` points at the English product URL

### Requirement: Public Google Play store CTA
The Legal product page MUST expose a Google Play call to action whose destination is the public Play Store listing `https://play.google.com/store/apps/details?id=ai.mission101.legal` in every supported language. Store availability copy MUST describe Android as available on Google Play.

#### Scenario: Play Store link opens the public Legal listing
- **WHEN** a visitor activates the Google Play call to action on `/en/products/legal` or `/ua/products/legal`
- **THEN** the link target is `https://play.google.com/store/apps/details?id=ai.mission101.legal`

#### Scenario: Store note reflects public Android availability
- **WHEN** a visitor views the Legal product page store section in either language
- **THEN** the store note describes Android as available on Google Play without referring to Play testing
