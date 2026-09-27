## 1. Routes, asset, and Legal product page shell

- [x] 1.1 Copy the Mission101 Legal brand app icon from `legal.mission101.ai/frontend/assets/brand/ios/icon-light.png` into `public/products/legal/app-icon.png` (light-surface / dark-on-white mark; not the legacy `frontend/assets/icon.png` scales mark) and verify the file exists with `ls public/products/legal/`
- [x] 1.2 Add React Router routes for `/en|ua/products/legal` including trailing-slash variants in `src/App.tsx`, and verify with `rg "products/legal" src/App.tsx`
- [x] 1.3 Create the Legal product page component under `src/pages/` using shared `UzhhorodNav` / light-theme / `FooterSection` / `SEO` patterns from Image Resizer, and verify the page mounts at `/en/products/legal` in local `npm run dev`

## 2. Content, i18n, and external Legal links

- [x] 2.1 Add English Legal product copy under `products.legal` in `src/i18n/locales/en.json` (name `Mission101 Legal`, secure web/mobile + report-workflow messaging adapted from Legal public copy, `support@mission101.ai`, logo alt, open-app / privacy / support link labels and hrefs) and verify keys with `rg "products\.legal|Mission101 Legal|legal.mission101.ai" src/i18n/locales/en.json`
- [x] 2.2 Add matching Ukrainian translations under the same key structure in `src/i18n/locales/ua.json`, and verify both locale files share the `products.legal` key tree
- [x] 2.3 Wire the product page to show name, logo, features, support email, primary CTA to `https://legal.mission101.ai/`, privacy CTA to `https://legal.mission101.ai/privacy`, and support link to `https://legal.mission101.ai/support`, and verify those hrefs in the browser (or via Playwright test ids)

## 3. SEO, sitemap, and static hosting

- [x] 3.1 Ensure the Legal product page emits page-specific title/description, canonical URL, and hreflang `en`/`uk`/`x-default` via `productHreflangPath="products/legal"`, and verify alternate tags in browser DevTools on `/en/products/legal`
- [x] 3.2 Add sitemap entries for EN/UA Legal product URLs with hreflang pairs in `public/sitemap.xml`, and verify both locs appear with `rg "products/legal" public/sitemap.xml`
- [x] 3.3 Extend the Vite `copy-index-to-lang-folders` plugin to emit `dist/en|ua/products/legal/index.html` copies, and verify those two files exist after `npm run build`

## 4. Not Found (404) layout fix

- [x] 4.1 Redesign `src/pages/NotFound.tsx` to use the light marketing shell (`UzhhorodNav`, centered max-width content column, `FooterSection`), keep heading/message/return-home aligned on a shared center axis, and prefer a language-aware home href when language context is available; verify visually in the browser at desktop width
- [x] 4.2 Verify the same Not Found page remains centered and readable at a mobile viewport (~375px wide) with no horizontal overflow, using browser DevTools responsive mode

## 5. Tests and production verification

- [x] 5.1 Add Playwright coverage for EN/UA Legal product routes (render, logo, support email, external privacy/support/app hrefs, language switcher path swap) and for the Not Found page (unknown route shows 404 content + nav/footer), and verify the new tests pass via a focused Playwright run
- [ ] 5.2 After deploy to mission101.ai, confirm `https://mission101.ai/en/products/legal` and `https://mission101.ai/ua/products/legal` return HTTP 200 with `curl -I`, and spot-check the live 404 page alignment in the browser
