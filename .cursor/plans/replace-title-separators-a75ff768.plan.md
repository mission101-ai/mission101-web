---
name: ""
overview: ""
todos: []
isProject: false
---

# Replace Page Title Separators: | to •

Replace all `|` with `•` in page titles across the codebase. Localize the NotFound page (currently hardcoded in English). The Uzhhorod page already uses `•` in its titles, so this change will make all titles consistent.

## Files to Update

### 1. i18n locale files (source of truth for SPA pages)

**[src/i18n/locales/en.json](src/i18n/locales/en.json)**

- `seo.title`: `Mission101.ai | Intelligent Automation for Modern Business` → `Mission101.ai • Intelligent Automation for Modern Business`
- 6 service titles under `seo.services.*.title` (voice-agents, ai-assistants, custom-ai-solutions, marketing-automation, ai-websites, business-analytics)
- **Add** `notFound` section (new):

```json
  "notFound": {
    "title": "404 - Page Not Found • Mission101.ai",
    "description": "The page you are looking for does not exist. Return to Mission101.ai homepage.",
    "heading": "Oops! Page not found",
    "returnButton": "Return to Home"
  }
  

```

**[src/i18n/locales/ua.json](src/i18n/locales/ua.json)**

- `seo.title`: `Mission101.ai | Розумна Автоматизація для Сучасного Бізнесу` → `Mission101.ai • Розумна Автоматизація для Сучасного Бізнесу`
- 6 service titles under `seo.services.*.title`
- **Add** `notFound` section (new):

```json
  "notFound": {
    "title": "404 - Сторінку не знайдено • Mission101.ai",
    "description": "Сторінку, яку ви шукаєте, не знайдено. Поверніться на головну сторінку Mission101.ai.",
    "heading": "Упс! Сторінку не знайдено",
    "returnButton": "На головну"
  }
  

```

### 2. Static HTML files


| File                                         | Occurrences                             |
| -------------------------------------------- | --------------------------------------- |
| [index.html](index.html)                     | title, og:title, twitter:title          |
| [public/en/index.html](public/en/index.html) | title, og:title, twitter:title          |
| [public/ua/index.html](public/ua/index.html) | title, og:title, twitter:title          |
| 6 pages in `public/en/services/*/index.html` | 3 each (title, og:title, twitter:title) |
| 6 pages in `public/ua/services/*/index.html` | 3 each                                  |


### 3. NotFound page — localize and use • separator

**[src/pages/NotFound.tsx](src/pages/NotFound.tsx)**

Currently hardcoded in English. Update to:

- Import `useTranslation` from `react-i18next`
- Replace hardcoded `title` and `description` with `t('notFound.title')` and `t('notFound.description')`
- Replace hardcoded UI text with `t('notFound.heading')` and `t('notFound.returnButton')`

The title will become `404 - Page Not Found • Mission101.ai` (EN) / `404 - Сторінку не знайдено • Mission101.ai` (UA) via i18n.

### 4. Documentation (optional)

**[instructions/SEO-SETUP.md](instructions/SEO-SETUP.md)** — line 184:

- Example: `title="Custom Page Title | mission101.ai"` → `title="Custom Page Title • mission101.ai"`

## Implementation approach

- Use search-and-replace:  `| Mission101.ai` →  `• Mission101.ai` and `Mission101.ai |`  → `Mission101.ai •`  for locale files and static HTML
- Add `notFound` keys to both locale files (after `seo` or at top level)
- Refactor `NotFound.tsx` to use `useTranslation()` and the new keys
- The SEO component reads titles from i18n and does not hardcode any separator — no changes needed

## Out of scope

- `.cursor/plans/*.plan.md` — historical plan docs, not runtime
- TypeScript union types (e.g. `'en' | 'ua'`) — not page titles

