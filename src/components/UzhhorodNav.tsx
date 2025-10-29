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
            className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors"
          >
            <span className="text-green-600">Mission</span>
            <span>101</span>
            <span className="text-green-600">.ai</span>
          </button>

          {/* Right side: Language switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

