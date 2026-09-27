## MODIFIED Requirements

### Requirement: Unknown routes render the Not Found page
When a visitor opens a path that does not match a defined application route, the site MUST render the Not Found page with a clear unavailable-page message and a control that returns to the homepage. The static GitHub Pages `404.html` shim document that is returned with HTTP 404 for unknown paths MUST use a document `<title>` that indicates the page was not found or is redirecting to the application Not Found experience—not a generic misleading title that implies a successful navigation target.

#### Scenario: Unknown path shows Not Found content
- **WHEN** a visitor opens a non-existent path such as `/en/this-page-does-not-exist`
- **THEN** the Not Found page is shown with a 404 heading or equivalent unavailable-page message and a return-home control

#### Scenario: Static 404 shim title is accurate
- **WHEN** a non-JavaScript client receives the HTTP 404 HTML shim for an unknown path
- **THEN** the response document title communicates not-found or redirect-to-app-not-found intent (for example includes `404` or `Not Found`) rather than only a bare success-oriented label
