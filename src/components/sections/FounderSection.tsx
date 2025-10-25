import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

export const FounderSection = () => {
  const { t } = useTranslation();

  return (
    <section id="founder" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">{'>'}</span> {t('founder.title')}
          </h2>
        </div>

        <ScrollTrigger>
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
                  <h3 className="text-3xl font-bold mb-2">{t('founder.name')}</h3>
                  <p className="text-accent font-mono text-lg mb-4">{t('founder.role')}</p>
                  
                  <div className="flex gap-4 mb-6">
                    <a 
                      href="https://www.linkedin.com/in/sergiiilliukhin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-md transition-all duration-300 group"
                    >
                      <Linkedin className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm group-hover:text-accent transition-colors">{t('founder.linkedin')}</span>
                    </a>
                    <a 
                      href="mailto:sergii@mission101.ai"
                      className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-md transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm group-hover:text-accent transition-colors">{t('founder.email')}</span>
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {t('founder.bio')}
                </p>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
