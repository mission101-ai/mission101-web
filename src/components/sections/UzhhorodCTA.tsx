import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UzhhorodCTA = () => {
  const { t } = useTranslation();
  
  const handleContactClick = () => {
    // Scroll to contact section on the same page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/uzhhorod/handshake.jpg"
                  alt="Business handshake"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-3">
                  {t('uzhhorod.cta.title')}
                </h2>
                <p className="text-xl text-uzhhorod font-semibold mb-4">
                  {t('uzhhorod.cta.subtitle')}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('uzhhorod.cta.description')}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-uzhhorod flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">
                      {t(`uzhhorod.cta.features.${index}`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={handleContactClick}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-uzhhorod text-white font-semibold rounded-lg hover:bg-[#2d4e73] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t('uzhhorod.cta.button')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="mt-4 text-sm text-gray-500">
                  {t('uzhhorod.cta.note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

