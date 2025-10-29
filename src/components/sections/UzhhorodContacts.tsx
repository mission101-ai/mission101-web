import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UzhhorodContacts = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: Phone,
      label: 'uzhhorod.contacts.phone',
      value: '+38-097-48-25-097',
      valueKey: null,
      href: 'tel:+380974825097',
    },
    {
      icon: Mail,
      label: 'uzhhorod.contacts.email',
      value: 'sergii@mission101.ai',
      valueKey: null,
      href: 'mailto:sergii@mission101.ai',
    },
    {
      icon: MapPin,
      label: 'uzhhorod.contacts.address',
      value: null,
      valueKey: 'uzhhorod.contacts.address_value',
      href: 'https://maps.google.com/?q=Uzhhorod,Ukraine',
    },
    {
      icon: Clock,
      label: 'uzhhorod.contacts.hours',
      value: null,
      valueKey: 'uzhhorod.contacts.hours_value',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('uzhhorod.contacts.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('uzhhorod.contacts.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('uzhhorod.contacts.info_title')}
              </h3>
              
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                const label = t(item.label);
                const displayValue = item.valueKey ? t(item.valueKey) : item.value;
                
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors"
                        >
                          {displayValue}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">{displayValue}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('uzhhorod.contacts.cta_title')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('uzhhorod.contacts.cta_description')}
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">
                      {t(`uzhhorod.contacts.features.${index}`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+380974825097"
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                >
                  {t('uzhhorod.contacts.call_button')}
                </a>
                <a
                  href="mailto:sergii@mission101.ai"
                  className="flex-1 px-6 py-3 bg-white border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300 text-center"
                >
                  {t('uzhhorod.contacts.email_button')}
                </a>
              </div>

              <p className="mt-4 text-sm text-gray-500 text-center">
                {t('uzhhorod.contacts.response_time')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

