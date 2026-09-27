## Why

Mission101 Image Resizer store launch (`resize-image-app` change `prepare-store-launch`) requires live product and privacy pages on mission101.ai before App Store Connect and Google Play forms can clear. Those URLs currently 404. This site already uses language-prefixed routes (`/en/...`, `/ua/...`) for content pages, so the original lang-less paths from store prep cannot be the published canonicals without adding a new routing pattern.

## What Changes

- Add a Mission101 Image Resizer product page at language-prefixed product routes.
- Add a product-specific privacy policy page describing on-device-only photo processing (Camera + Photo Library; no off-device collection).
- Wire React Router routes, i18n copy (EN + UA), SEO/hreflang, sitemap, and GitHub Pages static folder copies so deep links return HTTP 200.
- Treat English product URLs as the store-facing canonicals:
  - `https://mission101.ai/en/products/image-resizer`
  - `https://mission101.ai/en/products/image-resizer/privacy-policy`
- Ship matching Ukrainian routes under `/ua/products/...` for language switcher and hreflang parity.
- **BREAKING (cross-repo docs):** Replace the lang-less URLs recorded in `resize-image-app` `prepare-store-launch` with the `/en/...` URLs above before store form submission.

## Capabilities

### New Capabilities
- `product-pages/image-resizer`: Public product landing page for Mission101 Image Resizer (overview, store-oriented messaging, support contact, link to privacy policy).
- `product-pages/image-resizer-privacy`: Public privacy policy page scoped to the Image Resizer mobile app’s on-device photo processing posture.

### Modified Capabilities
- (none — OpenSpec was just initialized in this repo; no main specs exist yet)

## Impact

- **mission101-web**: New page components, routes in `App.tsx`, i18n keys in `en.json`/`ua.json`, SEO alternate handling, `public/sitemap.xml`, Vite post-build copies under `public/en|ua/products/...`, and Playwright coverage for the new routes.
- **Stores**: App Store / Play privacy and listing fields must use the English `/en/products/...` URLs once pages are deployed.
- **resize-image-app (external)**: Update `prepare-store-launch` proposal/design/specs/tasks (and README identity table when applied) from lang-less paths to `/en/products/image-resizer` and `/en/products/image-resizer/privacy-policy`.
- **Non-goals**: Building the mobile app; paid listing localization beyond EN store metadata; changing the existing Meta/LinkedIn `public/privacy-policy.txt`; implementing lang-less `/products/...` aliases in this change.
