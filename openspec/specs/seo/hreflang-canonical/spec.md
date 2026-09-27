# hreflang-canonical Specification

## Purpose

Keeps canonical URLs and hreflang clusters consistent across runtime tags, static HTML, and the XML sitemap so Google does not drop locale pairs or override user-declared English-home canonicals.

## Requirements

### Requirement: Single preferred English homepage URL
The site MUST declare exactly one preferred English homepage URL for indexing. The non-preferred English home path (between `https://mission101.ai/` and `https://mission101.ai/en/`) MUST either HTTP-redirect to the preferred URL or set `rel=canonical` to the preferred URL. Sitemap and hreflang `en` / `x-default` entries for the home cluster MUST agree with that preferred URL.

#### Scenario: Non-preferred English home does not self-canonical against Google’s choice
- **WHEN** a crawler requests the non-preferred English home path
- **THEN** the response either redirects to the preferred English homepage or advertises a canonical equal to the preferred English homepage

### Requirement: x-default is identical across HTML and sitemap
For every URL cluster that publishes hreflang (home, Uzhhorod, each service, each product, events), the `x-default` href in static HTML, post-hydration SEO tags, and `sitemap.xml` MUST be the same absolute URL.

#### Scenario: Service x-default matches sitemap
- **WHEN** comparing hreflang for `/en/services/ai-assistants/` in the live HTML head and in `sitemap.xml`
- **THEN** both declare the same `x-default` target URL

### Requirement: Reciprocal en/uk alternates with self-reference
Each hreflang cluster MUST include self-referencing `en` and `uk` entries and reciprocal links between the English and Ukrainian URLs for that page type. Language codes MUST use `en` and `uk` (not `ua` as an hreflang code).

#### Scenario: Product hreflang is reciprocal
- **WHEN** the Legal product page is rendered in English or Ukrainian
- **THEN** alternate links include both language product URLs plus `x-default`, and the English product URL is the product cluster’s `x-default`

### Requirement: Trailing-slash canonicals match hosting
Canonical URLs for directory-style marketing pages MUST use the trailing-slash form that returns HTTP 200 on GitHub Pages (for example `/en/products/legal/`), matching sitemap `<loc>` values.

#### Scenario: Canonical uses slash form
- **WHEN** a visitor opens `/en/products/legal` and is redirected to the slash URL
- **THEN** the canonical href ends with `/en/products/legal/`
