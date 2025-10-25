import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { Phone, BarChart3, Globe, Bot, Megaphone, Wallet } from 'lucide-react';

const projectIcons = [Phone, BarChart3, Globe, Bot, Megaphone, Wallet];

export const PortfolioSection = () => {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">{'>'}</span> {t('portfolio.title')}
          </h2>
          <p className="text-xl text-muted-foreground font-mono">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {(t('portfolio.items', { returnObjects: true }) as Array<{ title: string; category: string; description: string }>).map((project, index: number) => {
            const Icon = projectIcons[index];
            return (
              <ScrollTrigger key={index}>
                <div className="terminal group hover:border-l-accent transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold font-mono group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-mono rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
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
