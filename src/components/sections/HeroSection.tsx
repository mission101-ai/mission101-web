import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 border border-accent/20 rounded-lg rotate-12 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-accent/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-accent/15 rotate-45 animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary border border-border rounded-full">
          <span className="font-mono text-sm text-accent">$ mission101.ai --init</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="text-gradient">Intelligent Automation</span>
          <br />
          <span className="text-foreground">for Modern Business</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-mono animate-fade-in-up delay-200">
          Streamline operations • Enhance productivity • Drive cost reduction
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <button 
            onClick={scrollToContact}
            className="group px-8 py-4 bg-accent text-accent-foreground font-mono font-semibold rounded-md hover:bg-accent/90 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href="#services"
            className="px-8 py-4 bg-secondary border border-border text-foreground font-mono font-semibold rounded-md hover:bg-secondary/80 transition-all duration-300"
          >
            Explore Services
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in delay-500">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent font-mono">2025</div>
            <div className="text-sm text-muted-foreground mt-1">Founded</div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-3xl font-bold text-accent font-mono">24/7</div>
            <div className="text-sm text-muted-foreground mt-1">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent font-mono">Global</div>
            <div className="text-sm text-muted-foreground mt-1">Reach</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
