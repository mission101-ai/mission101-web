## Why

After critical indexation signals and high-priority content/discovery work, remaining SEO audit items are polish: social preview assets are mis-dimensioned, `www` does not resolve, the GitHub Pages 404 shim title is misleading, and Lighthouse flagged minor accessibility landmarks. These improve share quality and hygiene without unblocking indexation.

## What Changes

- Replace the Open Graph / Twitter share image with a true **1200×630** asset (compressed), and align `og:image:width` / `og:image:height` meta with the file.
- Document and/or configure **`www.mission101.ai` → apex `mission101.ai`** (DNS + HTTPS redirect), keeping a single canonical host.
- Update the static **`public/404.html` shim title** (and related copy if needed) so non-JS crawlers see a clear not-found/redirecting message consistent with the Not Found experience.
- Add a **`<main>` landmark** (and fix label/accessible-name mismatches called out by Lighthouse) on key marketing layouts without changing visual design intent.
- Optionally align live Image Resizer store CTA deploy with repo Play Store URL if still stale on production after other deploys (verification task).

## Capabilities

### New Capabilities
- `seo/open-graph-assets`: Requirements for OG/Twitter image dimensions, file weight guidance, and matching meta width/height.
- `seo/host-and-share-polish`: Apex/`www` host consistency, 404 shim document title, and primary landmark/`main` accessibility expectations for marketing pages.

### Modified Capabilities
- `not-found`: Extend unknown-route/shim expectations so the static GitHub Pages `404.html` document title is accurate for crawlers that read the initial HTML response.

## Impact

- **Assets**: New/replaced `public/mission101-og-*.png` (or jpg/webp) and references in `index.html`, prerender heads, and `SEO.tsx` default `ogImage`.
- **DNS/hosting**: GitHub Pages custom domain / DNS records for `www` (operator step; document in tasks).
- **404**: `public/404.html` title string; possibly keep spa-github-pages redirect behavior unchanged.
- **A11y**: Layout wrappers (e.g. Index/Service/Uzhhorod/product shells) gain `<main>`; button/link accessible names where mismatched.
- **Non-goals**: Core Web Vitals optimization program; rich-result enhancement types beyond existing schema work in the critical change; large IA redesign.
