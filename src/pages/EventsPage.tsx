import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { UzhhorodNav } from '@/components/UzhhorodNav';
import { EventsHero } from '@/components/sections/EventsHero';
import { EventsList } from '@/components/sections/EventsList';
import { FooterSection } from '@/components/sections/FooterSection';
import { SEO } from '@/components/SEO';

const EventsPage = () => {
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme">
      <SEO
        title={t('events.seo.title')}
        description={t('events.seo.description')}
        isLocalPage={true}
      />
      <UzhhorodNav />
      <EventsHero />
      <EventsList />
      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default EventsPage;
