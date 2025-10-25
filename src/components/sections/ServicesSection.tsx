import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { Phone, BarChart3, Globe, Bot, Megaphone, Sparkles } from 'lucide-react';

const serviceIcons = [Phone, BarChart3, Globe, Bot, Megaphone, Sparkles];

export const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-32 px-6 bg-bg-secondary relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">{'>'}</span> {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground font-mono">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(t('services.items', { returnObjects: true }) as Array<{ title: string; description: string }>).map((service, index: number) => {
            const Icon = serviceIcons[index];
            return (
              <ScrollTrigger key={index}>
                <div className="bg-background border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 group h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-mono group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollTrigger>
            );
          })}
        </div>
      </div>
    </section>
  );
};
