## Purpose

Lets any page opt into excluding itself from search indexing via the shared SEO component, without editing that component each time a new page needs it.

## ADDED Requirements

### Requirement: Pages can opt into noindex via the shared SEO component
The shared `SEO` component MUST support an optional flag that, when set for a given page render, causes the document to expose a `robots` meta tag with value `noindex, follow`. When the flag is not set, no such tag SHALL be added, and any indexable page MUST NOT carry a `noindex` directive.

#### Scenario: Page explicitly opts into noindex
- **WHEN** a page renders the shared SEO component with the noindex option enabled
- **THEN** the document head contains `<meta name="robots" content="noindex, follow">`

#### Scenario: Default pages remain indexable
- **WHEN** a page renders the shared SEO component without enabling the noindex option
- **THEN** the document head contains no `robots` meta tag with a `noindex` directive

### Requirement: Enabling noindex on one page does not affect others
Setting the noindex option for one page's SEO render MUST NOT cause a `noindex` directive to appear on a different page during the same session (e.g., after client-side navigation).

#### Scenario: Navigating away from a noindexed page restores indexability
- **WHEN** a visitor navigates from a page rendered with noindex enabled to a page rendered without it
- **THEN** the document head for the new page contains no `noindex` robots meta tag
