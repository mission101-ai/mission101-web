import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
export const BASE_URL = 'https://mission101.ai';

export const SERVICE_SLUGS = [
  'digital-transformation-strategy',
  'employee-training',
  'voice-agents',
  'ai-assistants',
  'custom-ai-solutions',
  'marketing-automation',
  'ai-websites',
  'business-analytics',
];

/** Product/event route segments, relative to a language prefix (e.g. ['products', 'legal']). */
const PRODUCT_EVENT_ROUTE_SEGMENTS = [
  ['products', 'image-resizer'],
  ['products', 'image-resizer', 'privacy-policy'],
  ['products', 'legal'],
  ['events'],
  ['events', 'uzhhorod-2026-03-18'],
];

/**
 * The canonical list of indexable marketing routes: where to visit each one (urlPath),
 * where its prerendered HTML is written (destSegments, relative to dist/), and what its
 * canonical URL must be once client-side SEO logic (src/components/SEO.tsx) has run —
 * used to validate a headless-rendered page before writing it to disk.
 *
 * Content (title, description, body copy) is intentionally NOT computed here: the
 * headless render captures whatever the live app renders for that route, so there is
 * a single source of truth (the app + its i18n data) instead of a second, driftable
 * copy of the same strings in this build script.
 */
export function getAllPrerenderRoutes() {
  const routes = [];

  // Language homes. English's canonical is the apex URL for both `/` and `/en/`
  // (see SEO.tsx's isEnglishHome handling); Ukrainian's canonical is self-referential.
  routes.push({ urlPath: '/', destSegments: [], expectedCanonical: `${BASE_URL}/` });
  routes.push({ urlPath: '/en/', destSegments: ['en'], expectedCanonical: `${BASE_URL}/` });
  routes.push({ urlPath: '/ua/', destSegments: ['ua'], expectedCanonical: `${BASE_URL}/ua/` });

  // Uzhhorod
  for (const lang of ['en', 'ua']) {
    routes.push({
      urlPath: `/${lang}/uzhhorod/`,
      destSegments: [lang, 'uzhhorod'],
      expectedCanonical: `${BASE_URL}/${lang}/uzhhorod/`,
    });
  }

  // Service pages
  for (const slug of SERVICE_SLUGS) {
    for (const lang of ['en', 'ua']) {
      routes.push({
        urlPath: `/${lang}/services/${slug}/`,
        destSegments: [lang, 'services', slug],
        expectedCanonical: `${BASE_URL}/${lang}/services/${slug}/`,
      });
    }
  }

  // Products + events
  for (const segments of PRODUCT_EVENT_ROUTE_SEGMENTS) {
    for (const lang of ['en', 'ua']) {
      routes.push({
        urlPath: `/${lang}/${segments.join('/')}/`,
        destSegments: [lang, ...segments],
        expectedCanonical: `${BASE_URL}/${lang}/${segments.join('/')}/`,
      });
    }
  }

  return routes;
}

/** Retained for scripts/tests that need raw locale JSON (e.g. content completeness checks). */
export function loadLocales() {
  const en = JSON.parse(fs.readFileSync(path.join(root, 'src/i18n/locales/en.json'), 'utf-8'));
  const ua = JSON.parse(fs.readFileSync(path.join(root, 'src/i18n/locales/ua.json'), 'utf-8'));
  return { en, ua };
}
