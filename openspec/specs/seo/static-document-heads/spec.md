# static-document-heads Specification

## Purpose

Ensures every indexable marketing URL returns a first-byte HTML document head that already describes that URL, so crawlers and social bots do not inherit the homepage title, description, or canonical before JavaScript runs.

## Requirements

### Requirement: Product and events routes ship page-specific static heads
For each language-prefixed product and events URL that is listed in the public sitemap (including Image Resizer, Image Resizer privacy, Legal, events index, and known event detail pages), the static HTML response MUST include a `<title>`, meta description, `link[rel=canonical]`, Open Graph `og:url`/`og:title`/`og:description`, and hreflang alternate links that describe that page—not the site homepage.

#### Scenario: Legal product static HTML is self-describing
- **WHEN** a non-JavaScript client requests `https://mission101.ai/en/products/legal/`
- **THEN** the HTML includes a Legal-specific title and description and a canonical URL for the Legal product path (not `https://mission101.ai/`)

#### Scenario: Events index static HTML is self-describing
- **WHEN** a non-JavaScript client requests `https://mission101.ai/en/events/`
- **THEN** the HTML includes an events-specific title/description and a canonical URL under `/en/events/`

### Requirement: Static and hydrated heads agree
After client hydration on an indexable page, the document title, meta description, and canonical href MUST match the values present in the static HTML head for that URL (aside from intentional trailing-slash normalization already enforced by hosting).

#### Scenario: Hydration does not rewrite product canonical to homepage
- **WHEN** a visitor loads `/en/products/image-resizer/` and the client application finishes hydrating
- **THEN** `link[rel=canonical]` still points at the Image Resizer product URL

### Requirement: Existing correctly prerendered routes remain correct
Language home, Uzhhorod, and service routes that already emit page-specific static heads MUST continue to emit page-specific heads after this change.

#### Scenario: Service page head remains page-specific
- **WHEN** a non-JavaScript client requests `/en/services/voice-agents/`
- **THEN** the static title and canonical refer to the voice-agents service page
