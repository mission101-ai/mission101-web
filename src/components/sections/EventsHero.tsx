import { useTranslation } from 'react-i18next';

export const EventsHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-50/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a6291] leading-tight">
            {t('events.hero.title')}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-uzhhorod font-semibold">
            {t('events.hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};
