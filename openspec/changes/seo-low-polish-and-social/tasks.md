## 1. Open Graph asset

- [ ] 1.1 Create a 1200×630 share image (JPEG or WebP preferred), add it under `public/`, and verify pixel dimensions with `file`/`sips`/`identify`
- [ ] 1.2 Update homepage, prerender heads, and `SEO.tsx` default `ogImage` (plus width/height metas) to the new asset and verify homepage meta shows width 1200 and height 630
- [ ] 1.3 Confirm file weight is reasonable (target under ~300KB) or document why a higher size is required

## 2. Host, 404 shim, and landmarks

- [ ] 2.1 Change `public/404.html` document title to include Not Found / 404 intent and verify with `curl` on a nonsense production or preview path that the 404 body title is updated while status remains 404
- [ ] 2.2 Add a single `<main>` landmark around primary content on home, Uzhhorod, service, events, and product page shells and verify in DevTools that exactly one `main` exists per page
- [ ] 2.3 Fix any Lighthouse label-content-name mismatches on primary controls touched while adding landmarks and verify a mobile Lighthouse/a11y snapshot no longer fails `landmark-one-main`
- [ ] 2.4 Configure DNS + GitHub Pages so `https://www.mission101.ai/` redirects to apex and verify with `curl -I` (operator step; document commands/results in PR)

## 3. Deploy hygiene

- [ ] 3.1 After a production deploy that includes Image Resizer Play Store URL fixes, verify live store CTAs are not both hash placeholders
- [ ] 3.2 Smoke-check social preview (Facebook/LinkedIn debugger or equivalent) for homepage using the new OG image once DNS/CDN have the new file
