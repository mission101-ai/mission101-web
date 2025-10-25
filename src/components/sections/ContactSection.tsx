import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">{'>'}</span> {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground font-mono">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="terminal">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold mb-1 text-accent">{t('contact.phone')}</h3>
                  <a 
                    href="tel:+380974825097" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +38-097-48-25-097
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold mb-1 text-accent">{t('contact.email')}</h3>
                  <a 
                    href="mailto:sergii@mission101.ai" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    sergii@mission101.ai
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold mb-1 text-accent">{t('contact.location')}</h3>
                  <p className="text-muted-foreground">
                    {t('contact.locationValue')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold mb-1 text-accent">{t('contact.coverage')}</h3>
                  <p className="text-muted-foreground">
                    {t('contact.coverageValue')}
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal-style info box */}
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">{t('contact.terminal.path')}</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="text-muted-foreground">
                  <span className="text-accent">$</span> {t('contact.terminal.command')}
                </div>
                <div className="text-muted-foreground pl-4">
                  {'{'}
                </div>
                <div className="text-muted-foreground pl-8">
                  "status": <span className="text-green-500">"{t('contact.terminal.status')}"</span>,
                </div>
                <div className="text-muted-foreground pl-8">
                  "response_time": <span className="text-accent">"{t('contact.terminal.responseTime')}"</span>,
                </div>
                <div className="text-muted-foreground pl-8">
                  "availability": <span className="text-accent">"{t('contact.terminal.availability')}"</span>
                </div>
                <div className="text-muted-foreground pl-4">
                  {'}'}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-lg text-muted-foreground mb-6 font-mono">
              {t('contact.cta.text')}
            </p>
            <a 
              href="mailto:sergii@mission101.ai"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground font-mono font-semibold rounded-md hover:bg-accent/90 transition-all duration-300"
            >
              {t('contact.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
