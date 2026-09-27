## Why

A code-level SEO audit (2026-09-27) found three gaps: the homepage meta description runs to 181 characters and gets truncated in Google's SERP snippet; the site has no `BreadcrumbList` structured data despite a deep, nested URL hierarchy (services, events, products) that would benefit from breadcrumb rich results; and the shared `SEO` component has no way to mark a page `noindex`, so thin or future utility pages can't be excluded from the index without a code change to the component itself.

## What Changes

- Shorten the English homepage meta description to fit within ~150–160 characters so it is not truncated in search results.
- Add `BreadcrumbList` JSON-LD to service, event, and product page templates, reusing the existing per-page JSON-LD pattern in `src/components/SEO.tsx`.
- Add an optional `noindex` prop to the shared `SEO` component that injects `<meta name="robots" content="noindex, follow">` when set, with no page opted in by default (purely additive capability).

## Capabilities

### New Capabilities
- `seo/robots-control`: Lets any page opt into `noindex, follow` via the shared `SEO` component, without changing the component's file for each new excluded page.

### Modified Capabilities
- `seo/homepage-serp-copy`: Tightens the English homepage meta description requirement from a SHOULD-level length target to a MUST-level maximum (≤160 characters), and requires the shipped copy to actually satisfy it.
- `seo/structured-data`: Adds a requirement that service, event, and product pages expose `BreadcrumbList` JSON-LD reflecting the page's position in the site hierarchy, after hydration.

## Impact

- `index.html`, `public/en/index.html` (and any prerender template it feeds): update the English homepage meta description string.
- `src/i18n/locales/en.json`: update the `seo.description` value used by the same homepage copy at runtime.
- `src/components/SEO.tsx`: add `noindex` prop handling and `BreadcrumbList` JSON-LD generation for service/event/product page types.
- `scripts/seo-head.mjs` and `vite.config.ts`: no structural change expected, but the prerendered shells must continue to match whatever the `SEO` component renders at hydration (per the existing `static-document-heads` capability) — verify prerendered breadcrumb/description output still agrees with client output.
- No routing, dependency, or build-tooling changes.
