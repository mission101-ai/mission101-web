## Context

See proposal.md for motivation. mission101-web is a Vite + React Router SPA on GitHub Pages with language-prefixed content routes (`/en/...`, `/ua/...`). Deep links work because the Vite build copies `index.html` into static folders under `public/`/`dist/` for each known path. Existing content pages (services, events, Uzhhorod) all require a lang prefix; only `/` is lang-less. `resize-image-app` `prepare-store-launch` originally documented lang-less `/products/...` URLs; those currently 404, and this change deliberately adopts `/en/...` store canonicals instead of adding a lang-less product namespace.

## Goals / Non-Goals

**Goals:**
- Ship product + privacy pages that return HTTP 200 at the English store URLs and Ukrainian mirrors.
- Keep routing, language switching, SEO, sitemap, and static hosting patterns consistent with existing pages.
- Encode the on-device-only privacy posture expected by App Privacy / Data safety answers.

**Non-Goals:**
- Lang-less `/products/...` aliases or redirects in this change.
- Editing `resize-image-app` files from this repo’s apply phase (call out the URL update as an external follow-up).
- Rewriting Meta/LinkedIn `public/privacy-policy.txt`.
- App Store / Play Console form filling (owned by the mobile launch change).

## Decisions

### 1. Store canonicals include `/en`
- **Choice:** Publish store-facing URLs as `https://mission101.ai/en/products/image-resizer` and `https://mission101.ai/en/products/image-resizer/privacy-policy`. Also ship `/ua/products/...` mirrors.
- **Rationale:** Matches this site’s established i18n routing; language switcher already rewrites the first path segment between `en` and `ua`.
- **Alternatives considered:** Lang-less canonicals (would be a new routing exception and diverge from services/events); `/ua` as store default (rejected — store listing kit is English-first).

### 2. New `products` route namespace
- **Choice:** Add `/en|ua/products/image-resizer` and `/en|ua/products/image-resizer/privacy-policy` routes (with trailing-slash duplicates), separate from `/services/:slug`.
- **Rationale:** Store prep already named a `products` path; products are shippable apps, not consulting service pages.
- **Alternatives considered:** Reuse `/services/image-resizer` — rejected; different content model and wrong URL contract for store docs after the `/en` decision.

### 3. Page composition mirrors existing content pages
- **Choice:** New React page components (product + privacy) using shared nav/footer/SEO patterns already used by service/event pages; copy lives in `en.json` / `ua.json`.
- **Rationale:** Fastest path to EN/UA parity and consistent light-theme layout.
- **Alternatives considered:** Static markdown-only HTML outside the SPA — rejected; would bypass language switcher and existing SEO component.

### 4. Static hosting copies + sitemap entries
- **Choice:** Extend the Vite `copy-index-to-lang-folders` plugin to emit the four product/privacy directories, and add matching `sitemap.xml` entries with hreflang pairs (`x-default` → English product/privacy URLs).
- **Rationale:** Same GitHub Pages deep-link pattern as services/events; without copies, refresh/direct hits 404.
- **Alternatives considered:** Rely on SPA client routing only — rejected; production currently depends on physical `index.html` copies.

### 5. Privacy content source
- **Choice:** Author Image Resizer–specific policy copy in i18n JSON (EN + UA) aligned with `prepare-store-launch` posture: on-device Camera/Photo Library use; no developer off-device collection via analytics/ads/crash SDKs/backend.
- **Rationale:** Existing `privacy-policy.txt` covers Meta/LinkedIn apps and would misrepresent this product to store reviewers.
- **Alternatives considered:** Link store forms to `privacy-policy.txt` — rejected; wrong product scope.

### 6. Cross-repo URL sync
- **Choice:** Document the new English URLs as the required update for `resize-image-app` `prepare-store-launch`; do not edit that repo during this change’s apply.
- **Rationale:** OpenSpec apply for this change is scoped to mission101-web; mobile docs update is a separate, explicit follow-up before store submission tasks that curl the privacy URL.

## Risks / Trade-offs

- **[Store docs still cite lang-less URLs]** → Submission checklist fails or points at 404s. Mitigation: treat updating `prepare-store-launch` as a hard prerequisite before mobile submit tasks; verify production `/en/...` URLs with `curl -I`.
- **[GitHub Pages deep-link 404]** → Missing static folder copies. Mitigation: extend Vite copy plugin + Playwright route tests; confirm `dist/en/products/.../index.html` exists after build.
- **[Privacy text drifts from store answers]** → Reviewer mismatch. Mitigation: keep policy statements aligned with the mobile listing kit’s “no off-device collection” answers; link product page to privacy page.
- **[Language switcher path edge cases]** → Nested `privacy-policy` path must survive `en`↔`ua` swap. Mitigation: reuse existing `LanguageContext` prefix swap; add E2E coverage for switcher on both pages.

## Migration Plan

1. Implement routes, pages, i18n, SEO, sitemap, and static copies in mission101-web.
2. Deploy to mission101.ai; confirm HTTP 200 on both English store URLs (and Ukrainian mirrors).
3. Update `resize-image-app` `prepare-store-launch` artifacts/README to the `/en/...` URLs.
4. Proceed with App Store / Play privacy URL fields using the English privacy URL.

Rollback: revert the mission101-web deploy; store forms should not be submitted until the live English URLs are confirmed.

## Open Questions

- None material for this change. Optional later: whether to add lang-less redirects from the originally documented paths for bookmark compatibility after stores are live.
