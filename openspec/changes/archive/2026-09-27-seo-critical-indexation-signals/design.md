## Context

See proposal.md for motivation. mission101-web is a Vite + React Router SPA on GitHub Pages. Deep links work via the Vite `copy-index-to-lang-folders` plugin, which today copies root `dist/index.html` into product/events folders (homepage head) while services/Uzhhorod/en use separately authored prerender HTML under `public/`. Runtime SEO is owned by `src/components/SEO.tsx`, which currently deletes JSON-LD on non-service/non-local pages and sets service/Uzhhorod `x-default` to UA while `sitemap.xml` uses EN for those clusters. GSC reports `/en/` as duplicate-canonical vs user.

## Goals / Non-Goals

**Goals:**
- Make first HTML response heads trustworthy for every sitemap URL.
- Keep structured data stable across hydration.
- One coherent hreflang/`x-default`/canonical policy sitewide, including English home.

**Non-Goals:**
- Full SSR/SSG of page body content (head correctness is the critical bar; body prerender can come later).
- Rewriting marketing copy depth (owned by `seo-high-content-and-discovery`).
- Changing GitHub Pages hosting platform.

## Decisions

### 1. Preferred English homepage is `https://mission101.ai/`
- **Choice:** Treat apex `/` as the preferred English home. `/en/` keeps working for the language switcher but MUST `rel=canonical` to `https://mission101.ai/` (and matching `og:url`). Sitemap home cluster: keep `/` as `en`+`x-default` target; either omit `/en/` as its own `<loc>` or list it only if it canonicals to `/` (prefer omitting duplicate `<loc>`).
- **Rationale:** Matches current home `x-default`, matches GSC’s observed preference, avoids maintaining two indexed EN homes.
- **Alternatives considered:** 301 `/` → `/en/` (larger redirect blast radius for existing links/impressions); keep dual self-canonicals (rejected — already failing in GSC).

### 2. Unify `x-default` to English URLs for all clusters
- **Choice:** For services, Uzhhorod, events, and products, `x-default` → English URL (trailing slash). Update `SEO.tsx`, any prerender HTML, and confirm `sitemap.xml` already matches.
- **Rationale:** Sitemap already uses EN for most clusters; HTML/UA `x-default` is the conflict source.
- **Alternatives considered:** UA as sitewide `x-default` (conflicts with sitemap + product pages already EN-default); language picker URL (no such page exists).

### 3. Head generation via build-time head injection (not hand-maintained duplicates)
- **Choice:** Extend the build pipeline so product/events (and ideally all lang routes) receive injected heads from the same source of truth as i18n SEO strings / a small route→meta map, rather than only `fs.copyFileSync(distIndexPath, ...)`.
- **Rationale:** Hand-maintained `public/en/.../index.html` already drifts from runtime; products were forgotten. One generator reduces recurrence.
- **Alternatives considered:** Continue hand-editing public HTML (error-prone); full react-snap/prerender of body (heavier; defer).

### 4. Schema lifecycle: replace, never delete-without-replace
- **Choice:** Change `SEO.tsx` so homepage keeps Organization+WebSite graph; local keeps LocalBusiness with E.164 phone `+380974825097` (public number already used in marketing); services keep Service; products add SoftwareApplication/MobileApplication. Never remove `ld+json` unless writing the next graph.
- **Rationale:** Current delete path explains empty homepage schema after hydration.
- **Alternatives considered:** Move all schema to static HTML only (breaks SPA client navigations).

### 5. Trailing-slash canonicals remain the contract
- **Choice:** Keep slash-form canonicals and sitemap locs; no change to GitHub Pages redirect behavior.
- **Rationale:** Already consistent and working for 200s.

## Risks / Trade-offs

- **[Build complexity for head injection]** → Start with a focused generator for product/events + regression tests; reuse i18n SEO keys.
- **[Canonicalizing `/en/` → `/` surprises language switcher]** → Switcher can still navigate to `/en/` paths for deeper pages; only the home pair consolidates.
- **[Wrong phone in schema]** → Confirm `+380974825097` with operator before ship; easy constant change.
- **[GSC lag]** → Document post-deploy URL Inspection / Validate fix; in-repo cannot force reindex.

## Migration Plan

1. Land head injection + SEO.tsx schema/hreflang fixes + sitemap home cleanup.
2. Deploy; curl critical product/events URLs and assert titles/canonicals without JS.
3. In GSC: Validate fix on duplicate-canonical; request indexing for events/product URLs.
4. Rollback = revert deploy; static copies fall back to previous artifact.

## Open Questions

- None that block implementation; phone confirmation can be a checkbox in tasks before merge.
