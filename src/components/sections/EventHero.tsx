import { ChevronRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

interface EventHeroProps {
  eventSlug: string;
}

export const EventHero = ({ eventSlug }: EventHeroProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const eventsUrl = `/${currentLanguage}/events`;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-50/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link
              to={eventsUrl}
              className="hover:text-uzhhorod transition-colors font-medium"
            >
              {t('events.hero.title')}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#3a6291] font-semibold">
              {t(`events.${eventSlug}.title`)}
            </span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a6291] leading-tight">
            {t(`events.${eventSlug}.title`)}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-uzhhorod rounded-full text-sm font-medium">
              <MapPin className="w-4 h-4" />
              {t(`events.${eventSlug}.location.city`)}
            </div>
            <span className="text-gray-600 font-medium">
              {t(`events.${eventSlug}.date`)} • {t(`events.${eventSlug}.time`)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
