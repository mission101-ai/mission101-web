import { MapPin, Users, Zap, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UzhhorodLocalAdvantages = () => {
  const { t } = useTranslation();

  const icons = [MapPin, Users, Zap, Target];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-4">
            {t('uzhhorod.advantages.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('uzhhorod.advantages.subtitle')}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#3a6291] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-uzhhorod group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-[#3a6291] mb-3">
                  {t(`uzhhorod.advantages.items.${index}.title`)}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {t(`uzhhorod.advantages.items.${index}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* City Image */}
        <div className="mt-16">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/uzhhorod/city-view.jpg"
              alt="Uzhhorod city view"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-3xl font-bold">{t('uzhhorod.advantages.city_name')}</p>
              <p className="text-lg">{t('uzhhorod.advantages.city_region')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

