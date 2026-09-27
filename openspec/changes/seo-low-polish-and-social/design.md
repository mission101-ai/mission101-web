## Context

See proposal.md for motivation. Default OG image is `public/mission101-og-2026.png` (currently 1024×1024) referenced from `index.html`, prerender heads, and `SEO.tsx`. `www.mission101.ai` fails DNS. `public/404.html` is the spa-github-pages shim with title `Redirecting...`. Marketing layouts generally lack a `<main>` landmark.

## Goals / Non-Goals

**Goals:**
- Correct social preview asset + metas.
- Document/implement www→apex.
- Clearer 404 shim title; `<main>` landmark on primary templates.

**Non-Goals:**
- Redesigning the 404 React page layout (already handled in prior not-found work).
- Broad a11y audit beyond landmark + label-name mismatches found in Lighthouse.
- CWV performance program.

## Decisions

### 1. Replace OG file in place or with dated filename
- **Choice:** Produce a new 1200×630 asset; prefer updating path to a new filename (e.g. `mission101-og-1200x630.jpg`) and updating all references, keeping the old file temporarily to avoid broken caches mid-deploy—or overwrite if references stay stable. Prefer JPEG/WebP for weight.
- **Rationale:** Dimension metas are wrong today; square PNG crops poorly in link previews.
- **Alternatives considered:** CSS-only crop (impossible for OG crawlers).

### 2. www via DNS CNAME/ALIAS + GitHub Pages www redirect
- **Choice:** Add `www` DNS to GitHub Pages and enable www redirect to apex in domain settings (operator task with verification curl). Document exact clicks in tasks.
- **Rationale:** Hosting already apex-on-GitHub; www is missing entirely.
- **Alternatives considered:** Ignore www (keeps broken typed URLs).

### 3. 404 shim title only
- **Choice:** Change `public/404.html` `<title>` to include `404` / `Not Found` while preserving redirect script behavior.
- **Rationale:** Spec targets crawler-visible title; do not reintroduce soft-404 by serving 200.
- **Alternatives considered:** Removing spa shim (would break deep-link recovery pattern).

### 4. Wrap page bodies in `<main>`
- **Choice:** Add `<main>` around primary content in shared page shells / section stacks without changing styling.
- **Rationale:** Fixes Lighthouse landmark failure; helps AT jump links.
- **Alternatives considered:** `role="main"` on a div (acceptable fallback if needed).

## Risks / Trade-offs

- **[DNS propagation delay for www]** → Document verify-after-TTL; apex remains unaffected.
- **[Cached OG image on social platforms]** → Cache-bust via new filename when possible.
- **[main landmark nesting]** → Ensure only one main per page; avoid putting nav/footer inside main.

## Migration Plan

1. Ship asset + meta + main + 404 title in repo.
2. Operator configures www DNS/Pages redirect; verify with curl.
3. Optional: re-share a URL to refresh OG caches.
4. Rollback asset by restoring previous file/references.

## Open Questions

- None blocking; final OG artwork can be a simple brand card generated at apply time.
