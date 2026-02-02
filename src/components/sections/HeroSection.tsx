import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation();
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-50/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-blue-100 text-uzhhorod rounded-full text-sm font-medium">
          <span>{t('hero.terminal')}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="text-uzhhorod">{t('hero.title')}</span>
          <br />
          <span className="text-[#3a6291]">{t('hero.titleHighlight')}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-200">
          {t('hero.tagline')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <button 
            onClick={scrollToContact}
            className="group px-8 py-4 bg-uzhhorod text-white font-semibold rounded-lg hover:bg-[#2d4e73] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('hero.getStarted')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href="#services"
            className="px-8 py-4 bg-white border-2 border-uzhhorod text-uzhhorod font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            {t('hero.exploreServices')}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in delay-500">
          <div className="text-center">
            <div className="text-3xl font-bold text-uzhhorod">{t('hero.stats.foundedValue')}</div>
            <div className="text-sm text-gray-600 mt-1">{t('hero.stats.founded')}</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-3xl font-bold text-uzhhorod">{t('hero.stats.supportValue')}</div>
            <div className="text-sm text-gray-600 mt-1">{t('hero.stats.support')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-uzhhorod">{t('hero.stats.reachValue')}</div>
            <div className="text-sm text-gray-600 mt-1">{t('hero.stats.reach')}</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-uzhhorod rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-uzhhorod rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
