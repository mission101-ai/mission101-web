import { LanguageSwitcher } from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar } from 'lucide-react';

export const UzhhorodNav = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg' 
            : 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
            >
              <img 
                src="/mission101-logo-nav.png" 
                alt="Mission101.ai logo" 
                className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'} group-hover:scale-105`}
              />
              <span className={`font-bold text-gray-900 transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                <span className="text-uzhhorod">Mission</span>
                <span>101</span>
                <span className="bg-gradient-to-r from-uzhhorod to-accent-teal bg-clip-text text-transparent">.ai</span>
              </span>
            </button>

            {/* Language switcher */}
            <LanguageSwitcher isUzhhorodPage={true} />
          </div>
        </div>
      </nav>

      {/* Floating Events link below header */}
      <div className="fixed top-24 right-6 z-40">
        <Link
          to={`/${currentLanguage}/events`}
          className="relative flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 hover:border-uzhhorod transition-all duration-300 group shadow-sm hover:shadow-md overflow-hidden btn-ripple"
        >
          <Calendar className="w-5 h-5 text-uzhhorod group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-bold text-gray-900 group-hover:text-uzhhorod transition-colors">
            {t('nav.events')}
          </span>
        </Link>
      </div>
    </>
  );
};

