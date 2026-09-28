## ADDED Requirements

### Requirement: Service pages expose FAQPage JSON-LD for their on-page FAQ content
Each service page that renders an FAQ/objections section with 2 or more question/answer pairs MUST also expose `FAQPage` JSON-LD describing those same question/answer pairs, both after client-side hydration and in the page's static HTML response, coexisting with that page's existing `Service` and `BreadcrumbList` schema (e.g. via `@graph`).

#### Scenario: Voice agents FAQ is machine-readable
- **WHEN** a crawler reads structured data on `/en/services/voice-agents/` (static HTML response, before any script executes)
- **THEN** the response includes `FAQPage` JSON-LD whose `mainEntity` array contains a `Question`/`acceptedAnswer` pair for each FAQ item rendered on the page in English

#### Scenario: Ukrainian service FAQ schema matches rendered content
- **WHEN** a visitor views `/ua/services/marketing-automation/` after hydration
- **THEN** the `FAQPage` JSON-LD present matches the Ukrainian FAQ question/answer text rendered on the page, not the English text

#### Scenario: Service page without FAQ content emits no FAQPage schema
- **WHEN** a service page's current locale has fewer than 2 FAQ entries
- **THEN** no `FAQPage` JSON-LD is emitted for that page in that locale

### Requirement: Uzhhorod local page exposes FAQPage JSON-LD for its FAQ section
The Uzhhorod local page MUST expose `FAQPage` JSON-LD describing its rendered FAQ question/answer pairs, both after client-side hydration and in the page's static HTML response, coexisting with its existing `LocalBusiness` schema.

#### Scenario: Uzhhorod FAQ is machine-readable in both languages
- **WHEN** a crawler reads structured data on `/en/uzhhorod/` or `/ua/uzhhorod/` (static HTML response)
- **THEN** the response includes `FAQPage` JSON-LD whose `mainEntity` array contains a `Question`/`acceptedAnswer` pair for each FAQ item rendered on that page in that language
