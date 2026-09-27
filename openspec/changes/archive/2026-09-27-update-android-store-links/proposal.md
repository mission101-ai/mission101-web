## Why

Mission101 Legal and Mission101 Image Resizer now have public Google Play listings. The marketing site still points Legal at a Play testing URL and Image Resizer at a coming-soon placeholder, so visitors cannot reach the live Android apps from the product pages.

## What Changes

- Update Mission101 Legal’s Google Play CTA to the public listing `https://play.google.com/store/apps/details?id=ai.mission101.legal`
- Update Mission101 Legal store copy so Android is described as available on Google Play (no longer “testing”)
- Set Mission101 Image Resizer’s Google Play CTA to `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer`
- Update Image Resizer store copy so Android availability matches the live Play listing (iOS remains coming-soon while its App Store href stays a placeholder)
- Align EN/UA i18n strings and e2e assertions with the new Play URLs and copy

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

- `product-pages/legal`: Require the Legal product page Google Play CTA to use the public Play Store listing URL for package `ai.mission101.legal`, and describe Android as publicly available
- `product-pages/image-resizer`: Require the Image Resizer product page Google Play CTA to use the public Play Store listing URL for package `ai.mission101.imageresizer`

## Impact

- i18n: `src/i18n/locales/en.json`, `src/i18n/locales/ua.json` (`products.legal.playStoreHref`, `products.legal.storesNote`, `products.imageResizer.playStoreHref`, and related `storesNote` copy)
- Product pages already bind Play hrefs from i18n (`LegalProductPage.tsx`, `ImageResizerProductPage.tsx`) — no structural page changes expected
- E2e: `e2e/legal-product-page-and-404.spec.ts`, `e2e/image-resizer-product-pages.spec.ts`
- No App Store / iOS URL changes in this change
