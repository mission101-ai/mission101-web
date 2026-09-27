## ADDED Requirements

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
