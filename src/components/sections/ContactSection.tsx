import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-uzhhorod" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">{t('contact.phone')}</p>
                <a 
                  href="tel:+380974825097" 
                  className="text-lg font-semibold text-gray-900 hover:text-uzhhorod transition-colors"
                >
                  +38-097-48-25-097
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-uzhhorod" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">{t('contact.email')}</p>
                <a 
                  href="mailto:sergii@mission101.ai" 
                  className="text-lg font-semibold text-gray-900 hover:text-uzhhorod transition-colors"
                >
                  sergii@mission101.ai
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-uzhhorod" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">{t('contact.location')}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {t('contact.locationValue')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-uzhhorod" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">{t('contact.coverage')}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {t('contact.coverageValue')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
            <p className="text-lg text-gray-600 mb-6">
              {t('contact.cta.text')}
            </p>
            <a 
              href="mailto:sergii@mission101.ai"
              className="inline-block px-8 py-4 bg-uzhhorod text-white font-semibold rounded-lg hover:bg-[#2d4e73] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t('contact.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
