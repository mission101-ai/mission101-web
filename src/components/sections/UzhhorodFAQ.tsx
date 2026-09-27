import { useTranslation } from 'react-i18next';

interface FaqItem {
  question: string;
  answer: string;
}

export const UzhhorodFAQ = () => {
  const { t } = useTranslation();

  const items = t('uzhhorod.faq.items', { returnObjects: true, defaultValue: [] }) as FaqItem[];

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3a6291] mb-4">
              {t('uzhhorod.faq.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('uzhhorod.faq.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {items.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h3 className="text-xl font-bold text-[#3a6291] mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
