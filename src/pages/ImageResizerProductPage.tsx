import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { UzhhorodNav } from '@/components/UzhhorodNav';
import { FooterSection } from '@/components/sections/FooterSection';
import { SEO } from '@/components/SEO';

const ImageResizerProductPage = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const langPrefix = currentLanguage === 'ua' ? 'ua' : 'en';
  const privacyPath = `/${langPrefix}/products/image-resizer/privacy-policy`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = t('products.imageResizer.features', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme">
      <SEO
        title={t('products.imageResizer.seo.title')}
        description={t('products.imageResizer.seo.description')}
        hreflangPath="products/image-resizer"
        applicationSchema={{ type: 'MobileApplication', name: 'Mission101 Image Resizer' }}
      />
      <UzhhorodNav />

      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-50/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <img
              src="/products/image-resizer/app-icon-512.png"
              alt={t('products.imageResizer.logoAlt')}
              width={112}
              height={112}
              className="w-24 h-24 md:w-28 md:h-28 rounded-[22%] shadow-lg ring-1 ring-black/5"
              data-testid="image-resizer-logo"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-uzhhorod mb-2">
                {t('products.imageResizer.name')}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a6291] leading-tight">
                {t('products.imageResizer.hero.title')}
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-uzhhorod font-semibold mb-6">
            {t('products.imageResizer.hero.subtitle')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('products.imageResizer.hero.description')}
          </p>

          <div className="mb-8" data-testid="image-resizer-store-links">
            <h2 className="text-lg font-semibold text-[#3a6291] mb-3">
              {t('products.imageResizer.storesTitle')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={t('products.imageResizer.appStoreHref')}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-black text-white px-5 py-3 font-semibold shadow-sm hover:bg-gray-900 transition-colors"
                data-testid="image-resizer-app-store-link"
                aria-label={t('products.imageResizer.appStoreLabel')}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                  <path d="M16.365 1.43c0 1.14-.423 2.2-1.19 3.02-.8.86-2.12 1.52-3.23 1.43-.14-1.1.42-2.25 1.16-3.05.8-.9 2.2-1.55 3.26-1.4zM20.5 17.3c-.58 1.3-.86 1.88-1.61 3.03-1.05 1.55-2.53 3.48-4.37 3.5-1.63.02-2.05-1.06-4.27-1.05-2.22.01-2.68 1.07-4.31 1.05-1.84-.03-3.25-1.77-4.3-3.32C-.2 17.3-.9 13.4.95 10.7c1.14-1.68 2.95-2.67 4.65-2.67 1.73 0 2.82 1.07 4.26 1.07 1.4 0 2.25-1.08 4.27-1.08 1.52 0 3.13.83 4.26 2.26-3.74 2.05-3.14 7.4 2.11 8.99z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wide opacity-80">
                    {t('products.imageResizer.appStoreLabel')}
                  </span>
                </span>
              </a>
              <a
                href={t('products.imageResizer.playStoreHref')}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-black text-white px-5 py-3 font-semibold shadow-sm hover:bg-gray-900 transition-colors"
                data-testid="image-resizer-play-store-link"
                aria-label={t('products.imageResizer.playStoreLabel')}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                  <path d="M3.6 1.8c-.4.2-.6.6-.6 1.1v18.2c0 .5.2.9.6 1.1l10.1-10.2L3.6 1.8zm12.1 7.1L5.2 2.5l9.4 9.4 1.1-3zm1.6 1.6-1.8 1 1.8 1 2.7-1.5c.6-.4.6-1.2 0-1.5l-2.7-1zm-2.7 3.1L5.2 21.5l10.5-6.4-1.1-3z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wide opacity-80">
                    {t('products.imageResizer.playStoreLabel')}
                  </span>
                </span>
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-600">{t('products.imageResizer.storesNote')}</p>
          </div>

          <Link
            to={privacyPath}
            className="inline-flex items-center text-uzhhorod font-semibold hover:underline"
            data-testid="image-resizer-privacy-link"
          >
            {t('products.imageResizer.privacyCta')}
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-[#3a6291] mb-8">
            {t('products.imageResizer.featuresTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {Array.isArray(features) &&
              features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-[#3a6291] mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-2xl bg-blue-50/60 border border-blue-100 p-8">
            <h2 className="text-2xl font-bold text-[#3a6291] mb-3">
              {t('products.imageResizer.supportTitle')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('products.imageResizer.supportBody')}{' '}
              <a
                href={`mailto:${t('products.imageResizer.supportEmail')}`}
                className="font-semibold text-uzhhorod hover:underline"
                data-testid="image-resizer-support-email"
              >
                {t('products.imageResizer.supportEmail')}
              </a>
            </p>
          </div>
        </div>
      </section>

      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default ImageResizerProductPage;
