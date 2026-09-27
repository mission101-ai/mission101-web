## Why

Mission101 Legal (`legal.mission101.ai`) needs a store- and marketing-facing product presence on the company site, matching the Image Resizer pattern already live under `/en|ua/products/...`. The Legal product already publishes its privacy policy and support pages on `legal.mission101.ai`, so mission101.ai should surface a product landing page that reuses those URLs instead of duplicating policy content. Separately, the site 404 page looks visually misaligned and should be brought in line with the rest of the marketing UI.

## What Changes

- Add a Mission101 Legal product landing page at language-prefixed routes, modeled on the Image Resizer product page (nav/footer, light theme, hero, features, support contact, SEO).
- Link the Legal privacy CTA (and related support/product destinations) to the existing public pages on `legal.mission101.ai` — do **not** add a mirrored privacy-policy page under mission101.ai for this product.
- Wire React Router routes, EN/UA i18n copy, SEO/hreflang, sitemap, static GitHub Pages folder copies, and Playwright coverage for the new product routes.
- Treat English product URL as the mission101.ai canonical for this product:
  - `https://mission101.ai/en/products/legal`
- Ship matching Ukrainian route under `/ua/products/legal`.
- Fix the Not Found (404) page layout/alignment so content is consistently centered and visually coherent with the site chrome on desktop and mobile.
- Copy the Legal brand app icon (`frontend/assets/brand/ios/icon-light.png`, dark mark on white) into `public/products/legal/app-icon.png` for the product page logo.

## Capabilities

### New Capabilities
- `product-pages/legal`: Public Mission101 Legal product landing page on mission101.ai (overview, feature summary, support contact, external links to Legal privacy/support/app URLs).
- `not-found`: Public 404 / unknown-route page with corrected alignment and consistent marketing-site presentation.

### Modified Capabilities
- (none)

## Impact

- **mission101-web**: New product page component, routes in `App.tsx`, i18n keys in `en.json`/`ua.json`, SEO/hreflang usage, `public/sitemap.xml`, Vite post-build copies under `public/en|ua/products/legal/`, product icon asset, Playwright coverage, and updates to `src/pages/NotFound.tsx` (and related styles/i18n if needed).
- **legal.mission101.ai (external, read-only for this change)**: Source of product copy posture, app icon, and canonical privacy/support URLs (`https://legal.mission101.ai/privacy`, `https://legal.mission101.ai/support`, `https://legal.mission101.ai/`). No requirement to change that repo in this change; optional later sync of store docs if operators want mission101.ai product URL listed alongside Legal’s own product URL.
- **Non-goals**: Duplicating Legal’s privacy policy body onto mission101.ai; changing Image Resizer pages; changing `public/privacy-policy.txt` (Meta/LinkedIn); implementing lang-less `/products/legal` aliases; publishing real App Store / Play Store listing URLs if they are still unavailable (use open-app / coming-soon pattern consistent with Image Resizer when needed).
