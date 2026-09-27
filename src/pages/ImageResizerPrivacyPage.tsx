import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { UzhhorodNav } from '@/components/UzhhorodNav';
import { FooterSection } from '@/components/sections/FooterSection';
import { SEO } from '@/components/SEO';

const ImageResizerPrivacyPage = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const langPrefix = currentLanguage === 'ua' ? 'ua' : 'en';
  const productPath = `/${langPrefix}/products/image-resizer`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = t('products.imageResizer.privacy.sections', { returnObjects: true }) as Array<{
    heading: string;
    body: string;
  }>;

  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme">
      <SEO
        title={t('products.imageResizer.privacy.seo.title')}
        description={t('products.imageResizer.privacy.seo.description')}
        productHreflangPath="products/image-resizer/privacy-policy"
      />
      <UzhhorodNav />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            to={productPath}
            className="inline-flex text-sm font-semibold text-uzhhorod hover:underline mb-6"
            data-testid="image-resizer-product-link"
          >
            {t('products.imageResizer.name')}
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-[#3a6291] leading-tight mb-3">
            {t('products.imageResizer.privacy.title')}
          </h1>
          <p className="text-lg font-semibold text-uzhhorod mb-2">
            {t('products.imageResizer.privacy.productName')}
          </p>
          <p className="text-sm text-gray-600 mb-8" data-testid="image-resizer-privacy-effective-date">
            {t('products.imageResizer.privacy.effectiveDateLabel')}:{' '}
            {t('products.imageResizer.privacy.effectiveDate')}
          </p>

          <p className="text-gray-700 leading-relaxed mb-10" data-testid="image-resizer-privacy-intro">
            {t('products.imageResizer.privacy.intro')}
          </p>

          <div className="space-y-8">
            {Array.isArray(sections) &&
              sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-bold text-[#3a6291] mb-3">{section.heading}</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.body}</p>
                </section>
              ))}
          </div>

          <p className="mt-12 text-gray-700" data-testid="image-resizer-privacy-contact">
            <span className="font-semibold">{t('products.imageResizer.supportTitle')}: </span>
            <a
              href={`mailto:${t('products.imageResizer.supportEmail')}`}
              className="text-uzhhorod font-semibold hover:underline"
            >
              {t('products.imageResizer.supportEmail')}
            </a>
          </p>
        </div>
      </section>

      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default ImageResizerPrivacyPage;
