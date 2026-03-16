import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const EVENTS = ['uzhhorod-2026-03-18'] as const;

export const EventsList = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  if (EVENTS.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3a6291] mb-8">
            {t('events.list.upcoming')}
          </h2>
          <p className="text-lg text-gray-600">{t('events.list.noEvents')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#3a6291] mb-12">
          {t('events.list.upcoming')}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((slug) => {
            const description = t(`events.${slug}.description`);
            const briefDescription =
              description.length > 100 ? `${description.slice(0, 100)}...` : description;

            return (
              <div
                key={slug}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200"
              >
                <h3 className="text-xl font-bold text-[#3a6291] mb-4">
                  {t(`events.${slug}.title`)}
                </h3>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-uzhhorod flex-shrink-0" />
                    <span className="text-sm">
                      {t(`events.${slug}.date`)} • {t(`events.${slug}.time`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-uzhhorod flex-shrink-0" />
                    <span className="text-sm">{t(`events.${slug}.location.city`)}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{briefDescription}</p>
                <Link
                  to={`/${currentLanguage}/events/${slug}`}
                  className="inline-flex items-center gap-2 text-uzhhorod font-semibold hover:text-[#2d4e73] transition-colors group/link"
                >
                  {t('events.list.learnMore')}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
