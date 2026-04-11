import { UzhhorodNav } from '@/components/UzhhorodNav';
import { UzhhorodHero } from '@/components/sections/UzhhorodHero';
import { UzhhorodFounder } from '@/components/sections/UzhhorodFounder';
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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme">
      <SEO 
        title={t('uzhhorod.seo.title')}
        description={t('uzhhorod.seo.description')}
        isLocalPage={true}
      />
      <UzhhorodNav />
      <UzhhorodHero />
      <UzhhorodFounder />
      <UzhhorodLocalAdvantages />
      <UzhhorodServices />
      <UzhhorodCTA />
      <UzhhorodContacts />
      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default Uzhhorod;

