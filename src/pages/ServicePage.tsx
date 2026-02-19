import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';
import { UzhhorodNav } from '@/components/UzhhorodNav';
import { ServiceHero } from '@/components/sections/ServiceHero';
import { ServiceDetails } from '@/components/sections/ServiceDetails';
import { ServiceCTA } from '@/components/sections/ServiceCTA';
import { FooterSection } from '@/components/sections/FooterSection';
import { SEO } from '@/components/SEO';

const SERVICE_SLUGS = [
  'voice-agents',
  'ai-assistants',
  'custom-ai-solutions',
  'marketing-automation',
  'ai-websites',
  'business-analytics',
] as const;

const ServicePage = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const serviceIndex = serviceSlug ? SERVICE_SLUGS.indexOf(serviceSlug as (typeof SERVICE_SLUGS)[number]) : -1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (serviceSlug && serviceIndex === -1) {
      navigate('/404', { replace: true });
    }
  }, [serviceSlug, serviceIndex, navigate]);

  if (serviceIndex === -1) {
    return null;
  }

  const slug = SERVICE_SLUGS[serviceIndex];
  const seoTitle = t(`servicePages.${slug}.seo.title`);
  const seoDescription = t(`servicePages.${slug}.seo.description`);

  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme">
      <SEO
        title={seoTitle}
        description={seoDescription}
        isServicePage={true}
        serviceSlug={serviceSlug}
      />
      <UzhhorodNav />
      <ServiceHero serviceSlug={slug} />
      <ServiceDetails serviceSlug={slug} />
      <ServiceCTA />
      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default ServicePage;
