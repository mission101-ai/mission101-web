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
                <div className="w-48 h-48 rounded-lg border-2 border-uzhhorod/30 overflow-hidden">
                  <img 
                    src="/sergii-illiukhin.jpg" 
                    alt={t('founder.name')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold mb-2">{t('founder.name')}</h3>
                  <p className="text-uzhhorod text-lg mb-4">{t('founder.role')}</p>
                  
                  <div className="flex gap-4 mb-6">
                    <a 
                      href="https://www.linkedin.com/in/sergiiilliukhin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-uzhhorod/10 border border-uzhhorod/30 rounded-md transition-all duration-300 group"
                    >
                      <Linkedin className="w-5 h-5 text-uzhhorod" />
                      <span className="text-sm group-hover:text-uzhhorod transition-colors">{t('founder.linkedin')}</span>
                    </a>
                    <a 
                      href="mailto:sergii@mission101.ai"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-uzhhorod/10 border border-uzhhorod/30 rounded-md transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 text-uzhhorod" />
                      <span className="text-sm group-hover:text-uzhhorod transition-colors">{t('founder.email')}</span>
                    </a>
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed">
                  {(t('founder.bio', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
