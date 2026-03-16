import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';
import { UzhhorodNav } from '@/components/UzhhorodNav';
import { EventHero } from '@/components/sections/EventHero';
import { EventDetails } from '@/components/sections/EventDetails';
import { EventCTA } from '@/components/sections/EventCTA';
import { FooterSection } from '@/components/sections/FooterSection';
import { SEO } from '@/components/SEO';

const EVENT_SLUGS = ['uzhhorod-2026-03-18'] as const;

const EventDetailPage = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const eventIndex = eventSlug ? EVENT_SLUGS.indexOf(eventSlug as (typeof EVENT_SLUGS)[number]) : -1;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (eventSlug && eventIndex === -1) {
      navigate('/404', { replace: true });
    }
  }, [eventSlug, eventIndex, navigate]);

  if (eventIndex === -1) {
    return null;
  }

  const slug = EVENT_SLUGS[eventIndex];
  const slugSeoTitleKey = `events.${slug}.seo.title`;
  const slugSeoDescKey = `events.${slug}.seo.description`;
  const seoTitle = t(slugSeoTitleKey) !== slugSeoTitleKey ? t(slugSeoTitleKey) : t('events.seo.title');
  const seoDescription = t(slugSeoDescKey) !== slugSeoDescKey ? t(slugSeoDescKey) : t('events.seo.description');

  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme">
      <SEO
        title={seoTitle}
        description={seoDescription}
        isLocalPage={true}
      />
      <UzhhorodNav />
      <EventHero eventSlug={slug} />
      <EventDetails eventSlug={slug} />
      <EventCTA eventSlug={slug} />
      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default EventDetailPage;
