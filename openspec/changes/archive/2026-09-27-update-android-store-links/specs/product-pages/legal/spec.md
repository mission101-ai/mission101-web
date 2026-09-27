## ADDED Requirements

### Requirement: Public Google Play store CTA
The Legal product page MUST expose a Google Play call to action whose destination is the public Play Store listing `https://play.google.com/store/apps/details?id=ai.mission101.legal` in every supported language. Store availability copy MUST describe Android as available on Google Play.

#### Scenario: Play Store link opens the public Legal listing
- **WHEN** a visitor activates the Google Play call to action on `/en/products/legal` or `/ua/products/legal`
- **THEN** the link target is `https://play.google.com/store/apps/details?id=ai.mission101.legal`

#### Scenario: Store note reflects public Android availability
- **WHEN** a visitor views the Legal product page store section in either language
- **THEN** the store note describes Android as available on Google Play without referring to Play testing
