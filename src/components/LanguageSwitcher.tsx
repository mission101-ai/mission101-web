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
      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-uzhhorod/50 transition-all duration-300 group"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-uzhhorod group-hover:rotate-12 transition-transform" />
      <span className="text-sm font-semibold">
        {currentLanguage === 'en' ? 'EN' : 'UA'}
      </span>
      <span className="text-xs text-gray-600 hidden md:inline">|</span>
      <span className="text-xs text-gray-600 hidden md:inline">
        {currentLanguage === 'en' ? 'Українська' : 'English'}
      </span>
    </button>
  );
};

