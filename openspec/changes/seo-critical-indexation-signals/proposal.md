## Why

Google Search Console shows important mission101.ai URLs failing indexation for technical signal reasons: product/events static HTML still ships the homepage head (wrong title/canonical), homepage JSON-LD is stripped after hydration, hreflang `x-default` disagrees between HTML and the sitemap, and `/en/` is reported as “Duplicate, Google chose different canonical than user.” Fixing these signals is the prerequisite for content and discovery work to stick.

## What Changes

- Generate **page-specific static HTML document heads** for product and events routes (and keep service/home/Uzhhorod heads correct) so the first HTML response matches the page’s title, description, canonical, hreflang, and Open Graph URL—without waiting for client JS.
- Stop removing homepage Organization/WebSite (and related) JSON-LD on hydration; keep or replace structured data intentionally per page type, including valid LocalBusiness telephone and product-oriented schema on product pages.
- Unify **hreflang `x-default`** across `SEO.tsx`, prerendered HTML, and `sitemap.xml` for home, services, Uzhhorod, events, and products.
- Resolve the **`/` vs `/en/` English-home canonical conflict** so Google and the site declare the same preferred English homepage URL.
- Extend build/copy and Playwright coverage so regressions in static heads, schema presence, and locale signals fail CI.

## Capabilities

### New Capabilities
- `seo/static-document-heads`: Static first-response HTML heads for all indexable marketing routes (especially products and events) with page-correct title, description, canonical, hreflang, and OG URL.
- `seo/structured-data`: Durable JSON-LD rules for homepage, local, service, and product pages (including valid LocalBusiness telephone and no accidental schema deletion).
- `seo/hreflang-canonical`: Consistent self-canonicals and reciprocal `en`/`uk`/`x-default` alternates across runtime SEO, static HTML, and sitemap, including English-home (`/` vs `/en/`) policy.

### Modified Capabilities
- (none)

## Impact

- **mission101-web build**: Vite `copy-index-to-lang-folders` (or successor) must emit unique heads for product/events paths instead of copying root `index.html` verbatim; may add a small prerender/head-injection step.
- **Runtime SEO**: `src/components/SEO.tsx` schema lifecycle and `x-default` logic; root `index.html` / public prerender templates; `public/sitemap.xml`.
- **Tests**: Expand `e2e/seo-tags.spec.ts` (and product/events specs) to assert static curl/HTML heads and post-hydration consistency.
- **Ops/GSC (post-deploy)**: Re-submit sitemap; URL Inspection / Validate fix for duplicate-canonical and discovered-not-indexed URLs—documented in tasks, not automated in-repo.
- **Non-goals**: Rewriting long-form page body copy; nav/footer IA; OG image asset redesign; DNS/`www` setup; off-site link building.
