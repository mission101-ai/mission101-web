## Context

See proposal.md - Why. Today `scripts/seo-head.mjs` (invoked from `vite.config.ts`'s `closeBundle` hook) only string-replaces `<head>` tags into per-route HTML shells; `<body>` is always the built `dist/index.html` shell (`<div id="root"></div>` + hashed script/style tags). Route coverage today is a mix of hand-maintained shells copied from `public/en|ua/{index,uzhhorod,services/<slug>}/index.html` and shells generated purely from the built `dist/index.html` with injected head-only metadata for products/events (`getInjectedRouteMetas`). No mechanism today executes the app itself at build time. `@playwright/test` is already a devDependency (used for E2E), so a headless Chromium binary is already available in CI without adding a new browser download.

## Goals / Non-Goals

**Goals:**
- Every indexable route's static HTML response contains that route's real rendered main content, matching what `seo/static-document-bodies` requires.
- Reuse the existing build pipeline entry point (the `closeBundle` hook that already writes per-route files) rather than introducing a parallel build system.
- Hydration attaches to prerendered markup without a content flash or mismatch warning.
- Keep this scoped to the routes already covered by head prerendering; don't expand route coverage as part of this change.

**Non-Goals:**
- Server-side rendering (SSR) at request time — the site is static-hosted on GitHub Pages with no server runtime; this is build-time prerendering only.
- Solving client-side-only interactive features (e.g. the particle canvas hero, scroll-triggered animations) statically — those remain JS-enhanced; only the textual/structural content they wrap needs to be present.
- Changing visual design or route structure.

## Decisions

- **Prerendering mechanism: headless-browser snapshot, driven from the existing build script.** After `vite build` produces `dist/`, spin up a local static server against `dist/`, drive each covered route (language × route-list already enumerated in `vite.config.ts`'s `serviceSlugs` array and `getInjectedRouteMetas()`) with Playwright's Chromium, wait for the app to finish its initial render (e.g. a data attribute or `document.title` settling, avoiding a fixed sleep), and capture `document.documentElement.outerHTML`. This replaces the current "copy a hand-maintained shell + string-replace head tags" step with "render the real route once, keep its head-rewriting behavior, keep its resulting HTML as the file."
- **`seo-head.mjs`'s head-rewriting logic is preserved, not replaced.** The existing `applySeoHead`/hand-maintained-shell logic already guarantees correct heads; keep it as a fallback/validation step (or drop the hand-maintained shells once the headless snapshot is proven to already contain equivalent head values) rather than maintaining two divergent head sources. Concretely: run the headless capture first, then run the existing head-normalization pass over the captured HTML so head correctness doesn't regress and doesn't depend on the headless render's timing.
- **Hydration must use `hydrateRoot`, not `createRoot` + wipe-and-rerender.** Check `src/main.tsx`; if it currently calls `createRoot(...).render(...)`, switch the production entry to `hydrateRoot` when prerendered markup is detected (e.g. check for a marker attribute written by the prerender step), so React reconciles against existing DOM instead of clearing it.
- **Build-time cost is bounded and explicit.** Route count is fixed (home ×2 langs, Uzhhorod ×2, 8 services ×2, 3 products, 2 events ≈ 30 page renders); render them with bounded concurrency (e.g. a small worker pool) rather than serially, and fail the build loudly if a route's headless render throws or times out (no silent fallback to an empty shell, since that would quietly reintroduce the exact problem this change fixes).
- **CI impact.** `npm run build` already runs before the 61-test Playwright suite in CI; the added headless-render pass runs in the same environment that already has Chromium available for `@playwright/test`, so no new CI dependency, only added build time. Budget and measure this explicitly during implementation (tasks.md) rather than assuming it's negligible.
- **Locale/content drift.** Because the snapshot is taken from the already-built, already-i18n-resolved app, there is no separate content source to keep in sync (unlike the current hand-maintained shells) — this design removes a drift risk (hand-authored shells falling out of sync with i18n JSON) rather than introducing one.

## Risks / Trade-offs

- Headless rendering at build time is slower and more failure-prone (timeouts, flaky waits) than string replacement; mitigate with a generous but bounded timeout per route and clear build failure on timeout rather than partial/empty output.
- Introduces React hydration-mode sensitivity (mismatches between server-captured markup and first client render can log console warnings or, worse, cause visible re-layout); needs verification per route during implementation, especially for components with client-only randomness or `Date.now()`-based content (check the particle canvas hero and any animation-driven markup for hydration-unsafe output).
- Broken or partial hydration on prerendered routes could hurt real users more than the current all-JS baseline if not tested carefully — implementation must include a manual/automated check that every covered route is fully interactive after hydration, not just visually present.
