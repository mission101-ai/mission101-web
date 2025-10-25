import { useState } from 'react';
import { ScrollTrigger } from '../ScrollTrigger';
import { TypewriterText } from '../TypewriterText';
import { Linkedin, Mail } from 'lucide-react';

export const FounderSection = () => {
  const [showBio, setShowBio] = useState(false);

  return (
    <section id="founder" className="py-32 px-6 bg-bg-secondary relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">{'>'}</span> Leadership
          </h2>
        </div>

        <ScrollTrigger onEnterViewport={() => setShowBio(true)}>
          <div className="bg-background border border-border rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg border-2 border-accent/30 flex items-center justify-center">
                  <div className="text-6xl font-bold text-accent font-mono">SI</div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold mb-2">Sergii Illiukhin</h3>
                  <p className="text-accent font-mono text-lg mb-4">Founder & CEO</p>
                  
                  <div className="flex gap-4 mb-6">
                    <a 
                      href="https://www.linkedin.com/in/sergiiilliukhin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-md transition-all duration-300 group"
                    >
                      <Linkedin className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm group-hover:text-accent transition-colors">LinkedIn</span>
                    </a>
                    <a 
                      href="mailto:sergii@mission101.ai"
                      className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-md transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm group-hover:text-accent transition-colors">Email</span>
                    </a>
                  </div>
                </div>

                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {showBio && (
                    <TypewriterText 
                      text="Sergii Illiukhin founded mission101.ai in 2025 with a vision to make enterprise-grade AI accessible to businesses of all sizes. With extensive experience in artificial intelligence, automation, and business optimization, Sergii leads the mission to bridge the gap between cutting-edge technology and practical business solutions. Under his leadership, mission101.ai has helped numerous organizations worldwide streamline operations, reduce costs, and unlock new growth opportunities through intelligent automation."
                      speed={15}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
