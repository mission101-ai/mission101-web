## ADDED Requirements

### Requirement: Public Google Play store CTA
The Image Resizer product page MUST expose a Google Play call to action whose destination is the public Play Store listing `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer` in every supported language. Store availability copy MUST reflect that Android is available on Google Play.

#### Scenario: Play Store link opens the public Image Resizer listing
- **WHEN** a visitor activates the Google Play call to action on `/en/products/image-resizer` or `/ua/products/image-resizer`
- **THEN** the link target is `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer`

#### Scenario: Store note reflects live Android availability
- **WHEN** a visitor views the Image Resizer product page store section in either language
- **THEN** the store note indicates Android is available on Google Play
