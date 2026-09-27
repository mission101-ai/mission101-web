import { CheckCircle2, Zap, Target, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ServiceDetailsProps {
  serviceSlug: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export const ServiceDetails = ({ serviceSlug }: ServiceDetailsProps) => {
  const { t } = useTranslation();

  const icons = [CheckCircle2, Zap, Target, BarChart3];

  const audience = t(`servicePages.${serviceSlug}.audience`, { defaultValue: '' });
  const faqItems = t(`servicePages.${serviceSlug}.faq`, { returnObjects: true, defaultValue: [] }) as FaqItem[];
  const hasFaq = Array.isArray(faqItems) && faqItems.length > 0;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Description */}
          <div className="mb-16">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t(`servicePages.${serviceSlug}.description`)}
            </p>
          </div>

          {/* Who it's for */}
          {audience && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#3a6291] mb-4">
                {t('servicePages.audienceTitle')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {audience}
              </p>
            </div>
          )}

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3a6291] mb-8">
              {t('services.subtitle')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={index}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#3a6291] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-uzhhorod group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {t(`servicePages.${serviceSlug}.features.${index}`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ / objections */}
          {hasFaq && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3a6291] mb-8">
                {t('servicePages.faqTitle')}
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-bold text-[#3a6291] mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
