import { useState } from 'react';
import { ScrollTrigger } from '../ScrollTrigger';
import { TypewriterText } from '../TypewriterText';
import { Phone, BarChart3, Globe, Bot, Megaphone, Wallet } from 'lucide-react';

const projects = [
  {
    icon: Phone,
    title: 'Voice Agents for Call Centres',
    category: 'Voice AI',
    description: 'AI-powered conversational agents handling customer inquiries with natural language understanding, reducing wait times by 60% and operational costs by 40% while maintaining 95%+ customer satisfaction.',
  },
  {
    icon: BarChart3,
    title: 'Call Center Monitoring Systems',
    category: 'Analytics',
    description: 'Real-time analytics and quality assurance automation that monitors 100% of interactions, identifies training opportunities, and maintains consistent service excellence across distributed teams.',
  },
  {
    icon: Globe,
    title: 'AI Generated Websites',
    category: 'Web Development',
    description: 'Custom business websites created with AI technology, featuring responsive design, SEO optimization, and modern UX. Delivered in days instead of weeks with ongoing AI-powered content updates.',
  },
  {
    icon: Bot,
    title: 'Personal AI Assistants',
    category: 'Productivity',
    description: 'Intelligent assistants for productivity and task management that automate scheduling, email triage, document processing, and routine workflows, saving 15+ hours per week.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Automation',
    category: 'Marketing',
    description: 'AI-driven campaign management and optimization that automates content creation, audience segmentation, A/B testing, and multi-channel execution, increasing ROI by 3x.',
  },
  {
    icon: Wallet,
    title: 'AI-Powered Budget Management',
    category: 'FinTech',
    description: 'Intelligent financial tracking system that automates expense categorization, provides predictive insights, detects anomalies, and optimizes spending patterns for better financial health.',
  },
];

export const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">{'>'}</span> Case Studies
          </h2>
          <p className="text-xl text-muted-foreground font-mono">
            Real-world implementations driving measurable results
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <ScrollTrigger 
                key={index}
                onEnterViewport={() => setActiveProject(index)}
              >
                <div className="terminal group hover:border-l-accent transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold font-mono group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-mono rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <div className="text-muted-foreground leading-relaxed">
                        {activeProject === index ? (
                          <TypewriterText 
                            text={project.description}
                            speed={15}
                          />
                        ) : (
                          <p className="opacity-0">{project.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollTrigger>
            );
          })}
        </div>
      </div>
    </section>
  );
};
