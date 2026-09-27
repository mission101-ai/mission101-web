# open-graph-assets Specification

## Purpose

Ensures social and messaging previews for mission101.ai use a correctly sized Open Graph image whose meta dimensions match the actual file.

## Requirements

### Requirement: Share image is 1200×630
The primary Open Graph / Twitter share image referenced by marketing pages MUST be exactly 1200 pixels wide by 630 pixels tall.

#### Scenario: OG image intrinsic size matches landscape share ratio
- **WHEN** the configured share image file is inspected
- **THEN** its pixel dimensions are 1200×630

### Requirement: Meta width and height match the file
`og:image:width` and `og:image:height` meta tags on the homepage (and other pages using the default share image) MUST equal the share image's actual width and height.

#### Scenario: Homepage OG dimension metas are accurate
- **WHEN** a client reads Open Graph tags on the homepage
- **THEN** `og:image:width` is `1200` and `og:image:height` is `630`

### Requirement: Reasonable file weight
The primary share image SHOULD be compressed for web delivery (prefer under ~300KB) while remaining visually clear at share-card sizes.

#### Scenario: Share image is not an oversized square PNG
- **WHEN** the primary share image is deployed
- **THEN** it is a landscape 1200×630 asset rather than a 1024×1024 square stand-in
