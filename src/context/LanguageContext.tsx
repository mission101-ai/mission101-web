import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { shouldUseUkrainian } from '@/services/geolocation';

type Language = 'en' | 'ua';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'preferred_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      // Don't block rendering - let content show immediately
      // setIsLoading(true); // Removed to prevent black screen

      // Check URL first - if user is on /en or /ua, use that
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const urlLang = pathSegments[0];
      
      if (urlLang === 'en' || urlLang === 'ua') {
        // URL has explicit language, use it
        setCurrentLanguage(urlLang);
        await i18n.changeLanguage(urlLang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, urlLang);
        setIsLoading(false);
        return;
      }

      // Check localStorage for saved preference
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ua')) {
        // User has a saved preference
        setCurrentLanguage(savedLanguage);
        await i18n.changeLanguage(savedLanguage);
        setIsLoading(false);
        return;
      }

      // No saved preference and no URL language - detect based on IP
      try {
        const useUkrainian = await shouldUseUkrainian();
        const detectedLanguage: Language = useUkrainian ? 'ua' : 'en';
        
        setCurrentLanguage(detectedLanguage);
        await i18n.changeLanguage(detectedLanguage);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, detectedLanguage);
      } catch (error) {
        console.error('Failed to detect language:', error);
        // Fallback to English
        setCurrentLanguage('en');
        await i18n.changeLanguage('en');
        localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
      }

      setIsLoading(false);
    };

    initializeLanguage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const changeLanguage = async (lang: Language) => {
    setCurrentLanguage(lang);
    await i18n.changeLanguage(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

    // Preserve current page path when switching languages
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // Remove current language prefix if present
    if (pathSegments[0] === 'en' || pathSegments[0] === 'ua') {
      pathSegments.shift();
    }
    
    // Construct new path with new language
    const newPath = pathSegments.length > 0 
      ? `/${lang}/${pathSegments.join('/')}`
      : `/${lang}`;
    
    navigate(newPath);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

