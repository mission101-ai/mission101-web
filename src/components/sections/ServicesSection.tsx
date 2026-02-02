import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { Phone, BarChart3, Globe, Bot, Megaphone, Sparkles } from 'lucide-react';

const serviceIcons = [Phone, Bot, Sparkles, Megaphone, Globe, BarChart3];

export const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(t('services.items', { returnObjects: true }) as Array<{ title: string; description: string[] }>).map((service, index: number) => {
            const Icon = serviceIcons[index];
            return (
              <ScrollTrigger key={index}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-uzhhorod/50 hover:shadow-lg transition-all duration-300 group h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-uzhhorod/10 transition-colors">
                      <Icon className="w-6 h-6 text-uzhhorod" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-uzhhorod transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed text-sm">
                    {service.description.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollTrigger>
            );
          })}
        </div>
      </div>
    </section>
  );
};
