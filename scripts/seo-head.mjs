import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const BASE = 'https://mission101.ai';

function loadLocales() {
  const en = JSON.parse(fs.readFileSync(path.join(root, 'src/i18n/locales/en.json'), 'utf-8'));
  const ua = JSON.parse(fs.readFileSync(path.join(root, 'src/i18n/locales/ua.json'), 'utf-8'));
  return { en, ua };
}

/** FAQ items for a service page, in the given language, from the same source the on-page FAQ UI reads. */
export function getServiceFaqItems(slug, lang) {
  const { en, ua } = loadLocales();
  const locale = lang === 'en' ? en : ua;
  return locale?.servicePages?.[slug]?.faq ?? [];
}

/** FAQ items for the Uzhhorod local page, in the given language. */
export function getUzhhorodFaqItems(lang) {
  const { en, ua } = loadLocales();
  const locale = lang === 'en' ? en : ua;
  return locale?.uzhhorod?.faq?.items ?? [];
}

/** Mirrors src/components/SEO.tsx's buildFaqPageSchema: only emit FAQPage for 2+ items. */
function buildFaqPageSchema(items) {
  if (!Array.isArray(items) || items.length < 2) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Merge a FAQPage entity into the page's existing JSON-LD block (single object or @graph),
 * without disturbing whatever schema is already there.
 */
function injectFaqIntoLdJson(html, faqItems) {
  const faqSchema = buildFaqPageSchema(faqItems);
  if (!faqSchema) return html;

  const blockRe = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/;
  const match = html.match(blockRe);
  if (!match) return html;

  const json = JSON.parse(match[1]);
  const merged = Array.isArray(json['@graph'])
    ? { ...json, '@graph': [...json['@graph'], faqSchema] }
    : (() => {
        const { '@context': context, ...rest } = json;
        return { '@context': context, '@graph': [rest, faqSchema] };
      })();

  const newBlock = `<script type="application/ld+json">\n    ${JSON.stringify(merged, null, 2)}\n    </script>`;
  return html.replace(blockRe, newBlock);
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

/**
 * Replace document-head SEO signals in an HTML shell with page-specific values.
 * Keeps script/style asset tags from the built shell intact.
 */
export function applySeoHead(html, meta) {
  const {
    htmlLang,
    title,
    description,
    canonicalUrl,
    enUrl,
    ukUrl,
    xDefaultUrl,
    ogLocale,
  } = meta;

  let out = html;

  out = out.replace(/<html\s+lang="[^"]*"/, `<html lang="${htmlLang}"`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  const replaceNamedMeta = (name, content) => {
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`, 'i');
    if (re.test(out)) {
      out = out.replace(re, `<meta name="${name}" content="${escapeAttr(content)}" />`);
    } else {
      out = out.replace('</head>', `    <meta name="${name}" content="${escapeAttr(content)}" />\n  </head>`);
    }
  };

  const replacePropertyMeta = (property, content) => {
    const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`, 'i');
    if (re.test(out)) {
      out = out.replace(re, `<meta property="${property}" content="${escapeAttr(content)}" />`);
    } else {
      out = out.replace(
        '</head>',
        `    <meta property="${property}" content="${escapeAttr(content)}" />\n  </head>`
      );
    }
  };

  replaceNamedMeta('description', description);
  replaceNamedMeta('twitter:title', title);
  replaceNamedMeta('twitter:description', description);

  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  const replaceHreflang = (hreflang, href) => {
    const re = new RegExp(
      `<link\\s+rel="alternate"\\s+hreflang="${hreflang}"\\s+href="[^"]*"\\s*/?>`,
      'i'
    );
    if (re.test(out)) {
      out = out.replace(re, `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`);
    } else {
      out = out.replace(
        '</head>',
        `    <link rel="alternate" hreflang="${hreflang}" href="${href}" />\n  </head>`
      );
    }
  };

  replaceHreflang('en', enUrl);
  replaceHreflang('uk', ukUrl);
  replaceHreflang('x-default', xDefaultUrl);

  replacePropertyMeta('og:title', title);
  replacePropertyMeta('og:description', description);
  replacePropertyMeta('og:url', canonicalUrl);
  replacePropertyMeta('og:locale', ogLocale);

  // Drop homepage JSON-LD from shells used for non-home routes
  out = out.replace(
    /<!-- Structured Data \(JSON-LD\) -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    ''
  );
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

  return out;
}

function pageMeta(lang, hreflangPath, title, description) {
  const enUrl = `${BASE}/en/${hreflangPath}/`;
  const ukUrl = `${BASE}/ua/${hreflangPath}/`;
  const canonicalUrl = lang === 'en' ? enUrl : ukUrl;
  return {
    htmlLang: lang === 'en' ? 'en' : 'uk',
    title,
    description,
    canonicalUrl,
    enUrl,
    ukUrl,
    xDefaultUrl: enUrl,
    ogLocale: lang === 'en' ? 'en_US' : 'uk_UA',
  };
}

/** Product + events routes that need injected heads (no hand-maintained public HTML). */
export function getInjectedRouteMetas() {
  const { en, ua } = loadLocales();
  const locales = { en, ua };

  const routes = [
    {
      segments: ['products', 'image-resizer'],
      hreflangPath: 'products/image-resizer',
      titleKey: (l) => l.products.imageResizer.seo.title,
      descKey: (l) => l.products.imageResizer.seo.description,
    },
    {
      segments: ['products', 'image-resizer', 'privacy-policy'],
      hreflangPath: 'products/image-resizer/privacy-policy',
      titleKey: (l) => l.products.imageResizer.privacy.seo.title,
      descKey: (l) => l.products.imageResizer.privacy.seo.description,
    },
    {
      segments: ['products', 'legal'],
      hreflangPath: 'products/legal',
      titleKey: (l) => l.products.legal.seo.title,
      descKey: (l) => l.products.legal.seo.description,
    },
    {
      segments: ['events'],
      hreflangPath: 'events',
      titleKey: (l) => l.events.seo.title,
      descKey: (l) => l.events.seo.description,
    },
    {
      segments: ['events', 'uzhhorod-2026-03-18'],
      hreflangPath: 'events/uzhhorod-2026-03-18',
      titleKey: (l) =>
        l.events['uzhhorod-2026-03-18']?.seo?.title || l.events.seo.title,
      descKey: (l) =>
        l.events['uzhhorod-2026-03-18']?.seo?.description || l.events.seo.description,
    },
  ];

  const result = [];
  for (const route of routes) {
    for (const lang of ['en', 'ua']) {
      const locale = locales[lang];
      result.push({
        lang,
        segments: route.segments,
        meta: pageMeta(
          lang,
          route.hreflangPath,
          route.titleKey(locale),
          route.descKey(locale)
        ),
      });
    }
  }
  return result;
}

/**
 * Write a lang-folder HTML file from a public prerender template (or built shell),
 * injecting production asset tags from the Vite build output.
 */
export function writePrerenderedHtml({
  publicIndexPath,
  distIndexHtml,
  destPath,
  styleTag,
  scriptTag,
  headMeta,
  faqItems,
}) {
  let html;
  if (publicIndexPath && fs.existsSync(publicIndexPath)) {
    html = fs.readFileSync(publicIndexPath, 'utf-8');
    if (styleTag) {
      html = html.replace('</head>', `  ${styleTag}\n  </head>`);
    }
    if (scriptTag) {
      html = html.replace(
        '<script type="module" src="/src/main.tsx"></script>',
        scriptTag
      );
    }
  } else {
    html = distIndexHtml;
  }

  if (headMeta) {
    html = applySeoHead(html, headMeta);
  }

  if (faqItems) {
    html = injectFaqIntoLdJson(html, faqItems);
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, html);
}
