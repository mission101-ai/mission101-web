## Purpose

Covers host consistency for www vs apex, clearer static 404 shim titling, and a primary main landmark on marketing pages for accessibility and crawler structure.

## ADDED Requirements

### Requirement: www resolves to the canonical apex host
`www.mission101.ai` MUST resolve over HTTPS and end on the canonical apex host `https://mission101.ai/` (via DNS configuration plus redirect), so typed www URLs do not fail DNS lookup.

#### Scenario: www request reaches apex
- **WHEN** a client requests `https://www.mission101.ai/`
- **THEN** the browsing session ends on `https://mission101.ai/` with a successful document response

### Requirement: Marketing pages expose a main landmark
Primary marketing page templates (home, Uzhhorod, service, events, and product pages) MUST wrap primary page content in a single `<main>` landmark (or equivalent ARIA `role="main"` if a native main element is impossible).

#### Scenario: Home page has one main
- **WHEN** a visitor views the homepage after render
- **THEN** exactly one `main` landmark is present containing the primary page content

### Requirement: Interactive controls have matching accessible names
Visible text labels on primary header/footer controls MUST match their accessible names closely enough to satisfy accessibility name/label expectations (no conflicting aria-label that contradicts visible text).

#### Scenario: Labeled control name agrees with visible text
- **WHEN** an interactive control shows visible text such as a store or navigation label
- **THEN** its accessible name includes that visible text (or an intentional clearer equivalent that does not contradict it)
