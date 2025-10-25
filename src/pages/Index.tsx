import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LanguageSwitcher />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <FounderSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
