import { useTranslation } from 'react-i18next';
import { Linkedin, Mail } from 'lucide-react';

interface FooterSectionProps {
  isUzhhorodPage?: boolean;
}

export const FooterSection = ({ isUzhhorodPage = false }: FooterSectionProps) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  // Use blue colors for Uzhhorod pages, green (accent) for main pages
  const accentColor = isUzhhorodPage ? 'text-blue-600' : 'text-accent';
  const hoverBorderColor = isUzhhorodPage ? 'hover:border-blue-600' : 'hover:border-accent';
  const hoverBgColor = isUzhhorodPage ? 'hover:bg-blue-600/10' : 'hover:bg-accent/10';
  const iconColor = isUzhhorodPage ? 'text-blue-600' : 'text-accent';

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold font-mono mb-2">
              <span className={accentColor}>mission101</span>
              <span className="text-foreground">.ai</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sergiiilliukhin/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center ${hoverBorderColor} ${hoverBgColor} transition-all duration-300`}
              aria-label="LinkedIn"
            >
              <Linkedin className={`w-5 h-5 ${iconColor}`} />
            </a>
            <a
              href="mailto:sergii@mission101.ai"
              className={`w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center ${hoverBorderColor} ${hoverBgColor} transition-all duration-300`}
              aria-label="Email"
            >
              <Mail className={`w-5 h-5 ${iconColor}`} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground font-mono">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            {t('footer.location')}
          </p>
        </div>
      </div>
    </footer>
  );
};
