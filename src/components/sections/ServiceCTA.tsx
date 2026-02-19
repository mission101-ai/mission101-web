import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';

export const ServiceCTA = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const langPrefix = currentLanguage === 'ua' ? 'ua' : 'en';
  const contactUrl = `/${langPrefix}/#contact`;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-6">
            {t('servicePages.ctaTitle')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('contact.cta.text')}
          </p>
          <a
            href={contactUrl}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-uzhhorod text-white font-semibold rounded-lg hover:bg-[#2d4e73] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('servicePages.ctaButton')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
