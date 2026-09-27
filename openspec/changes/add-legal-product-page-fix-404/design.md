## Context

See proposal.md for motivation. mission101-web already ships Image Resizer product pages under `/en|ua/products/image-resizer` with shared `UzhhorodNav` / `FooterSection`, light-theme styling, i18n copy, SEO hreflang via `productHreflangPath`, sitemap entries, and Vite `copy-index-to-lang-folders` static copies for GitHub Pages deep links.

Mission101 Legal already hosts store-review public pages on its own origin:
- Product: `https://legal.mission101.ai/`
- Privacy: `https://legal.mission101.ai/privacy`
- Support: `https://legal.mission101.ai/support`

The current `NotFound` page is a minimal centered stack on the dark global `bg-background` token, without shared nav/footer. That combination reads as misaligned/orphaned next to light marketing pages.

## Goals / Non-Goals

**Goals:**
- Reuse the Image Resizer product-page composition for Legal under `/en|ua/products/legal`.
- Keep Legal privacy/support authoritative on `legal.mission101.ai` and only deep-link to them from mission101.ai.
- Keep GitHub Pages deep-link, SEO, sitemap, and Playwright patterns consistent with Image Resizer.
- Bring the 404 page into a centered, light marketing shell with shared chrome.

**Non-Goals:**
- Authoring a Legal privacy-policy page body on mission101.ai.
- Changing Legal’s own public routes or store URL constants in the `legal.mission101.ai` repo during this apply.
- Lang-less `/products/legal` aliases.
- Editing Meta/LinkedIn `public/privacy-policy.txt`.

## Decisions

### 1. Slug `legal` under `/products`
- **Choice:** Routes at `/en|ua/products/legal` (with trailing-slash duplicates).
- **Rationale:** Short, matches product short name and Image Resizer’s kebab slug style (`image-resizer`).
- **Alternatives considered:** `mission101-legal` (more verbose, no current need); nesting under `/services` (wrong content model).

### 2. External privacy/support links instead of a local privacy page
- **Choice:** Product page privacy CTA opens `https://legal.mission101.ai/privacy`. Also expose links to `https://legal.mission101.ai/` and `https://legal.mission101.ai/support`. No `.../products/legal/privacy-policy` route in this change.
- **Rationale:** User asked to reuse the policy Legal already has; that page is the store-facing privacy URL and stays the single source of truth for Legal data practices.
- **Alternatives considered:** Mirror/copy privacy body onto mission101.ai (duplicates maintenance and can drift); iframe Legal privacy (fragile, worse SEO/UX).

### 3. Page composition mirrors Image Resizer
- **Choice:** New `LegalProductPage` (name may vary) using `UzhhorodNav`, light-theme wrapper, feature cards, support block, `FooterSection`, and `SEO` with `productHreflangPath="products/legal"`. Copy in `en.json` / `ua.json` under `products.legal`, adapted from Legal’s public product messaging.
- **Rationale:** Proven pattern; language switcher and SEO already understand product paths.
- **Alternatives considered:** Thin redirect-only page to `legal.mission101.ai` (rejected — company site still needs a first-party product presence); embed Legal web app (out of scope).

### 4. Store badges plus web app CTA
- **Choice:** Show App Store and Google Play buttons with live URLs (`https://apps.apple.com/us/app/mission101-legal/id6782926649` and `https://play.google.com/apps/test/ai.mission101.legal/2`), plus an “Open Mission101 Legal” CTA to `https://legal.mission101.ai/`. Note in copy that Android is available through Google Play testing.
- **Rationale:** iOS is publicly listed; Android is on a Play test track; the web product URL remains useful for desktop visitors and store-review public pages.
- **Alternatives considered:** Store placeholders only (rejected once live URLs were available); omit web CTA (rejected — web remains a primary surface).

### 5. Logo asset copied from Legal brand app icon
- **Choice:** Copy `legal.mission101.ai/frontend/assets/brand/ios/icon-light.png` (dark case-file mark on white) into `public/products/legal/app-icon.png` and reference it from the product page. Do not use the legacy `frontend/assets/icon.png` scales mark.
- **Rationale:** Matches Legal’s active brand pack and the light marketing page background; same approach as Image Resizer’s local product icon asset.
- **Alternatives considered:** `icon-dark.png` (better on dark surfaces); legacy `frontend/assets/icon.png` (outdated scales artwork); hotlink Legal CDN/origin assets (cross-origin fragility).

### 6. Static hosting + sitemap for Legal product only
- **Choice:** Extend Vite copy plugin for `en|ua/products/legal` index copies; add sitemap + hreflang pairs for those two locs. Do not add privacy-policy static folders for Legal.
- **Rationale:** Only the new mission101.ai routes need deep-link copies.
- **Alternatives considered:** Skip static copies and rely on SPA-only routing (fails GitHub Pages direct loads).

### 7. 404 redesign uses shared light chrome + explicit centering
- **Choice:** Rebuild `NotFound` to use the same light-theme shell as content pages (`UzhhorodNav` + centered content column + `FooterSection`), with a max-width content block, `text-center`, and flex centering for the main message stack. Keep i18n `notFound.*` strings; prefer language-aware home link (`/en` or `/ua`) when language context is available.
- **Rationale:** Current page sits on dark global background without site chrome, so it looks like a disconnected fragment and reads as “not aligned” relative to product/marketing pages.
- **Alternatives considered:** Only tweak CSS on the existing minimal page (may still feel orphaned); full branded illustration 404 (unnecessary scope).

## Risks / Trade-offs

- **[Two product URLs for Legal]** (`legal.mission101.ai/` and `mission101.ai/en/products/legal`) → Store operators may be unsure which to paste. Mitigation: keep Legal’s own store constants pointing at `legal.mission101.ai` unless/until Legal docs deliberately adopt the company-site URL; mission101.ai page clearly links to the Legal origin.
- **[Privacy link is cross-origin]** → Visitors leave mission101.ai. Mitigation: expected and desirable for a single policy source; open in same tab like a normal navigation unless UX later prefers `target="_blank"` with `rel="noopener"`.
- **[GitHub Pages deep-link 404 for `/products/legal`]** → Missing static folder copies. Mitigation: Vite plugin extension + Playwright + post-build path checks.
- **[404 with nav still feels “wrong” for unknown SPA hashes]** → GitHub Pages `404.html` SPA bootstrap may briefly flash before React mounts. Mitigation: keep client Not Found coherent after mount; do not expand scope into rewriting `public/404.html` SPA redirect mechanics unless verification shows a real layout bug there.

## Migration Plan

1. Implement Legal product page, routes, i18n, asset, SEO, sitemap, and static copies.
2. Redesign Not Found page and cover with Playwright (unknown route + desktop/mobile alignment smoke).
3. Deploy mission101.ai; confirm `curl -I` HTTP 200 on `/en/products/legal` and `/ua/products/legal`, and visually verify 404 alignment.
4. Optionally note the new company-site product URL in Legal publishing docs in a separate change.

Rollback: revert the mission101-web deploy.

## Open Questions

- Whether Legal store listing forms should eventually prefer `https://mission101.ai/en/products/legal` over `https://legal.mission101.ai/` — defer; does not block this change’s specs or tasks.
