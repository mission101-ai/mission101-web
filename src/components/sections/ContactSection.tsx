import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { trackContactClick } from '@/lib/tracking';

export const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-teal-50/30 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3a6291] mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-uzhhorod/20 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t('contact.phone')}</p>
                <a 
                  href="tel:+380974825097"
                  onClick={() => trackContactClick('phone', 'tel:+380974825097')}
                  className="text-xl font-bold text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-uzhhorod hover:to-accent-teal hover:bg-clip-text transition-all duration-300"
                >
                  +38-097-48-25-097
                </a>
              </div>
            </div>

            <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-accent-teal/20 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t('contact.email')}</p>
                <a 
                  href="mailto:sergii@mission101.ai"
                  onClick={() => trackContactClick('email', 'mailto:sergii@mission101.ai')}
                  className="text-xl font-bold text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-uzhhorod hover:to-accent-teal hover:bg-clip-text transition-all duration-300 break-all"
                >
                  sergii@mission101.ai
                </a>
              </div>
            </div>

            <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-500/20 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t('contact.location')}</p>
                <p className="text-xl font-bold text-gray-900">
                  {t('contact.locationValue')}
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-emerald-500/20 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t('contact.coverage')}</p>
                <p className="text-xl font-bold text-gray-900">
                  {t('contact.coverageValue')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-white to-blue-50/50 p-12 rounded-3xl shadow-2xl border-2 border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full blur-3xl opacity-30 -z-10" />
            <div className="relative z-10">
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('contact.cta.text')}
              </p>
              <a 
                href="mailto:sergii@mission101.ai"
                onClick={() => trackContactClick('email', 'mailto:sergii@mission101.ai')}
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-uzhhorod to-accent-teal text-white font-bold text-lg rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 btn-ripple animate-gradient-shift"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2d4e73] to-[#0f9488] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{t('contact.cta.button')}</span>
                <svg className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
