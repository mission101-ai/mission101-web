# Mission101 Web — Architecture Overview

This document describes the architecture of the Mission101 AI web platform, including project structure, routing, internationalization, build process, and key configuration files.

---

## Project Structure

Directory tree (from [README.md](../../README.md)):

```
mission101-web/
├── public/              # Static assets and prerendered HTML
│   ├── en/             # English language routes
│   │   ├── index.html      # English home page
│   │   ├── uzhhorod/       # English Uzhhorod page
│   │   │   └── index.html
│   │   └── services/       # English service pages
│   │       └── <slug>/index.html
│   ├── ua/             # Ukrainian language routes
│   │   ├── index.html      # Ukrainian home page
│   │   ├── uzhhorod/       # Ukrainian Uzhhorod page
│   │   │   └── index.html
│   │   └── services/       # Ukrainian service pages
│   │       └── <slug>/index.html
│   ├── sitemap.xml     # SEO sitemap with all pages
│   └── robots.txt      # Search engine directives
├── src/
│   ├── components/     # React components
│   │   ├── sections/   # Page sections (Hero, Services, Uzhhorod, etc.)
│   │   ├── ui/         # shadcn-ui components
│   │   ├── SEO.tsx     # Dynamic SEO meta tags component
│   │   ├── CursorGlow.tsx   # Cursor-follow glow effect
│   │   ├── ScrollTrigger.tsx # Scroll reveal animations
│   │   ├── WaveDivider.tsx  # SVG wave section divider
│   │   └── UzhhorodNav.tsx  # Shared navigation (main + Uzhhorod)
│   ├── context/        # React Context providers
│   ├── i18n/           # Internationalization config and locales
│   │   └── locales/    # en.json, ua.json translations
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── Index.tsx       # Main landing page
│   │   ├── Uzhhorod.tsx    # Uzhhorod landing page
│   │   ├── ServicePage.tsx # Service detail pages
│   │   └── NotFound.tsx    # 404 page
│   └── services/       # Service modules
├── e2e/                # Playwright E2E tests
├── instructions/       # Project documentation
└── dist/               # Production build output
```

---

## Routing

Routing is defined in [src/App.tsx](../../src/App.tsx) using React Router DOM. All routes are wrapped in `LanguageProvider` for i18n support.

### Language Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Index` | Home page (auto language detection) |
| `/en`, `/en/` | `Index` | English home page |
| `/ua`, `/ua/` | `Index` | Ukrainian home page |

### Service Pages

| Path | Component | Description |
|------|-----------|-------------|
| `/en/uzhhorod`, `/en/uzhhorod/` | `Uzhhorod` | English Uzhhorod landing page |
| `/ua/uzhhorod`, `/ua/uzhhorod/` | `Uzhhorod` | Ukrainian Uzhhorod landing page |
| `/en/services/:serviceSlug`, `/en/services/:serviceSlug/` | `ServicePage` | English service detail page |
| `/ua/services/:serviceSlug`, `/ua/services/:serviceSlug/` | `ServicePage` | Ukrainian service detail page |

Service slugs: `voice-agents`, `ai-assistants`, `custom-ai-solutions`, `marketing-automation`, `ai-websites`, `business-analytics`.

### Catch-All

- `*` → `NotFound` (404 page). All custom routes must be defined above this route.

---

## i18n Flow

### LanguageContext

[src/context/LanguageContext.tsx](../../src/context/LanguageContext.tsx) provides:

- **`currentLanguage`** — `'en'` or `'ua'`
- **`changeLanguage(lang)`** — switches language, updates i18next, localStorage, and navigates to the language-prefixed path
- **`isLoading`** — loading state during initialization

**Initialization order (on mount):**

1. **URL** — if path starts with `/en` or `/ua`, use that language
2. **localStorage** — key `preferred_language`
3. **Geolocation** — `shouldUseUkrainian()` from `@/services/geolocation` (IP-based detection)
4. **Fallback** — English

**Language switch:** `changeLanguage` preserves the current page path (e.g. `/en/uzhhorod` → `/ua/uzhhorod`).

### i18n Config and Locales

[src/i18n/config.ts](../../src/i18n/config.ts) configures i18next:

- **Resources:** `en.json`, `ua.json` from `src/i18n/locales/`
- **Fallback:** `en`
- **Supported:** `['en', 'ua']`
- **Detection:** `localStorage` → `path` → `navigator`
- **Plugins:** `LanguageDetector`, `initReactI18next`

`@/i18n/config` is imported in [src/App.tsx](../../src/App.tsx) before the app renders.

### Usage

Components use `useLanguage()` for the current language and `useTranslation()` for translated strings:

```tsx
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';
```

---

## Build Process

### Vite Plugin: `copy-index-to-lang-folders`

[vite.config.ts](../../vite.config.ts) defines a custom plugin that runs in `closeBundle()` after Vite builds:

1. **Read built output** — `dist/index.html` (contains production asset paths)
2. **Extract asset references** — regex for script (`/assets/*.js`) and style (`*.css`) tags
3. **Copy prerendered HTML** — from `public/en/`, `public/ua/`, etc. into `dist/`
4. **Inject assets** — replace dev script (`/src/main.tsx`) with production script; inject CSS and JS into each language-specific HTML

**Target directories:**

- `/en/`, `/ua/` — home pages
- `/en/uzhhorod/`, `/ua/uzhhorod/` — Uzhhorod pages
- `/en/services/<slug>/`, `/ua/services/<slug>/` — 6 service slugs × 2 languages = 12 service page directories

**Result:** Each language route has its own physical HTML file in `dist/`, so search engines can crawl them directly (SEO-friendly URLs).

---

## Key Config Files

### [vite.config.ts](../../vite.config.ts)

- **Base:** `/`
- **Dev server:** `::` (all interfaces), port 8080
- **Plugins:** `@vitejs/plugin-react-swc`, `copy-index-to-lang-folders`, optional `componentTagger` in dev
- **Aliases:** `@` → `./src`

### [tailwind.config.ts](../../tailwind.config.ts)

- **Dark mode:** `["class"]`
- **Content:** `./src/**/*.{ts,tsx}`, `./pages/**`, `./components/**`, `./app/**`
- **Theme:** shadcn-ui semantic colors (HSL vars), custom `uzhhorod`, `accent-teal`, `accent-gold`
- **Plugins:** `tailwindcss-animate`

### [tsconfig.json](../../tsconfig.json) / [tsconfig.app.json](../../tsconfig.app.json)

- **Base:** `.`
- **Paths:** `@/*` → `./src/*`
- **App config:** `target: ES2020`, `module: ESNext`, `jsx: react-jsx`, `moduleResolution: bundler`

---

## References

- [src/App.tsx](../../src/App.tsx) — routing and layout
- [vite.config.ts](../../vite.config.ts) — build and copy-index plugin
- [README.md](../../README.md) — project overview, scripts, deployment
