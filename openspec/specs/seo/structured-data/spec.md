# structured-data Specification

## Purpose

Defines which JSON-LD graphs must remain present on key page types so search engines can understand the organization, local presence, services, and products without losing markup after client hydration.

## Requirements

### Requirement: Homepage keeps organization-level JSON-LD after hydration
The site homepage (preferred English home URL and the Ukrainian home URL) MUST expose Organization and WebSite JSON-LD in the rendered document after client-side SEO updates run. Hydration MUST NOT delete homepage structured data unless it replaces it with an equivalent or richer valid graph for the same page.

#### Scenario: English home retains JSON-LD after load
- **WHEN** a visitor opens the preferred English homepage and scripts finish updating SEO tags
- **THEN** at least one `application/ld+json` script remains describing Mission101.ai as an Organization (and a WebSite entry is present)

### Requirement: LocalBusiness telephone is a real contact number
Uzhhorod LocalBusiness JSON-LD MUST use a complete E.164 telephone value for the public business contact (not a country-code-only placeholder such as `+380`).

#### Scenario: Uzhhorod schema phone is dialable
- **WHEN** a crawler reads LocalBusiness JSON-LD on `/en/uzhhorod/` or `/ua/uzhhorod/`
- **THEN** the `telephone` property is a full international number including national significant digits

### Requirement: Product pages expose SoftwareApplication or MobileApplication schema
Image Resizer and Legal product pages MUST include JSON-LD of type `SoftwareApplication` or `MobileApplication` (as appropriate) with name, description, and URL matching the product page, after hydration.

#### Scenario: Legal product page has application schema
- **WHEN** a visitor views `/en/products/legal/` after hydration
- **THEN** JSON-LD includes an application-type entity named Mission101 Legal with a URL equal to the page canonical

### Requirement: Service pages keep Service schema
Service pages that already advertise Service JSON-LD MUST continue to expose Service schema after SEO updates, with provider Mission101.ai and the page canonical as `url`.

#### Scenario: Voice agents service schema remains
- **WHEN** a visitor views `/en/services/voice-agents/` after hydration
- **THEN** JSON-LD includes a Service entity whose `url` matches the page canonical
