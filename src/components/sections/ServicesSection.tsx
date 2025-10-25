import { ScrollTrigger } from '../ScrollTrigger';
import { Phone, BarChart3, Globe, Bot, Megaphone, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Phone,
    title: 'Voice Agents for Call Centers',
    description: 'AI-powered conversational agents that handle customer inquiries with natural language understanding, reducing wait times and operational costs while maintaining high service quality.',
  },
  {
    icon: BarChart3,
    title: 'Call Center Monitoring & Analytics',
    description: 'Real-time quality assurance and performance analytics system that tracks key metrics, identifies improvement opportunities, and ensures consistent service excellence across all interactions.',
  },
  {
    icon: Globe,
    title: 'AI-Generated Business Websites',
    description: 'Custom business websites created with advanced AI technology, featuring responsive design, SEO optimization, and modern user experience tailored to your brand and business goals.',
  },
  {
    icon: Bot,
    title: 'Personal AI Assistants',
    description: 'Intelligent virtual assistants for productivity and task management that automate scheduling, email management, data organization, and routine workflows to maximize efficiency.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Automation',
    description: 'AI-driven campaign management and optimization platform that automates content creation, audience targeting, performance tracking, and multi-channel marketing execution.',
  },
  {
    icon: Sparkles,
    title: 'Custom AI Solutions',
    description: 'Bespoke artificial intelligence solutions tailored to your unique business challenges, from predictive analytics to process automation and beyond.',
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-32 px-6 bg-bg-secondary relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">{'>'}</span> Our Services
          </h2>
          <p className="text-xl text-muted-foreground font-mono">
            Enterprise-grade AI solutions for modern businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollTrigger key={index}>
                <div className="bg-background border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 group h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-mono group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollTrigger>
            );
          })}
        </div>
      </div>
    </section>
  );
};
