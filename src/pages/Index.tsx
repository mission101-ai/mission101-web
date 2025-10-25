import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SEO } from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO />
      <LanguageSwitcher />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FounderSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
