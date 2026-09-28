## 1. Hydration readiness

- [ ] 1.1 Inspect `src/main.tsx` and confirm whether it uses `createRoot` or `hydrateRoot`
- [ ] 1.2 If using `createRoot`, switch the production entry point to `hydrateRoot` against a marker-detected prerendered root, keeping `createRoot` as the dev-server fallback (no prerendered markup exists under `npm run dev`)
- [ ] 1.3 Audit components rendered on covered routes (hero/particle canvas, scroll-triggered animations, anything using `Date.now()`/`Math.random()`/`window` at initial render) for hydration-unsafe output that would mismatch between server-captured and first client render; adjust to defer such effects to `useEffect` if needed

## 2. Headless prerender pipeline

- [ ] 2.1 Add a headless-rendering step to the build pipeline using the existing `@playwright/test` Chromium install: serve the built `dist/` directory locally, then visit each covered route (home ×2 langs, Uzhhorod ×2, all 8 service slugs ×2, Image Resizer, Image Resizer privacy, Legal, events index, known event detail routes ×2 langs where applicable)
- [ ] 2.2 Wait for each route's initial render to settle using an explicit signal (e.g. a data attribute the app sets once its main content has mounted) rather than a fixed timeout
- [ ] 2.3 Capture `document.documentElement.outerHTML` per route and write it to that route's static output file, replacing the current hand-copied-shell approach
- [ ] 2.4 Bound concurrency (small worker pool) so the added build step has predictable, bounded wall-clock cost; fail the build with a clear error if any route's render throws or times out
- [ ] 2.5 Re-run the existing head-normalization logic (`applySeoHead` / the per-service and Uzhhorod head values) over the captured HTML so head correctness is guaranteed independent of what the headless render happened to produce
- [ ] 2.6 Wire this step into the existing `closeBundle` hook in `vite.config.ts` so it runs as part of `npm run build` with no separate manual command

## 3. Retire redundant hand-maintained shells

- [ ] 3.1 Once headless-captured output is verified to contain correct head values and full body content, evaluate removing the now-redundant hand-maintained `public/en|ua/{index,uzhhorod,services/<slug>}/index.html` shells (or keep them only as a fallback source if the headless step fails for a route) — decide and record the outcome; do not leave two silently-diverging sources of truth

## 4. Build performance

- [ ] 4.1 Measure `npm run build` duration before and after this change; if the added time meaningfully affects CI budget, document the new baseline and confirm it stays acceptable
- [ ] 4.2 Confirm CI's Playwright/Chromium setup already used for E2E tests is reused for the build-time headless pass (no duplicate browser download step)

## 5. Verification

- [ ] 5.1 For at least one route per category (home, Uzhhorod, one service, one product, events index), fetch the built static HTML directly (e.g. `curl`) and confirm main body content — including FAQ text where applicable — is present without executing JavaScript
- [ ] 5.2 Load each of those routes in a real browser and confirm no visible flash-of-empty-content and no React hydration-mismatch warnings in the console
- [ ] 5.3 Run the existing Playwright E2E suite (`npm run test`) and confirm all 61 tests still pass against the new build output
- [ ] 5.4 Spot-check that a locale content edit (e.g. changing one FAQ answer in `src/i18n/locales/en.json`) is reflected in the corresponding static HTML after `npm run build`, with no manual HTML edit required
