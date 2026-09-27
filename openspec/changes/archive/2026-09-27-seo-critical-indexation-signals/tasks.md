## 1. Canonical and hreflang policy

- [x] 1.1 Update runtime SEO so `/en/` (and `/en`) advertise canonical + `og:url` as `https://mission101.ai/`, and verify in the browser after load that `link[rel=canonical]` equals the apex URL
- [x] 1.2 Change `SEO.tsx` service and Uzhhorod `x-default` targets to English URLs (trailing slash) and verify on `/en/services/voice-agents/` and `/en/uzhhorod/` that HTML `x-default` matches `sitemap.xml`
- [x] 1.3 Align product/events/home hreflang clusters (self + reciprocal `en`/`uk` + `x-default`) and verify with Playwright or DevTools that codes are `en`/`uk` (not `ua`)
- [x] 1.4 Update `public/sitemap.xml` home cluster so preferred English home is consistent (omit or non-index duplicate `/en/` loc as decided in design) and verify sitemap still well-formed (`xmllint` or parse) with matching `x-default` values

## 2. Structured data

- [x] 2.1 Stop deleting homepage JSON-LD on hydration; keep/replace Organization + WebSite and verify `/en/` or `/` still has `application/ld+json` after load
- [x] 2.2 Set LocalBusiness `telephone` to E.164 `+380974825097` (confirm with operator if needed) in runtime + prerender Uzhhorod HTML and verify the value appears in JSON-LD on `/ua/uzhhorod/`
- [x] 2.3 Add SoftwareApplication/MobileApplication JSON-LD on Image Resizer and Legal product pages and verify schema type/name/url after hydration
- [x] 2.4 Confirm service pages still emit Service JSON-LD after SEO effect runs (spot-check voice-agents)

## 3. Static document heads for products and events

- [x] 3.1 Implement build-time head injection (or equivalent) so product and events `dist/**/index.html` copies are not verbatim homepage shells and verify `rg`/`curl` on built `dist/en/products/legal/index.html` shows Legal title + Legal canonical
- [x] 3.2 Apply the same for Image Resizer, Image Resizer privacy, events index, and event detail paths (EN+UA) and verify each built file’s `<title>` and canonical path segment
- [x] 3.3 Ensure existing service/Uzhhorod/en prerender heads still build correctly and verify a service dist head remains page-specific

## 4. Tests and verification

- [x] 4.1 Extend Playwright SEO coverage for static-vs-hydrated canonical/title on at least one product and one events URL and verify the new tests pass locally
- [x] 4.2 Add/adjust tests for homepage schema presence and service `x-default` English target and verify they pass
- [x] 4.3 After deploy, curl production product/events URLs without JS assumptions (raw HTML) and verify titles/canonicals; note GSC URL Inspection / Validate fix as a manual follow-up checklist item in the PR description

### Post-deploy verification (task 4.3) — done 2026-09-27

Raw HTML (`curl -sL`) on live mission101.ai confirmed page-specific `<title>`, canonical, and EN `x-default` for:

- `/en|ua/products/legal/`
- `/en|ua/products/image-resizer/` (+ privacy-policy)
- `/en|ua/events/` (+ `uzhhorod-2026-03-18`)
- `/en/` → canonical + x-default `https://mission101.ai/`
- `/en/services/voice-agents/` and `/en/uzhhorod/` remain page-specific with EN x-default

### Manual GSC follow-up (outside repo)

1. URL Inspection → Validate fix for duplicate-canonical on `/en/`
2. Request indexing for product/events URLs that were Discovered / not indexed
3. Re-submit `https://mission101.ai/sitemap.xml` if needed
