import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { UzhhorodNav } from '@/components/UzhhorodNav';
import { SEO } from '@/components/SEO';
import { WaveDivider } from '@/components/WaveDivider';

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme">
      <SEO />
      <UzhhorodNav />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FounderSection />
      <ContactSection />
      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default Index;
