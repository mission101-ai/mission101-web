## Purpose

Ensures that indexable marketing routes deliver their actual page content — not just document-head metadata — in the raw, pre-JavaScript HTML response, so clients that do not execute JavaScript (including major AI-answer-engine crawlers) can read and cite the real content of the page rather than only its title and description.

## ADDED Requirements

### Requirement: Indexable routes ship page-specific main content without JavaScript execution
For every language-prefixed indexable marketing URL covered by the existing static-head prerendering (language homes, Uzhhorod, all service pages, Image Resizer, Image Resizer privacy, Legal, events index, and known event detail pages), the raw HTML response MUST contain that page's rendered main content — including body copy, feature/section text, and any FAQ question/answer text present on the page — without requiring JavaScript execution to become visible.

#### Scenario: Voice agents page content is present without JS
- **WHEN** a client requests `https://mission101.ai/en/services/voice-agents/` and does not execute JavaScript
- **THEN** the response body includes the page's description, feature bullets, and FAQ question/answer text, not only `<div id="root"></div>`

#### Scenario: Uzhhorod local page content is present without JS
- **WHEN** a client requests `https://mission101.ai/en/uzhhorod/` and does not execute JavaScript
- **THEN** the response body includes the local offer summary, contact/consultation path, and FAQ content described in the existing local-content requirements

#### Scenario: Product page content is present without JS
- **WHEN** a client requests `https://mission101.ai/en/products/legal/` and does not execute JavaScript
- **THEN** the response body includes that product's descriptive content, not only the document head

### Requirement: Prerendered content matches hydrated content
For each covered route, the main content present in the raw HTML response MUST be substantively the same content (same headings, same body copy, same FAQ entries) that is present after the client application finishes hydrating — the static snapshot MUST NOT drift out of sync with what a JavaScript-enabled visitor sees.

#### Scenario: Static and hydrated body content agree
- **WHEN** the rendered static HTML for `/en/services/ai-assistants/` is compared to the DOM after client hydration completes
- **THEN** the main content sections and text are equivalent (allowing for interactive-only elements that have no static equivalent, such as animation state)

### Requirement: Hydration does not discard or visibly replace prerendered content
When the client application loads on a covered route, it MUST attach to the existing prerendered markup rather than clearing it and re-rendering from an empty state, so there is no content flash or temporary blank state for visitors or crawlers that partially execute JavaScript.

#### Scenario: No flash of empty content on hydration
- **WHEN** a visitor loads `/en/uzhhorod/` in a browser
- **THEN** the prerendered main content is visible immediately and is not replaced by a blank state before the hydrated content appears

### Requirement: Prerendered output is produced by the build pipeline, not hand-maintained per route
The static body content for covered routes MUST be generated as part of the existing `npm run build` pipeline (the same pipeline that already generates static document heads), so that content changes in source (i18n locale files, components) are reflected in the static output without a separate manual step.

#### Scenario: Build output reflects a content change
- **WHEN** an FAQ answer's text is changed in `src/i18n/locales/en.json` and `npm run build` is run
- **THEN** the corresponding static HTML file for the affected route reflects the updated FAQ text without any manual edit to that HTML file
