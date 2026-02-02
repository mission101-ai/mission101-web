import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

export const FounderSection = () => {
  const { t } = useTranslation();

  return (
    <section id="founder" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3a6291] mb-6">
            {t('founder.title')}
          </h2>
        </div>

        <ScrollTrigger>
          <div className="bg-gradient-to-br from-white to-blue-50/30 border-2 border-gray-200 rounded-3xl p-10 md:p-14 shadow-2xl max-w-6xl mx-auto hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30 -z-10" />
            
            <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-64 h-64 rounded-2xl border-4 border-white overflow-hidden shadow-2xl ring-4 ring-uzhhorod/20 transform hover:scale-105 transition-transform duration-300">
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
                  <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#3a6291] to-accent-teal bg-clip-text text-transparent mb-3">{t('founder.name')}</h3>
                  <p className="text-uzhhorod text-xl font-semibold mb-4">{t('founder.role')}</p>
                  <p className="text-2xl text-gray-700 font-medium mb-8 italic">{t('founder.tagline')}</p>
                  
                  <ul className="space-y-4 mb-10">
                    {(t('founder.bio', { returnObjects: true }) as string[]).map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-uzhhorod to-accent-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="mailto:sergii@mission101.ai"
                      className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-uzhhorod to-accent-teal text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2d4e73] to-[#0f9488] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Mail className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">{t('founder.email')}</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/sergiiilliukhin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-uzhhorod text-uzhhorod font-semibold rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 hover:border-accent-teal transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
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
