## 1. Client-side FAQPage schema

- [x] 1.1 Add an FAQ→`FAQPage` JSON-LD conversion (question/answer array → `Question`/`acceptedAnswer` entities) in `src/components/SEO.tsx`
- [x] 1.2 In the `isServicePage` branch, read `servicePages.<serviceSlug>.faq` for the current language via `t(...)`, and when 2+ items exist, append the `FAQPage` entity to the existing `@graph` alongside `Service` and `BreadcrumbList`
- [x] 1.3 In the Uzhhorod branch, read `uzhhorod.faq.items` for the current language, and when 2+ items exist, append the `FAQPage` entity alongside the existing `LocalBusiness` schema (convert that branch's single-object schema to `@graph` form to accommodate it)
- [x] 1.4 Skip emitting `FAQPage` when fewer than 2 FAQ items exist for the current page/locale

## 2. Static prerender FAQPage schema

- [x] 2.1 In `scripts/seo-head.mjs`, extend `loadLocales()`'s consumers (or add a sibling helper) to read `servicePages.<slug>.faq` per language for each of the 8 service slugs, and `uzhhorod.faq.items` per language
- [x] 2.2 Add a build step (invoked from the same `closeBundle` pass in `vite.config.ts` that already writes service/Uzhhorod shells) that rewrites each static shell's JSON-LD block into `@graph` form including the existing schema plus the generated `FAQPage` entity, for both `en` and `ua`
- [x] 2.3 Apply the same 2+ item skip condition as the client-side path so static and hydrated schema never disagree
- [x] 2.4 Verify the rewritten static JSON-LD is valid JSON and passes structured-data validation (e.g. via a schema.org validator or a quick JSON-LD parse in a test) for at least one service and the Uzhhorod page in both languages

## 3. Content completeness check

- [x] 3.1 Confirm every service slug has FAQ entries in both `servicePages.<slug>.faq` (en) and the Ukrainian equivalent; if any language is missing FAQ content for a service, either add translated FAQ content or explicitly accept that service/locale combination will have no `FAQPage` schema (per the 2+ item skip rule) and note which

## 4. Verification

- [x] 4.1 Run `npm run build` and inspect the generated static HTML for at least one service page and the Uzhhorod page (both languages) to confirm `FAQPage` JSON-LD is present in the raw file, not only after hydration
- [x] 4.2 Manually load a service page and the Uzhhorod page in a browser, inspect the hydrated `application/ld+json` script, and confirm the `FAQPage` entity matches the on-page FAQ text exactly
- [x] 4.3 Run the existing Playwright E2E suite (`npm run test`) and confirm no regressions in existing SEO/structured-data assertions
- [x] 4.4 Added `e2e/faq-schema.spec.ts`: permanent regression coverage for every scenario in `specs/seo/structured-data/spec.md` (FAQPage present and matching DOM for services with FAQ + Uzhhorod, absent for services without, coexists with existing schema, static/hydrated parity), in both languages
