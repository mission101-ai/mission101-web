## 1. i18n store URLs and copy

- [x] 1.1 In `src/i18n/locales/en.json` and `src/i18n/locales/ua.json`, set `products.legal.playStoreHref` to `https://play.google.com/store/apps/details?id=ai.mission101.legal` and update `products.legal.storesNote` so Android is described as available on Google Play (no testing language); verify both locale files contain the new Legal Play URL and updated note
- [x] 1.2 In `src/i18n/locales/en.json` and `src/i18n/locales/ua.json`, set `products.imageResizer.playStoreHref` to `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer` and update `products.imageResizer.storesNote` so Android availability on Google Play is clear while App Store remains coming-soon; verify both locale files contain the new Image Resizer Play URL and updated note

## 2. Tests and browser verification

- [x] 2.1 Update `e2e/legal-product-page-and-404.spec.ts` so `legal-play-store-link` expects `https://play.google.com/store/apps/details?id=ai.mission101.legal`, and run that focused e2e suite successfully
- [x] 2.2 Update `e2e/image-resizer-product-pages.spec.ts` so `image-resizer-play-store-link` expects `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer`, and run that focused e2e suite successfully
- [x] 2.3 In the browser, open EN and UA Legal and Image Resizer product pages, confirm each Google Play CTA href matches the public listing URL above, and confirm store notes no longer claim Play testing or that store links are still coming for Android
