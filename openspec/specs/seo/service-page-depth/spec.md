# service-page-depth Specification

## Purpose

Raises content quality on priority service pages that Google has crawled but declined to index, so each URL offers unique, intent-matching information beyond a short hero and generic CTA.

## Requirements

### Requirement: Priority crawled-not-indexed services gain depth
The following service pages MUST ship expanded unique body content in both EN and UA (where the route exists): voice agents, AI assistants, digital transformation strategy, and marketing automation. Each expanded page MUST include problem/solution context, who it is for, concrete capability bullets or sections, and an FAQ or objections section.

#### Scenario: Voice agents page includes audience and FAQ
- **WHEN** a visitor views `/en/services/voice-agents/`
- **THEN** the page includes who-it-is-for copy, capability detail beyond a single paragraph, and an FAQ or objections section

#### Scenario: Ukrainian marketing automation page is equally substantive
- **WHEN** a visitor views `/ua/services/marketing-automation/`
- **THEN** the page presents substantive Ukrainian body sections matching the English depth pattern for that service

### Requirement: Service pages remain differentiated
Expanded service pages MUST NOT reuse identical main-body paragraphs across different service slugs. Titles, H1s, and primary body explanations MUST stay service-specific.

#### Scenario: AI assistants body differs from voice agents
- **WHEN** comparing rendered main content of `/en/services/ai-assistants/` and `/en/services/voice-agents/`
- **THEN** the primary explanatory sections are distinct and specific to each service
