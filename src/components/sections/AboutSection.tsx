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
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3a6291] mb-6">
            {t('about.title')}
          </h2>
        </div>

        <ScrollTrigger onEnterViewport={() => setShowTypewriter1(true)}>
          <div className="mb-20 max-w-6xl mx-auto">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              {t('about.intro')}
            </p>
            {showTypewriter1 && (
              <TypewriterList
                key={currentLanguage}
                items={t('about.description', { returnObjects: true }) as string[]}
                speed={20}
                className="space-y-3 text-gray-600"
                itemClassName="flex items-start gap-3"
              />
            )}
          </div>
        </ScrollTrigger>

        <ScrollTrigger>
          <div className="grid md:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto">
            {/* Goal */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 border-2 border-gray-200 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:border-accent-teal/30 transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-uzhhorod to-accent-teal rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-uzhhorod to-accent-teal bg-clip-text text-transparent">{t('about.goal.title')}</h3>
              </div>
              <ul className="space-y-3 text-gray-600 leading-relaxed">
                {(t('about.goal.description', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-white to-indigo-50/50 border-2 border-gray-200 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:border-uzhhorod/30 transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-uzhhorod rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-uzhhorod bg-clip-text text-transparent">{t('about.mission.title')}</h3>
              </div>
              <ul className="space-y-3 text-gray-600 leading-relaxed">
                {(t('about.mission.description', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-uzhhorod mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollTrigger>

        {/* Key Focus Areas */}
        <ScrollTrigger>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-[#3a6291] mb-12 text-center">
              {t('about.focusAreas.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:border-transparent relative overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                <div className="absolute inset-[2px] bg-white rounded-2xl z-0" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-[#3a6291] mb-4">{t('about.focusAreas.processAutomation.title')}</h4>
                  <p className="text-gray-600 leading-relaxed">{t('about.focusAreas.processAutomation.description')}</p>
                </div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:border-transparent relative overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                <div className="absolute inset-[2px] bg-white rounded-2xl z-0" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-[#3a6291] mb-4">{t('about.focusAreas.performanceOptimization.title')}</h4>
                  <p className="text-gray-600 leading-relaxed">{t('about.focusAreas.performanceOptimization.description')}</p>
                </div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:border-transparent relative overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                <div className="absolute inset-[2px] bg-white rounded-2xl z-0" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <TrendingDown className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-[#3a6291] mb-4">{t('about.focusAreas.costReduction.title')}</h4>
                  <p className="text-gray-600 leading-relaxed">{t('about.focusAreas.costReduction.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
