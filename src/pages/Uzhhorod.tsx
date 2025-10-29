import { UzhhorodNav } from '@/components/UzhhorodNav';
import { UzhhorodHero } from '@/components/sections/UzhhorodHero';
import { UzhhorodLocalAdvantages } from '@/components/sections/UzhhorodLocalAdvantages';
import { UzhhorodServices } from '@/components/sections/UzhhorodServices';
import { UzhhorodCTA } from '@/components/sections/UzhhorodCTA';
import { UzhhorodContacts } from '@/components/sections/UzhhorodContacts';
import { FooterSection } from '@/components/sections/FooterSection';
import { SEO } from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Uzhhorod = () => {
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden light-theme">
      <SEO 
        title={t('uzhhorod.seo.title')}
        description={t('uzhhorod.seo.description')}
        isLocalPage={true}
      />
      <UzhhorodNav />
      <UzhhorodHero />
      <UzhhorodLocalAdvantages />
      <UzhhorodServices />
      <UzhhorodCTA />
      <UzhhorodContacts />
      <FooterSection />
    </div>
  );
};

export default Uzhhorod;

