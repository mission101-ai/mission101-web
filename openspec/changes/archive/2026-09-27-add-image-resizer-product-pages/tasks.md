## 1. Routes and page shells

- [x] 1.1 Add React Router routes for `/en|ua/products/image-resizer` and `/en|ua/products/image-resizer/privacy-policy` (including trailing-slash variants) in `src/App.tsx`, and verify the routes appear with `rg "products/image-resizer" src/App.tsx`
- [x] 1.2 Create product page component under `src/pages/` using shared nav/footer/light-theme patterns, and verify the page module exports and mounts without runtime errors in local `npm run dev`
- [x] 1.3 Create privacy policy page component under `src/pages/`, and verify it mounts at the privacy route in local `npm run dev`

## 2. Content and i18n

- [x] 2.1 Add English product + privacy copy (name `Mission101 Image Resizer`, on-device resize messaging, `support@mission101.ai`, privacy body aligned with no off-device collection) to `src/i18n/locales/en.json`, and verify keys resolve with `rg "image-resizer|imageResizer|Mission101 Image Resizer" src/i18n/locales/en.json`
- [x] 2.2 Add matching Ukrainian translations to `src/i18n/locales/ua.json`, and verify the same key structure exists in both locale files
- [x] 2.3 Wire product page to show name, description, support contact, and link to the active-language privacy route, and verify the link navigates to `/en/products/image-resizer/privacy-policy` (and UA equivalent) in the browser
- [x] 2.4 Wire privacy page content so it states on-device Camera/Photo Library use, no developer off-device collection, Mission 101 operator, and `support@mission101.ai`, and verify those statements are visible on the rendered page

## 3. SEO, sitemap, and static hosting

- [x] 3.1 Extend `SEO` (or page props) so product and privacy pages emit page-specific title/description, canonical URL, and hreflang `en`/`uk`/`x-default` with `x-default` pointing at the English URL, and verify tags in browser DevTools on both pages
- [x] 3.2 Add sitemap entries for EN/UA product and privacy URLs with hreflang pairs in `public/sitemap.xml`, and verify the four locs appear with `rg "products/image-resizer" public/sitemap.xml`
- [x] 3.3 Extend the Vite `copy-index-to-lang-folders` plugin to emit `dist/en|ua/products/image-resizer/` and `.../privacy-policy/` `index.html` copies, and verify those four files exist after `npm run build`

## 4. Tests and production verification

- [x] 4.1 Add Playwright coverage for EN/UA product and privacy routes (200/render, language switcher path swap, key privacy statements), and verify the new tests pass via `npm run test` (or a focused Playwright file run)
- [x] 4.2 After deploy to mission101.ai, confirm `https://mission101.ai/en/products/image-resizer` and `https://mission101.ai/en/products/image-resizer/privacy-policy` return HTTP 200 with `curl -I`, and spot-check the UA mirrors

## 5. Cross-repo store URL sync (external)

- [x] 5.1 In `resize-image-app` change `prepare-store-launch`, replace lang-less product/privacy URLs with `https://mission101.ai/en/products/image-resizer` and `https://mission101.ai/en/products/image-resizer/privacy-policy` across proposal/design/specs/tasks (and README when applied), and verify no remaining `mission101.ai/products/image-resizer` lang-less references with `rg`
