import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { Phone, BarChart3, Globe, Bot, Megaphone, Sparkles } from 'lucide-react';

const serviceIcons = [Phone, Bot, Sparkles, Megaphone, Globe, BarChart3];

export const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-blue-50 to-blue-50 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3a6291] mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {(t('services.items', { returnObjects: true }) as Array<{ title: string; description: string[] }>).map((service, index: number) => {
            const Icon = serviceIcons[index];
            const accentColors = [
              'from-blue-500 to-indigo-500',
              'from-teal-500 to-cyan-500',
              'from-purple-500 to-pink-500',
              'from-amber-500 to-orange-500',
              'from-emerald-500 to-green-500',
              'from-rose-500 to-red-500',
            ];
            const accentColor = accentColors[index % accentColors.length];
            
            return (
              <ScrollTrigger key={index}>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-500 group h-full relative overflow-hidden transform hover:-translate-y-2">
                  {/* Gradient border effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
                  <div className="absolute inset-[2px] bg-white rounded-xl z-0" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${accentColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-[#3a6291] group-hover:to-[#14b8a6] transition-all duration-300 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <ul className="space-y-3 text-gray-600 leading-relaxed">
                      {service.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <span className="text-accent-teal mt-1 flex-shrink-0">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollTrigger>
            );
          })}
        </div>
      </div>
    </section>
  );
};
