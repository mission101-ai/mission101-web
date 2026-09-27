# not-found Specification

## Purpose

Defines the public unknown-route (404) experience on mission101.ai so visitors see a clear, correctly aligned page and can return to the site homepage.

## Requirements

### Requirement: Unknown routes render the Not Found page
When a visitor opens a path that does not match a defined application route, the site MUST render the Not Found page with a clear unavailable-page message and a control that returns to the homepage.

#### Scenario: Unknown path shows Not Found content
- **WHEN** a visitor opens a non-existent path such as `/en/this-page-does-not-exist`
- **THEN** the Not Found page is shown with a 404 heading or equivalent unavailable-page message and a return-home control

### Requirement: Not Found layout is centered and aligned
The Not Found page content MUST be horizontally and vertically centered within the viewport, use a constrained readable content column, and keep heading, message, and return-home control aligned on a shared center axis on both desktop and mobile viewports.

#### Scenario: Desktop content is centered on one axis
- **WHEN** a visitor views the Not Found page at a desktop viewport width
- **THEN** the 404 heading, message, and return-home control share a centered horizontal alignment and sit centered in the available viewport height

#### Scenario: Mobile content remains aligned
- **WHEN** a visitor views the Not Found page at a mobile viewport width
- **THEN** the same content stack remains centered, readable, and free of horizontal overflow or uneven left/right offset relative to the viewport

### Requirement: Not Found presentation matches marketing-site chrome
The Not Found page MUST use the site’s shared navigation and footer patterns (or an equivalently coherent full-page marketing shell) so the page does not appear as an orphaned, theme-mismatched fragment relative to other content pages.

#### Scenario: Visitor can navigate away using site chrome
- **WHEN** a visitor views the Not Found page
- **THEN** shared site navigation and footer (or equivalent shell controls) are present along with the return-home control, and the page theme is visually consistent with other light marketing content pages
