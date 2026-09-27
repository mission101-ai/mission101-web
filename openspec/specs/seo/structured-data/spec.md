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

### Requirement: Service, event, and product pages expose BreadcrumbList schema
Service pages, event pages (index and detail), and product pages MUST include `BreadcrumbList` JSON-LD reflecting the page's position in the site hierarchy (at minimum: Home > section > page), with each list item's `item` URL matching the canonical URL of that step where a corresponding page exists, after hydration.

#### Scenario: Service page breadcrumb reflects hierarchy
- **WHEN** a visitor views `/en/services/voice-agents/` after hydration
- **THEN** JSON-LD includes a `BreadcrumbList` whose items resolve, in order, to the homepage, the services section, and the voice-agents service page

#### Scenario: Event detail page breadcrumb reflects hierarchy
- **WHEN** a visitor views an event detail page after hydration
- **THEN** JSON-LD includes a `BreadcrumbList` whose items resolve, in order, to the homepage, the events index, and the event detail page

#### Scenario: Product page breadcrumb reflects hierarchy
- **WHEN** a visitor views `/en/products/legal/` after hydration
- **THEN** JSON-LD includes a `BreadcrumbList` whose items resolve, in order, to the homepage and the Legal product page

### Requirement: Breadcrumb schema uses the page's own language prefix
Breadcrumb item URLs MUST use the same language prefix (`/en/` or `/ua/`) as the page they describe, matching that page's canonical URL language.

#### Scenario: Ukrainian service page breadcrumb stays in Ukrainian path
- **WHEN** a visitor views `/ua/services/voice-agents/` after hydration
- **THEN** every `BreadcrumbList` item URL uses the `/ua/` prefix
