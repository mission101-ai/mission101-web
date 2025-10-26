import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { TypewriterList } from '../TypewriterList';
import { Target, Zap, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const AboutSection = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [showTypewriter1, setShowTypewriter1] = useState(false);

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollTrigger onEnterViewport={() => setShowTypewriter1(true)}>
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
              <span className="text-accent">{'>'}</span> {t('about.title')}
            </h2>
            <div className="code-block text-lg text-foreground leading-relaxed">
              <p className="mb-4">
                {t('about.intro')}
              </p>
              {showTypewriter1 && (
                <TypewriterList
                  key={currentLanguage}
                  items={t('about.description', { returnObjects: true }) as string[]}
                  speed={20}
                  className="list-disc list-inside space-y-2 text-muted-foreground"
                  itemClassName=""
                />
              )}
            </div>
          </div>
        </ScrollTrigger>

        <ScrollTrigger>
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Goal */}
            <div className="terminal">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold text-accent">{t('about.goal.title')}</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('about.goal.description', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div className="terminal">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold text-accent">{t('about.mission.title')}</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('about.mission.description', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollTrigger>

        {/* Key Focus Areas */}
        <ScrollTrigger>
          <div className="bg-secondary border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-8 font-mono text-center">
              <span className="text-accent">{t('about.focusAreas.title')}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-mono font-semibold mb-2">{t('about.focusAreas.processAutomation.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('about.focusAreas.processAutomation.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-mono font-semibold mb-2">{t('about.focusAreas.performanceOptimization.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('about.focusAreas.performanceOptimization.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-mono font-semibold mb-2">{t('about.focusAreas.costReduction.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('about.focusAreas.costReduction.description')}</p>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
