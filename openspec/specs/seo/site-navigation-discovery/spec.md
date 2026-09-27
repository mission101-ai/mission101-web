# site-navigation-discovery Specification

## Purpose

Makes product and local landing pages discoverable through primary site chrome so crawlers and visitors can reach them without depending only on the XML sitemap.

## Requirements

### Requirement: Footer links to products
The shared site footer MUST expose crawlable internal links to the Mission101 Image Resizer product page and the Mission101 Legal product page for the current language prefix (`/en/...` or `/ua/...`).

#### Scenario: English footer lists both products
- **WHEN** a visitor views any page that includes the shared footer in English
- **THEN** the footer contains links to `/en/products/image-resizer/` and `/en/products/legal/` (slash form acceptable)

#### Scenario: Ukrainian footer lists both products
- **WHEN** a visitor views any page that includes the shared footer in Ukrainian
- **THEN** the footer contains links to `/ua/products/image-resizer/` and `/ua/products/legal/`

### Requirement: Home or footer links to Uzhhorod
The English and Ukrainian experiences MUST each expose at least one crawlable internal link to the corresponding Uzhhorod page from the homepage and/or shared footer.

#### Scenario: Visitor can reach Uzhhorod from chrome
- **WHEN** a visitor is on `/en/` or `/ua/` (or a page with the shared footer in that language)
- **THEN** a link to `/en/uzhhorod/` or `/ua/uzhhorod/` respectively is available without typing the URL

### Requirement: Product pages are not orphans
After this change, Image Resizer and Legal product URLs MUST have inbound internal links from shared chrome; they MUST NOT rely solely on sitemap discovery for internal PageRank flow.

#### Scenario: Product URL appears in sitewide chrome HTML
- **WHEN** a crawler fetches the homepage HTML after render
- **THEN** anchor hrefs include both product paths for that language
