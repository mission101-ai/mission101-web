import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ArrowRight } from 'lucide-react';

export const UzhhorodNav = () => {
  const { t } = useTranslation();

  const handleContactClick = () => {
    // Scroll to contact section on the same page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors"
          >
            <span className="text-green-600">Mission</span>
            <span>101</span>
            <span className="text-green-600">.ai</span>
          </button>

          {/* Right side: Language switcher + CTA */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            <button
              onClick={handleContactClick}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t('uzhhorod.hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

