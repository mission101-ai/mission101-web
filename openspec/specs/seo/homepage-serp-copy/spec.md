# homepage-serp-copy Specification

## Purpose

Improves homepage title and meta description so brand and local searchers get a clearer reason to click from Google results, addressing weak CTR despite hundreds of homepage impressions.

## Requirements

### Requirement: Homepage title communicates brand and value
The preferred English homepage and the Ukrainian homepage MUST each use a unique title that includes the Mission101.ai brand and a concise value proposition (automation/AI for business). Titles SHOULD fit typical SERP display length (about 50–60 characters visible) without keyword stuffing.

#### Scenario: English homepage title includes brand and offer
- **WHEN** a crawler or browser reads the English homepage document title
- **THEN** the title contains `Mission101` (or `Mission101.ai`) and a short automation/AI value phrase

#### Scenario: Ukrainian homepage title is localized
- **WHEN** a crawler or browser reads the Ukrainian homepage document title
- **THEN** the title is in Ukrainian (aside from the brand name) and reflects the same value proposition intent

### Requirement: Homepage meta description encourages the click
Each homepage language MUST have a unique meta description that states who the site helps, what outcome it offers, and a soft call to action. Descriptions SHOULD target roughly 150–160 characters of visible SERP text.

#### Scenario: English meta description is unique and actionable
- **WHEN** the English homepage meta description is read
- **THEN** it mentions intelligent automation / AI for business and invites a next step (consult, learn more, or contact)—and is not identical to a service-page description
