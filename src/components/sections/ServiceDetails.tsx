import { CheckCircle2, Zap, Target, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';


interface ServiceDetailsProps {
  serviceSlug: string;
}

export const ServiceDetails = ({ serviceSlug }: ServiceDetailsProps) => {
  const { t } = useTranslation();

  const icons = [CheckCircle2, Zap, Target, BarChart3];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Description */}
          <div className="mb-16">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t(`servicePages.${serviceSlug}.description`)}
            </p>
          </div>

          {/* Features Grid */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3a6291] mb-8">
              {t('services.subtitle')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={index}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#3a6291] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-uzhhorod group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {t(`servicePages.${serviceSlug}.features.${index}`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
