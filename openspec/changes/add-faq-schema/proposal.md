## Why

Service pages and the Uzhhorod local page already render genuine, self-contained FAQ content (`servicePages.<slug>.faq` and `uzhhorod.faq.items` in the i18n locale files), but none of it is exposed as `FAQPage` JSON-LD. AI answer engines and rich-result systems that look for structured Q&A markup currently have no machine-readable signal that this content exists, even though the prose itself is exactly the extractable shape they reward. This is a low-effort, high-value fix: the Q&A pairs already exist, they just need to be surfaced as schema.

## What Changes

- Generate `FAQPage` JSON-LD (with nested `Question`/`Answer` entities) from the existing `servicePages.<slug>.faq` array for each of the 8 indexable service pages, in both `en` and `ua`.
- Generate `FAQPage` JSON-LD from the existing `uzhhorod.faq.items` array for the Uzhhorod local page, in both `en` and `ua`.
- Emit this schema from the client-side `SEO.tsx` component (so it's present after hydration) **and** from the hand-maintained static prerender templates for these routes (`public/en|ua/services/<slug>/index.html`, `public/en|ua/uzhhorod/index.html`), so it is present in the raw HTML too.
- Combine the new `FAQPage` graph with each page's existing schema (`Service` + `BreadcrumbList` on service pages; `LocalBusiness` on the Uzhhorod page) via `@graph`, rather than replacing it.
- Only emit `FAQPage` schema on a page when that page actually has 2+ FAQ items in the current locale (some services may lack translated FAQ entries); do not emit an empty or single-item FAQPage.

## Capabilities

### Modified Capabilities
- `seo/structured-data`: adds a requirement that service pages and the Uzhhorod page expose `FAQPage` JSON-LD (built from their existing on-page FAQ content) alongside their current schema graphs, both after hydration and in the static HTML for those routes.

## Impact

- `src/components/SEO.tsx`: add FAQPage graph construction for `isServicePage` and Uzhhorod branches, sourced from i18n FAQ data.
- `public/en/services/*/index.html`, `public/ua/services/*/index.html`, `public/en/uzhhorod/index.html`, `public/ua/uzhhorod/index.html`: add matching static `FAQPage` JSON-LD (or a `@graph` merge with the existing `Service`/`LocalBusiness`/`BreadcrumbList` schema already in those files).
- `src/i18n/locales/en.json`, `src/i18n/locales/ua.json`: no structural change expected — reused as the data source; only fixed if any service is missing FAQ entries needed to satisfy the new requirement in both languages.
- No routing, visual, or navigation changes; purely additive structured data.
