import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://mission101.ai';
const BUSINESS_PHONE = '+380974825097';

const BREADCRUMB_LABELS: Record<'en' | 'uk', { home: string; services: string; events: string }> = {
  en: { home: 'Home', services: 'Services', events: 'Events' },
  uk: { home: 'Головна', services: 'Послуги', events: 'Події' },
};

interface BreadcrumbStep {
  name: string;
  item: string;
}

function buildBreadcrumbList(steps: BreadcrumbStep[]) {
  if (steps.length === 0) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: steps.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: step.item,
    })),
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

function buildFaqPageSchema(items: FaqItem[]) {
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

interface ApplicationSchema {
  type: 'SoftwareApplication' | 'MobileApplication';
  name: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  isLocalPage?: boolean;
  isServicePage?: boolean;
  serviceSlug?: string;
  /** Language-agnostic path under /en|ua/, e.g. products/image-resizer or events */
  hreflangPath?: string;
  /** @deprecated use hreflangPath */
  productHreflangPath?: string;
  applicationSchema?: ApplicationSchema;
  /** When true, adds <meta name="robots" content="noindex, follow"> to this page. Defaults to indexable. */
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  ogImage = 'https://mission101.ai/mission101-og-1200x630.jpg',
  canonical,
  isLocalPage = false,
  isServicePage = false,
  serviceSlug,
  hreflangPath,
  productHreflangPath,
  applicationSchema,
  noindex = false,
}: SEOProps) => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const alternatePath = hreflangPath || productHreflangPath;
  const applicationSchemaType = applicationSchema?.type;
  const applicationSchemaName = applicationSchema?.name;

  useEffect(() => {
    const currentLang = i18n.language || 'en';
    const langPrefix = currentLang === 'ua' ? 'ua' : 'en';
    const currentPath = location.pathname;

    // Normalize path - add trailing slashes for directory-like paths (matches GitHub Pages behavior)
    const normalizedPath =
      currentPath === '/' ? '/' : currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

    const isEnglishHome = normalizedPath === '/' || normalizedPath === '/en/';
    const isUkrainianHome = normalizedPath === '/ua/';
    const isHomePage = isEnglishHome || isUkrainianHome;
    // Match /en/uzhhorod/ only — not event slugs like /events/uzhhorod-2026-03-18/
    const isUzhhorodPath = /\/uzhhorod\/?$/.test(normalizedPath);
    const isUzhhorodPage = isLocalPage || isUzhhorodPath;

    // Preferred English homepage is apex `/` (not `/en/`)
    let canonicalUrl = canonical || `${BASE_URL}${normalizedPath}`;
    if (!canonical && isEnglishHome) {
      canonicalUrl = `${BASE_URL}/`;
    }

    const defaultTitle = t('seo.title');
    const defaultDescription = t('seo.description');

    const pageTitle = title || defaultTitle;
    const pageDescription = description || defaultDescription;

    document.title = pageTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    document.documentElement.lang = currentLang === 'ua' ? 'uk' : currentLang;

    updateMetaTag('description', pageDescription);

    if (noindex) {
      updateMetaTag('robots', 'noindex, follow');
    } else {
      const existingRobotsTag = document.querySelector('meta[name="robots"]');
      existingRobotsTag?.remove();
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    updateMetaTag('og:title', pageTitle, true);
    updateMetaTag('og:description', pageDescription, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:locale', currentLang === 'ua' ? 'uk_UA' : 'en_US', true);

    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', ogImage);

    const updateAlternateLink = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Hreflang: en/uk codes, x-default always English URL (trailing slash)
    if (alternatePath) {
      const normalizedAlternatePath = alternatePath.replace(/^\/+|\/+$/g, '');
      updateAlternateLink('en', `${BASE_URL}/en/${normalizedAlternatePath}/`);
      updateAlternateLink('uk', `${BASE_URL}/ua/${normalizedAlternatePath}/`);
      updateAlternateLink('x-default', `${BASE_URL}/en/${normalizedAlternatePath}/`);
    } else if (isServicePage && serviceSlug) {
      updateAlternateLink('en', `${BASE_URL}/en/services/${serviceSlug}/`);
      updateAlternateLink('uk', `${BASE_URL}/ua/services/${serviceSlug}/`);
      updateAlternateLink('x-default', `${BASE_URL}/en/services/${serviceSlug}/`);
    } else if (isUzhhorodPage) {
      updateAlternateLink('en', `${BASE_URL}/en/uzhhorod/`);
      updateAlternateLink('uk', `${BASE_URL}/ua/uzhhorod/`);
      updateAlternateLink('x-default', `${BASE_URL}/en/uzhhorod/`);
    } else {
      // Home cluster: preferred English URL is apex
      updateAlternateLink('en', `${BASE_URL}/`);
      updateAlternateLink('uk', `${BASE_URL}/ua/`);
      updateAlternateLink('x-default', `${BASE_URL}/`);
    }

    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }

    // Breadcrumb JSON-LD for service/event/product pages, reusing the resolved page title
    // as the leaf label so it never drifts from what search engines already see as the title.
    const breadcrumbLangKey = currentLang === 'ua' ? 'uk' : 'en';
    const breadcrumbLabels = BREADCRUMB_LABELS[breadcrumbLangKey];
    const homeUrl = currentLang === 'ua' ? `${BASE_URL}/ua/` : `${BASE_URL}/`;
    const homeStep: BreadcrumbStep = { name: breadcrumbLabels.home, item: homeUrl };

    let breadcrumbSteps: BreadcrumbStep[] = [];
    if (isServicePage && serviceSlug) {
      breadcrumbSteps = [
        homeStep,
        { name: breadcrumbLabels.services, item: `${homeUrl}#services` },
        { name: pageTitle, item: canonicalUrl },
      ];
    } else if (alternatePath?.startsWith('events')) {
      const eventsIndexUrl = `${BASE_URL}/${langPrefix}/events/`;
      breadcrumbSteps =
        alternatePath === 'events'
          ? [homeStep, { name: breadcrumbLabels.events, item: eventsIndexUrl }]
          : [
              homeStep,
              { name: breadcrumbLabels.events, item: eventsIndexUrl },
              { name: pageTitle, item: canonicalUrl },
            ];
    } else if (alternatePath?.startsWith('products/')) {
      const segments = alternatePath.split('/');
      if (segments.length === 3) {
        const productSlug = segments[1];
        const productKey = productSlug.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
        const parentLabel = t(`products.${productKey}.name`, { defaultValue: pageTitle });
        const parentUrl = `${BASE_URL}/${langPrefix}/products/${productSlug}/`;
        breadcrumbSteps = [homeStep, { name: parentLabel, item: parentUrl }, { name: pageTitle, item: canonicalUrl }];
      } else {
        breadcrumbSteps = [homeStep, { name: pageTitle, item: canonicalUrl }];
      }
    }
    const breadcrumbList = buildBreadcrumbList(breadcrumbSteps);

    if (isServicePage && serviceSlug) {
      const serviceSchema = {
        '@type': 'Service',
        name: pageTitle,
        description: pageDescription,
        provider: {
          '@type': 'Organization',
          name: 'Mission101.ai',
          url: BASE_URL,
        },
        url: canonicalUrl,
        areaServed: {
          '@type': 'Place',
          name: 'Worldwide',
        },
      };
      const serviceFaqItems = t(`servicePages.${serviceSlug}.faq`, {
        returnObjects: true,
        defaultValue: [],
      }) as FaqItem[];
      const serviceFaqSchema = buildFaqPageSchema(serviceFaqItems);
      const serviceGraph = [serviceSchema, breadcrumbList, serviceFaqSchema].filter(Boolean);
      schemaScript.textContent = JSON.stringify(
        serviceGraph.length > 1
          ? { '@context': 'https://schema.org', '@graph': serviceGraph }
          : { '@context': 'https://schema.org', ...serviceSchema }
      );
    } else if (isUzhhorodPage) {
      const localBusinessSchema = {
        '@type': 'LocalBusiness',
        name: 'Mission101.ai',
        image: ogImage,
        description: pageDescription,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Uzhhorod',
          addressRegion: 'Zakarpattia Oblast',
          addressCountry: 'UA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '48.6208',
          longitude: '22.2879',
        },
        url: canonicalUrl,
        telephone: BUSINESS_PHONE,
        priceRange: '$$',
        areaServed: {
          '@type': 'City',
          name: 'Uzhhorod',
        },
        serviceType: [
          'Business Process Automation',
          'AI Solutions',
          'IT Consulting',
          'Cost Optimization',
        ],
      };
      const uzhhorodFaqItems = t('uzhhorod.faq.items', {
        returnObjects: true,
        defaultValue: [],
      }) as FaqItem[];
      const uzhhorodFaqSchema = buildFaqPageSchema(uzhhorodFaqItems);
      schemaScript.textContent = JSON.stringify(
        uzhhorodFaqSchema
          ? { '@context': 'https://schema.org', '@graph': [localBusinessSchema, uzhhorodFaqSchema] }
          : { '@context': 'https://schema.org', ...localBusinessSchema }
      );
    } else if (applicationSchemaType && applicationSchemaName) {
      const applicationSchemaObject = {
        '@type': applicationSchemaType,
        name: applicationSchemaName,
        description: pageDescription,
        url: canonicalUrl,
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      };
      schemaScript.textContent = JSON.stringify(
        breadcrumbList
          ? { '@context': 'https://schema.org', '@graph': [applicationSchemaObject, breadcrumbList] }
          : { '@context': 'https://schema.org', ...applicationSchemaObject }
      );
    } else if (isHomePage) {
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: 'Mission101.ai',
            url: BASE_URL,
            logo: `${BASE_URL}/mission101-icon.ico`,
            description:
              'Empowering businesses worldwide through intelligent automation and AI-driven optimization',
          },
          {
            '@type': 'WebSite',
            name: 'Mission101.ai',
            url: BASE_URL,
            description: pageDescription,
            publisher: {
              '@type': 'Organization',
              name: 'Mission101.ai',
            },
            inLanguage: ['en', 'uk'],
          },
        ],
      });
    } else if (breadcrumbList) {
      // Page types with no primary schema type (e.g. events index, product privacy pages)
      // still get breadcrumb-only structured data.
      schemaScript.textContent = JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbList });
    } else if (schemaScript) {
      // Page types without a defined graph: remove leftover schema from prior navigations
      schemaScript.remove();
    }
  }, [
    location,
    title,
    description,
    ogImage,
    canonical,
    isLocalPage,
    isServicePage,
    serviceSlug,
    alternatePath,
    applicationSchemaType,
    applicationSchemaName,
    noindex,
    i18n.language,
    t,
  ]);

  return null;
};
