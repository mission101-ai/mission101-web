## 1. Canonical and hreflang policy

- [ ] 1.1 Update runtime SEO so `/en/` (and `/en`) advertise canonical + `og:url` as `https://mission101.ai/`, and verify in the browser after load that `link[rel=canonical]` equals the apex URL
- [ ] 1.2 Change `SEO.tsx` service and Uzhhorod `x-default` targets to English URLs (trailing slash) and verify on `/en/services/voice-agents/` and `/en/uzhhorod/` that HTML `x-default` matches `sitemap.xml`
- [ ] 1.3 Align product/events/home hreflang clusters (self + reciprocal `en`/`uk` + `x-default`) and verify with Playwright or DevTools that codes are `en`/`uk` (not `ua`)
- [ ] 1.4 Update `public/sitemap.xml` home cluster so preferred English home is consistent (omit or non-index duplicate `/en/` loc as decided in design) and verify sitemap still well-formed (`xmllint` or parse) with matching `x-default` values

## 2. Structured data

- [ ] 2.1 Stop deleting homepage JSON-LD on hydration; keep/replace Organization + WebSite and verify `/en/` or `/` still has `application/ld+json` after load
- [ ] 2.2 Set LocalBusiness `telephone` to E.164 `+380974825097` (confirm with operator if needed) in runtime + prerender Uzhhorod HTML and verify the value appears in JSON-LD on `/ua/uzhhorod/`
- [ ] 2.3 Add SoftwareApplication/MobileApplication JSON-LD on Image Resizer and Legal product pages and verify schema type/name/url after hydration
- [ ] 2.4 Confirm service pages still emit Service JSON-LD after SEO effect runs (spot-check voice-agents)

## 3. Static document heads for products and events

- [ ] 3.1 Implement build-time head injection (or equivalent) so product and events `dist/**/index.html` copies are not verbatim homepage shells and verify `rg`/`curl` on built `dist/en/products/legal/index.html` shows Legal title + Legal canonical
- [ ] 3.2 Apply the same for Image Resizer, Image Resizer privacy, events index, and event detail paths (EN+UA) and verify each built file’s `<title>` and canonical path segment
- [ ] 3.3 Ensure existing service/Uzhhorod/en prerender heads still build correctly and verify a service dist head remains page-specific

## 4. Tests and verification

- [ ] 4.1 Extend Playwright SEO coverage for static-vs-hydrated canonical/title on at least one product and one events URL and verify the new tests pass locally
- [ ] 4.2 Add/adjust tests for homepage schema presence and service `x-default` English target and verify they pass
- [ ] 4.3 After deploy, curl production product/events URLs without JS assumptions (raw HTML) and verify titles/canonicals; note GSC URL Inspection / Validate fix as a manual follow-up checklist item in the PR description
