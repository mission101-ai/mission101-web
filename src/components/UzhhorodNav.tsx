import { LanguageSwitcher } from './LanguageSwitcher';
import { useEffect, useState } from 'react';

export const UzhhorodNav = () => {
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

          {/* Right side: Language switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher isUzhhorodPage={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};

