import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  isLocalPage?: boolean;
}

export const SEO = ({ 
  title, 
  description, 
  ogImage = 'https://mission101.ai/mission101-og-image.png',
  canonical,
  isLocalPage = false
}: SEOProps) => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  
  useEffect(() => {
    const currentLang = i18n.language || 'en';
    const baseUrl = 'https://mission101.ai';
    const currentPath = location.pathname;
    
    // Normalize path - remove trailing slashes for consistency
    const normalizedPath = currentPath.replace(/\/$/, '') || '/';
    
    // Determine the canonical URL
    const canonicalUrl = canonical || `${baseUrl}${normalizedPath}`;
    
    // Default SEO content from translations
    const defaultTitle = t('seo.title');
    const defaultDescription = t('seo.description');
    
    const pageTitle = title || defaultTitle;
    const pageDescription = description || defaultDescription;
    
    // Update document title
    document.title = pageTitle;
    
    // Update or create meta tags
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
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'ua' ? 'uk' : currentLang;
    
    // Update basic meta tags
    updateMetaTag('description', pageDescription);
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    // Update Open Graph tags
    updateMetaTag('og:title', pageTitle, true);
    updateMetaTag('og:description', pageDescription, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:locale', currentLang === 'ua' ? 'uk_UA' : 'en_US', true);
    
    // Update Twitter Card tags
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', ogImage);
    
    // Update language alternates
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
    
    // Update hreflang based on page type
    if (isLocalPage || normalizedPath.includes('/uzhhorod')) {
      updateAlternateLink('en', `${baseUrl}/en/uzhhorod`);
      updateAlternateLink('uk', `${baseUrl}/ua/uzhhorod`);
      updateAlternateLink('x-default', `${baseUrl}/ua/uzhhorod`);
    } else {
      updateAlternateLink('en', `${baseUrl}/en`);
      updateAlternateLink('uk', `${baseUrl}/ua`);
      updateAlternateLink('x-default', baseUrl);
    }
    
    // Add LocalBusiness schema for Uzhhorod page
    if (isLocalPage || normalizedPath.includes('/uzhhorod')) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Mission101.ai",
        "image": ogImage,
        "description": pageDescription,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Uzhhorod",
          "addressRegion": "Zakarpattia Oblast",
          "addressCountry": "UA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "48.6208",
          "longitude": "22.2879"
        },
        "url": canonicalUrl,
        "telephone": "+380",
        "priceRange": "$$",
        "areaServed": {
          "@type": "City",
          "name": "Uzhhorod"
        },
        "serviceType": [
          "Business Process Automation",
          "AI Solutions",
          "IT Consulting",
          "Cost Optimization"
        ]
      };
      
      schemaScript.textContent = JSON.stringify(schemaData);
    } else {
      // Remove schema if not on local page
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }
    }
    
  }, [location, title, description, ogImage, canonical, isLocalPage, i18n.language, t]);
  
  return null; // This component doesn't render anything
};

