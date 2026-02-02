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
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-4">
            {t('about.title')}
          </h2>
        </div>

        <ScrollTrigger onEnterViewport={() => setShowTypewriter1(true)}>
          <div className="mb-16 max-w-6xl mx-auto">
            <p className="text-lg text-gray-600 mb-4">
              {t('about.intro')}
            </p>
            {showTypewriter1 && (
              <TypewriterList
                key={currentLanguage}
                items={t('about.description', { returnObjects: true }) as string[]}
                speed={20}
                className="list-disc list-inside space-y-2 text-gray-600"
                itemClassName=""
              />
            )}
          </div>
        </ScrollTrigger>

        <ScrollTrigger>
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
            {/* Goal */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-uzhhorod" />
                <h3 className="text-2xl font-bold text-uzhhorod">{t('about.goal.title')}</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {(t('about.goal.description', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-uzhhorod" />
                <h3 className="text-2xl font-bold text-uzhhorod">{t('about.mission.title')}</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {(t('about.mission.description', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollTrigger>

        {/* Key Focus Areas */}
        <ScrollTrigger>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-[#3a6291] mb-8 text-center">
              {t('about.focusAreas.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-uzhhorod" />
                </div>
                <h4 className="font-bold text-[#3a6291] mb-3">{t('about.focusAreas.processAutomation.title')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('about.focusAreas.processAutomation.description')}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-uzhhorod" />
                </div>
                <h4 className="font-bold text-[#3a6291] mb-3">{t('about.focusAreas.performanceOptimization.title')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('about.focusAreas.performanceOptimization.description')}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingDown className="w-7 h-7 text-uzhhorod" />
                </div>
                <h4 className="font-bold text-[#3a6291] mb-3">{t('about.focusAreas.costReduction.title')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('about.focusAreas.costReduction.description')}</p>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
