import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import uaTranslations from './locales/ua.json';

// Configure i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ua: {
        translation: uaTranslations,
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ua'],
    detection: {
      order: ['localStorage', 'path', 'navigator'],
      caches: ['localStorage'],
      lookupFromPathIndex: 0,
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

