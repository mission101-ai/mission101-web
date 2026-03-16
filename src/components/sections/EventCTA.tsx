import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';

interface EventCTAProps {
  eventSlug: string;
}

export const EventCTA = ({ eventSlug }: EventCTAProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const ctaTitleKey = `events.${eventSlug}.registration.title`;
  const ctaDescKey = `events.${eventSlug}.registration.description`;
  const ctaKey = `events.${eventSlug}.registration.cta`;
  const urlKey = `events.${eventSlug}.registration.url`;

  const title = t(ctaTitleKey) !== ctaTitleKey ? t(ctaTitleKey) : null;
  const description = t(ctaDescKey) !== ctaDescKey ? t(ctaDescKey) : null;
  const ctaText = t(ctaKey);
  const registrationUrl = t(urlKey) !== urlKey ? t(urlKey) : null;

  const fallbackTitle =
    currentLanguage === 'ua'
      ? 'Готові взяти участь?'
      : 'Ready to participate?';
  const fallbackDescription =
    currentLanguage === 'ua'
      ? 'Зареєструйтеся на подію та отримайте практичні знання з AI'
      : 'Register for the event and gain practical AI knowledge';

  const displayTitle = title ?? fallbackTitle;
  const displayDescription = description ?? fallbackDescription;

  const handleClick = () => {
    if (registrationUrl && registrationUrl.startsWith('http')) {
      window.open(registrationUrl, '_blank', 'noopener,noreferrer');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-50/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-6">
            {displayTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            {displayDescription}
          </p>
          <button
            onClick={handleClick}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-uzhhorod text-white font-semibold rounded-lg hover:bg-[#2d4e73] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
