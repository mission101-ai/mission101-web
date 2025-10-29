import { Cog, TrendingDown, Sparkles, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UzhhorodServices = () => {
  const { t } = useTranslation();

  const icons = [Cog, TrendingDown, Sparkles, TrendingUp];
  const colors = [
    { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:border-blue-300' },
    { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:border-purple-300' },
    { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:border-green-300' },
    { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:border-orange-300' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('uzhhorod.services.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('uzhhorod.services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 4 }).map((_, index) => {
            const Icon = icons[index];
            const color = colors[index];
            
            return (
              <div
                key={index}
                className={`bg-white border-2 border-gray-200 rounded-2xl p-8 transition-all duration-300 ${color.hover} hover:shadow-xl`}
              >
                <div className={`w-16 h-16 ${color.bg} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${color.text}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t(`uzhhorod.services.items.${index}.title`)}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t(`uzhhorod.services.items.${index}.description`)}
                </p>
                
                {/* Benefits List */}
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">
                        {t(`uzhhorod.services.items.${index}.benefits.${benefitIndex}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Office Image */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/uzhhorod/modern-office.jpg"
              alt="Modern office"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

