import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

export const FounderSection = () => {
  const { t } = useTranslation();

  return (
    <section id="founder" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-4">
            {t('founder.title')}
          </h2>
        </div>

        <ScrollTrigger>
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-56 h-56 rounded-lg border-2 border-uzhhorod/30 overflow-hidden shadow-lg">
                  <img 
                    src="/sergii-illiukhin.jpg" 
                    alt={t('founder.name')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('founder.name')}</h3>
                  <p className="text-uzhhorod text-lg font-semibold mb-3">{t('founder.role')}</p>
                  <p className="text-xl text-gray-700 font-medium mb-6">{t('founder.tagline')}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {(t('founder.bio', { returnObjects: true }) as string[]).map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-uzhhorod mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="mailto:sergii@mission101.ai"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-uzhhorod text-white font-semibold rounded-lg hover:bg-[#2d4e73] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{t('founder.email')}</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/sergiiilliukhin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-uzhhorod text-uzhhorod font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>{t('founder.linkedin')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
