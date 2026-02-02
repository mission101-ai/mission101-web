import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  isUzhhorodPage?: boolean;
}

export const LanguageSwitcher = ({ isUzhhorodPage = false }: LanguageSwitcherProps) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'ua' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageToggle}
      className="relative flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 hover:border-uzhhorod transition-all duration-300 group shadow-sm hover:shadow-md overflow-hidden btn-ripple"
      aria-label="Switch language"
    >
      <Globe className="w-5 h-5 text-uzhhorod group-hover:rotate-180 transition-transform duration-500" />
      <span className="text-sm font-bold text-gray-900 group-hover:text-uzhhorod transition-colors">
        {currentLanguage === 'en' ? 'EN' : 'UA'}
      </span>
      <span className="text-xs text-gray-400 hidden md:inline">|</span>
      <span className="text-xs text-gray-600 hidden md:inline group-hover:text-accent-teal transition-colors">
        {currentLanguage === 'en' ? 'Українська' : 'English'}
      </span>
    </button>
  );
};

