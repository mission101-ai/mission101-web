import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://mission101.ai';
const BUSINESS_PHONE = '+380974825097';

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
}: SEOProps) => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const alternatePath = hreflangPath || productHreflangPath;
  const applicationSchemaType = applicationSchema?.type;
  const applicationSchemaName = applicationSchema?.name;

  useEffect(() => {
    const currentLang = i18n.language || 'en';
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

    if (isServicePage && serviceSlug) {
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
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
      });
    } else if (isUzhhorodPage) {
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
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
      });
    } else if (applicationSchemaType && applicationSchemaName) {
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
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
      });
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
    i18n.language,
    t,
  ]);

  return null;
};
