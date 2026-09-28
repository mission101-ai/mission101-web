## Why

The site's SEO work to date (`seo/static-document-heads`, `seo/structured-data`, `seo/service-page-depth`) has made the `<head>` and JSON-LD self-describing per route, and has made the hydrated body content substantive — but every one of those requirements is phrased as true only "after hydration" / "after client-side SEO updates run." The raw HTML response for every indexable route is still `<div id="root"></div>` plus a JS bundle: confirmed by inspecting `public/en/services/voice-agents/index.html`, whose `<body>` contains no rendered markup at all. Google's AI features render JavaScript before evaluating content, so this doesn't hurt Google — but GPTBot, ClaudeBot, and PerplexityBot largely do not execute JavaScript. Today those crawlers see a title tag and a meta description and nothing else: no service descriptions, no FAQ answers, no Uzhhorod local content. The single highest-leverage step to get this site citable by non-Google AI engines is making the actual page content present in the initial HTML response, not just the head.

## What Changes

- Extend the existing build-time prerender step (`scripts/seo-head.mjs`, wired into `vite.config.ts`'s `closeBundle` hook) so that, in addition to rewriting `<head>` tags, it captures and inlines the fully rendered main content for each indexable route into that route's static `index.html`.
- Cover the same route set the head-prerendering step already targets: language homes (`/`, `/en/`, `/ua/`), Uzhhorod (`/en/uzhhorod/`, `/ua/uzhhorod/`), all 8 service pages in both languages, and the product/events routes currently handled by `getInjectedRouteMetas()` (Image Resizer, Image Resizer privacy, Legal, events index, event detail).
- Use a headless-render pass (e.g. driving the built app with a headless browser at build time) as the mechanism, rather than hand-maintaining duplicate body markup per route — the app already renders correctly client-side, so the same render output should be captured and baked into the static file rather than re-authored.
- Ensure client-side hydration attaches to the prerendered markup without a visible re-render flash or content mismatch (React hydration, not client-side replace-and-rerender).
- Ensure the prerendered body content stays in sync with source content going forward: the prerender step must run as part of the existing `npm run build` pipeline (already the case for heads) so stale snapshots can't ship.

## Capabilities

### New Capabilities
- `seo/static-document-bodies`: defines that indexable marketing routes must ship their page-specific main content (not just document head metadata) in the raw HTML response, so non-JavaScript-executing clients (AI crawlers, some link-preview bots) receive the real page content on first response.

## Impact

- `scripts/seo-head.mjs`: extend beyond head-tag string replacement to also inject rendered body markup; likely introduces a headless-rendering dependency (e.g. Playwright/Puppeteer, already available in devDependencies via `@playwright/test`) run at build time.
- `vite.config.ts`: the `closeBundle` hook that currently calls `writePrerenderedHtml` per route needs to also produce/consume the rendered body snapshot; build time will increase (renders N routes × 2 languages headlessly).
- `public/en|ua/{services/*,uzhhorod}/index.html`: these hand-maintained shells become prerender output/input for body content too, or are superseded by generated output — decide in design.md.
- `src/main.tsx` / app entry: verify React uses `hydrateRoot` (not `createRoot`) against server-rendered markup so hydration doesn't discard or flash-replace the prerendered content.
- CI/build pipeline (`npm run build`): build duration increases; must still complete within existing CI time budget and remain deterministic for the 61 Playwright E2E tests that assert on prerendered output.
- No change to visual design, routing, or client-side behavior for users with JavaScript enabled — this only changes what is present before JS runs.
