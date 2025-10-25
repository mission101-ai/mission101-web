import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'ua' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageToggle}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-md hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 group"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-accent group-hover:rotate-12 transition-transform" />
      <span className="font-mono text-sm font-semibold">
        {currentLanguage === 'en' ? 'EN' : 'UA'}
      </span>
      <span className="text-xs text-muted-foreground">|</span>
      <span className="font-mono text-xs text-muted-foreground">
        {currentLanguage === 'en' ? 'Українська' : 'English'}
      </span>
    </button>
  );
};

