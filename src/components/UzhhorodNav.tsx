import { LanguageSwitcher } from './LanguageSwitcher';

export const UzhhorodNav = () => {
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
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/mission101-logo-nav.png" 
              alt="Mission101.ai logo" 
              className="h-12"
            />
            <span className="text-2xl font-bold text-gray-900">
              <span className="text-uzhhorod">Mission</span>
              <span>101</span>
              <span className="text-uzhhorod">.ai</span>
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

