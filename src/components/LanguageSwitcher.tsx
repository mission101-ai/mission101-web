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

  // Use blue colors for Uzhhorod pages, green (accent) for main pages
  const hoverBgColor = isUzhhorodPage ? 'hover:bg-blue-600/10' : 'hover:bg-accent/10';
  const hoverBorderColor = isUzhhorodPage ? 'hover:border-blue-600/50' : 'hover:border-accent/50';
  const iconColor = isUzhhorodPage ? 'text-blue-600' : 'text-accent';

  return (
    <button
      onClick={handleLanguageToggle}
      className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-3 md:px-4 py-2 bg-secondary border border-border rounded-md ${hoverBgColor} ${hoverBorderColor} transition-all duration-300 group`}
      aria-label="Switch language"
    >
      <Globe className={`w-4 h-4 ${iconColor} group-hover:rotate-12 transition-transform`} />
      <span className="font-mono text-sm font-semibold">
        {currentLanguage === 'en' ? 'EN' : 'UA'}
      </span>
      <span className="text-xs text-muted-foreground hidden md:inline">|</span>
      <span className="font-mono text-xs text-muted-foreground hidden md:inline">
        {currentLanguage === 'en' ? 'Українська' : 'English'}
      </span>
    </button>
  );
};

