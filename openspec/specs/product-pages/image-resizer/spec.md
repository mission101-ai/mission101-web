# product-pages/image-resizer Specification

## Purpose

Provides the public Mission101 Image Resizer product landing page used by visitors and as the store-facing product URL on mission101.ai.

## Requirements

### Requirement: Language-prefixed product page routes
The site MUST serve the Image Resizer product page at both:
- `/en/products/image-resizer`
- `/ua/products/image-resizer`

Trailing-slash variants of those paths MUST also resolve to the same page. The English URL `https://mission101.ai/en/products/image-resizer` MUST be the store-facing product URL.

#### Scenario: English product page is reachable
- **WHEN** a visitor opens `/en/products/image-resizer` or `/en/products/image-resizer/`
- **THEN** the Image Resizer product page renders successfully (HTTP 200 on production static hosting)

#### Scenario: Ukrainian product page is reachable
- **WHEN** a visitor opens `/ua/products/image-resizer` or `/ua/products/image-resizer/`
- **THEN** the Image Resizer product page renders successfully in Ukrainian

### Requirement: Product page content
The product page MUST present Mission101 Image Resizer as an on-device photo resize utility, include the listing-oriented product name `Mission101 Image Resizer`, surface the support contact `support@mission101.ai`, and link to the Image Resizer privacy policy page for the active language.

#### Scenario: Core product identity is visible
- **WHEN** a visitor views the product page in either language
- **THEN** the page shows the product name `Mission101 Image Resizer`, describes on-device resizing, shows `support@mission101.ai`, and provides a working link to the matching privacy policy route

### Requirement: Product page SEO and language alternates
The product page MUST set page-specific title and description, a canonical URL for the current language path, and hreflang alternates for `en`, `uk`, and `x-default` pointing at the English and Ukrainian product URLs. The English product URL MUST be `x-default` for this product.

#### Scenario: Hreflang points at both product locales
- **WHEN** the product page is rendered
- **THEN** alternate links include the English and Ukrainian product URLs and `x-default` points at the English product URL

### Requirement: Public Google Play store CTA
The Image Resizer product page MUST expose a Google Play call to action whose destination is the public Play Store listing `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer` in every supported language. Store availability copy MUST reflect that Android is available on Google Play.

#### Scenario: Play Store link opens the public Image Resizer listing
- **WHEN** a visitor activates the Google Play call to action on `/en/products/image-resizer` or `/ua/products/image-resizer`
- **THEN** the link target is `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer`

#### Scenario: Store note reflects live Android availability
- **WHEN** a visitor views the Image Resizer product page store section in either language
- **THEN** the store note indicates Android is available on Google Play
