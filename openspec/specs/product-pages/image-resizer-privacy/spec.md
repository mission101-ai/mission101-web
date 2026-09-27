# product-pages/image-resizer-privacy Specification

## Purpose

Publishes the Mission101 Image Resizer privacy policy page that store listings and App Privacy / Data safety forms must reference.

## Requirements

### Requirement: Language-prefixed privacy policy routes
The site MUST serve the Image Resizer privacy policy at both:
- `/en/products/image-resizer/privacy-policy`
- `/ua/products/image-resizer/privacy-policy`

Trailing-slash variants of those paths MUST also resolve to the same page. The English URL `https://mission101.ai/en/products/image-resizer/privacy-policy` MUST be the store-facing privacy policy URL used in App Store Connect and Google Play forms.

#### Scenario: English privacy page is reachable
- **WHEN** a visitor or store reviewer opens `/en/products/image-resizer/privacy-policy` or `/en/products/image-resizer/privacy-policy/`
- **THEN** the Image Resizer privacy policy page renders successfully (HTTP 200 on production static hosting)

#### Scenario: Ukrainian privacy page is reachable
- **WHEN** a visitor opens `/ua/products/image-resizer/privacy-policy` or `/ua/products/image-resizer/privacy-policy/`
- **THEN** the Image Resizer privacy policy page renders successfully in Ukrainian

### Requirement: On-device-only privacy posture
The privacy policy page MUST state that Mission101 Image Resizer processes photos on the device for resize and save flows, that the developer does not collect user photos or other personal data off device via analytics, advertising, crash-reporting, or a developer backend, and that Camera and Photo Library access are used on device for core functionality. The page MUST identify the operator as Mission 101 and include the support contact `support@mission101.ai`.

#### Scenario: Policy matches store disclosure posture
- **WHEN** a reviewer reads the privacy policy page
- **THEN** the page clearly describes on-device processing, no off-device collection by the developer, Camera and Photo Library use for core features, Mission 101 as operator, and `support@mission101.ai` as the contact

### Requirement: Privacy page is distinct from other Mission101 policies
The Image Resizer privacy policy MUST be a dedicated product page and MUST NOT reuse or replace the existing Meta/LinkedIn website privacy text as its source of truth.

#### Scenario: Dedicated product policy
- **WHEN** a visitor opens the Image Resizer privacy policy route
- **THEN** the content describes the Image Resizer mobile app and does not present Meta App / LinkedIn App policy as the Image Resizer policy

### Requirement: Privacy page SEO and language alternates
The privacy page MUST set page-specific title and description, a canonical URL for the current language path, and hreflang alternates for `en`, `uk`, and `x-default` pointing at the English and Ukrainian privacy URLs. The English privacy URL MUST be `x-default` for this policy.

#### Scenario: Hreflang points at both privacy locales
- **WHEN** the privacy policy page is rendered
- **THEN** alternate links include the English and Ukrainian privacy URLs and `x-default` points at the English privacy URL
