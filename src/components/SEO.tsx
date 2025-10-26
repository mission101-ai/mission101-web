import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

export const SEO = ({ 
  title, 
  description, 
  ogImage = 'https://mission101.ai/mission101-og-image.png',
  canonical 
}: SEOProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const currentLang = i18n.language || 'en';
    const baseUrl = 'https://mission101.ai';
    const currentPath = location.pathname;
    
    // Determine the canonical URL
    const canonicalUrl = canonical || `${baseUrl}${currentPath}`;
    
    // Default SEO content
    const defaultTitle = 'Mission101.ai | Intelligent Automation for Modern Business';
    const defaultDescription = 'Transform your business with intelligent automation solutions. Mission101.ai provides AI-powered tools to streamline operations, enhance productivity, and accelerate digital growth.';
    
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
    
    updateAlternateLink('en', `${baseUrl}/en`);
    updateAlternateLink('uk', `${baseUrl}/ua`);
    updateAlternateLink('x-default', baseUrl);
    
  }, [location, title, description, ogImage, canonical, i18n.language]);
  
  return null; // This component doesn't render anything
};

