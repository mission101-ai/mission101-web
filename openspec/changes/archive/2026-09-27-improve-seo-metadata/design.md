## Context

`src/components/SEO.tsx` is a single shared component, mounted per-route, that imperatively writes `document.title`, meta tags, canonical/hreflang links, and one `application/ld+json` script into `<head>` on mount and on relevant prop/location changes (see proposal.md - Why). Static HTML for indexable routes is separately baked at build time by `scripts/seo-head.mjs` + the `copy-index-to-lang-folders` Vite plugin, and the existing `static-document-heads` capability requires that static and hydrated heads agree. Any change to what `SEO.tsx` renders for a page must not create a mismatch with what the corresponding prerendered shell already contains.

## Goals / Non-Goals

**Goals:**
- Shorten the homepage meta description in both the runtime source (`en.json`) and the static/prerendered HTML that copies it, so they stay in agreement.
- Add `BreadcrumbList` JSON-LD generation to `SEO.tsx` for service, event, and product page types, derived from data already available to the component (path segments, i18n page titles) rather than new hardcoded strings.
- Add a `noindex` boolean prop to `SEO.tsx` with no behavior change for existing callers that omit it.

**Non-Goals:**
- Not introducing per-page static prerendering for breadcrumbs — this JSON-LD is client-hydrated only, matching how the existing `Service`/`LocalBusiness`/application schemas already work today (they are added by `SEO.tsx` after hydration, not baked into the static shell).
- Not changing the prerender pipeline (`scripts/seo-head.mjs`, `vite.config.ts`) to inject breadcrumb schema server-side; the existing pattern for JSON-LD in this codebase is hydration-only, and `static-document-heads` only requires title/description/canonical/OG/hreflang to be pre-baked, not JSON-LD.
- Not using any noindex flag on existing routes as part of this change; the prop is additive plumbing only.

## Decisions

**Breadcrumb data source: derive from existing route/i18n data, not a new config file.**
`SEO.tsx` already receives `isServicePage`/`serviceSlug`, and location/i18n context for events and products. Breadcrumb labels will reuse the same translated strings already used for page titles (e.g., service name, event name, product name) rather than introducing a parallel breadcrumb-label dataset that could drift out of sync.
- Alternative considered: a dedicated breadcrumb map keyed by route. Rejected — doubles the maintenance surface for labels that already exist in `en.json`/`ua.json`.

**Breadcrumb schema is added via the same `schemaScript` element pattern already in `SEO.tsx`, as an additional `@graph` entry or sibling script.**
The component currently writes exactly one `application/ld+json` script per page type (Service, LocalBusiness, application, or homepage graph) and removes it for page types with no defined graph. Breadcrumb data will be merged into that same script (as an additional object in an `@graph` array) rather than a second `<script>` tag, keeping the "one schema script per page" invariant the component already relies on for cleanup between navigations.
- Alternative considered: a second, independently managed script tag for breadcrumbs. Rejected — adds a second element to track through mount/unmount/cleanup for no benefit, and risks stale breadcrumb scripts lingering after navigation the same way the existing single-script cleanup logic was built to prevent.

**Homepage description edit touches two files, kept in lockstep by inspection, not automation.**
The runtime string lives in `src/i18n/locales/en.json` (`seo.description`); the static prerendered value lives in `public/en/index.html` (and the root `index.html` shell). Both will be updated to the same new string in this change. No new build-time sync step is introduced — the existing `static-document-heads` requirement already expects these to match, and the prerender pipeline does not read `en.json` for the homepage shell today.

**`noindex` prop renders `<meta name="robots" content="noindex, follow">` only, no `nofollow` variant.**
`follow` is kept so internal link equity still flows from any future noindexed page; nothing in the current codebase needs `nofollow`. If a future page needs it, the prop can be extended then.

## Risks / Trade-offs

- [Risk] Merging breadcrumb data into the existing single JSON-LD script increases branching complexity in `SEO.tsx`. → Mitigation: keep breadcrumb construction as a small pure helper function that returns a JSON-LD object or `null`, composed into the existing `@graph` array only for the three affected page types.
- [Risk] Editing the homepage description in two places (`en.json` and the static HTML) can drift again in the future the same way it did before. → Mitigation: out of scope to fully automate here, but note the drift risk explicitly so a future change can consider generating the static shell's description from `en.json` at build time.
- [Risk] Breadcrumb URLs for event/service pages depend on slug-to-label lookups; a missing translation key could render an empty breadcrumb label. → Mitigation: fall back to the already-rendered page `<title>`/H1 string (already resolved by the time `SEO` runs) rather than a fresh i18n lookup that could miss a key.
