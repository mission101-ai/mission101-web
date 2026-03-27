import { useTranslation } from 'react-i18next';
import { Linkedin, Mail, Instagram, Youtube, Facebook } from 'lucide-react';
import { trackContactClick } from '@/lib/tracking';

interface FooterSectionProps {
  isUzhhorodPage?: boolean;
}

export const FooterSection = ({ isUzhhorodPage = false }: FooterSectionProps) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-2">
              <span className="text-uzhhorod">mission101</span>
              <span className="text-[#3a6291]">.ai</span>
            </div>
            <p className="text-sm text-gray-600">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sergiiilliukhin/"
              onClick={() => trackContactClick('linkedin', 'https://www.linkedin.com/in/sergiiilliukhin/')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-uzhhorod hover:bg-blue-50 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-uzhhorod" />
            </a>
            <a
              href="https://www.instagram.com/mission101.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-uzhhorod hover:bg-blue-50 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-uzhhorod" />
            </a>
            <a
              href="https://www.youtube.com/@mission101-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-uzhhorod hover:bg-blue-50 transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-uzhhorod" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61588411877520"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-uzhhorod hover:bg-blue-50 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-uzhhorod" />
            </a>
            <a
              href="mailto:sergii@mission101.ai"
              onClick={() => trackContactClick('email', 'mailto:sergii@mission101.ai')}
              className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-uzhhorod hover:bg-blue-50 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-uzhhorod" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {t('footer.location')}
          </p>
        </div>
      </div>
    </footer>
  );
};
