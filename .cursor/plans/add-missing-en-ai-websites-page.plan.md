---
name: ""
overview: ""
todos: []
isProject: false
---

# Add Missing EN AI-Websites Static Page

Create the missing `public/en/services/ai-websites/index.html` file to fix the asymmetry between EN and UA service pages. The build currently falls back to the generic index.html for this route, so crawlers and direct static access get incorrect meta tags.

## Context

- **EN** has 5 custom service HTML files; **ai-websites** is missing
- **UA** has all 6, including ai-websites
- The sitemap and app routes expect both `/en/services/ai-websites` and `/ua/services/ai-websites`
- Build logic in [vite.config.ts](vite.config.ts) (lines 167–181): uses custom HTML if present, otherwise copies generic index.html

## Implementation

### Create `public/en/services/ai-websites/index.html`

Copy the structure from [public/en/services/voice-agents/index.html](public/en/services/voice-agents/index.html) and replace all ai-websites-specific content. Use values from [src/i18n/locales/en.json](src/i18n/locales/en.json) `servicePages.ai-websites.seo`:


| Field           | Value                                                                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **title**       | AI-Generated Business Websites • Mission101.ai                                                                                                             |
| **description** | Modern websites built with AI technology. Personalized content, built-in assistants, mobile-responsive design, and seamless integration with your systems. |


**URLs to use** (all `ai-websites`):

- canonical: `https://mission101.ai/en/services/ai-websites`
- og:url: `https://mission101.ai/en/services/ai-websites`
- hreflang en: `https://mission101.ai/en/services/ai-websites`
- hreflang uk: `https://mission101.ai/ua/services/ai-websites`

**Keywords** (suggested): `AI websites, AI-generated websites, business websites, personalized content, mobile-responsive, web design`

**JSON-LD** `name` and `description`: same as meta description.

### File structure

- `html lang="en"`
- Same head structure as other EN service pages (favicon, viewport, SEO meta, canonical, hreflang, OG, Twitter, gtag, fonts, JSON-LD, SPA script)
- Same body: `<div id="root"></div>` + main.tsx script

## Verification

After creating the file:

1. Run `npm run build` — build should pick up the new file
2. Confirm `/en/services/ai-websites` serves the correct title and description in the static HTML
3. EN and UA service pages are now symmetric (6 each)

