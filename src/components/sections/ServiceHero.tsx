import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceHeroProps {
  serviceSlug: string;
}

export const ServiceHero = ({ serviceSlug }: ServiceHeroProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const langPrefix = currentLanguage === 'ua' ? 'ua' : 'en';
  const servicesUrl = `/${langPrefix}/#services`;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-50/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <a
                href={servicesUrl}
                className="hover:text-uzhhorod transition-colors font-medium"
              >
                {t('servicePages.backToServices')}
              </a>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#3a6291] font-semibold">
                {t(`servicePages.${serviceSlug}.title`)}
              </span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a6291] leading-tight">
              {t(`servicePages.${serviceSlug}.title`)}
            </h1>

            <p className="text-xl md:text-2xl text-uzhhorod font-semibold">
              {t(`servicePages.${serviceSlug}.subtitle`)}
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={`/services/${serviceSlug}.png`}
                alt={t(`servicePages.${serviceSlug}.title`)}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
