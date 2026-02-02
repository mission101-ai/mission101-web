import { ArrowRight, Sparkles, Shield, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

export const HeroSection = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Interactive animated particle network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Particle system
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        } else {
          // Return to base position
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(58, 98, 145, 0.6)';
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(58, 98, 145, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/40">
      {/* Animated particle network canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      />

      {/* Enhanced gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-500" />
        
        {/* Floating accent elements */}
        <div className="absolute top-40 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-40 right-32 w-40 h-40 bg-indigo-200/30 rounded-full blur-2xl animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Trust badges with enhanced animations */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border-2 border-blue-200 text-uzhhorod rounded-full text-xs font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-uzhhorod transition-all duration-300 cursor-pointer group">
            <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{t('hero.badges.ukrainianCompany')}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border-2 border-blue-200 text-uzhhorod rounded-full text-xs font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-accent-teal transition-all duration-300 cursor-pointer group">
            <Award className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>{t('hero.badges.aiCertified')}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border-2 border-blue-200 text-uzhhorod rounded-full text-xs font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-uzhhorod transition-all duration-300 cursor-pointer group">
            <Sparkles className="w-4 h-4 group-hover:animate-pulse transition-transform" />
            <span>{t('hero.badges.enterpriseReady')}</span>
          </div>
        </div>

        <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-uzhhorod rounded-full text-sm font-medium shadow-sm border border-blue-200/50">
          <span>{t('hero.terminal')}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-[#3a6291] to-[#4a7ab0] bg-clip-text text-transparent">{t('hero.title')}</span>
          <br />
          <span className="text-[#3a6291]">{t('hero.titleHighlight')}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-200">
          {t('hero.tagline')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <button 
            onClick={scrollToContact}
            className="group relative px-10 py-5 bg-gradient-to-r from-[#3a6291] via-uzhhorod to-accent-teal text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:-translate-y-2 hover:scale-105 overflow-hidden btn-ripple animate-gradient-shift"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2d4e73] via-[#3a6291] to-[#0f9488] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">{t('hero.getStarted')}</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          <a 
            href="#services"
            className="group relative px-10 py-5 bg-white/95 backdrop-blur-sm border-2 border-uzhhorod text-uzhhorod font-bold text-lg rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 hover:border-accent-teal transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 overflow-hidden btn-ripple"
          >
            <span className="relative z-10">{t('hero.exploreServices')}</span>
          </a>
        </div>

        {/* Enhanced Stats with icons and better animations */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto animate-fade-in delay-500">
          <div className="text-center group cursor-pointer">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#3a6291] to-accent-teal bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{t('hero.stats.foundedValue')}</div>
              <div className="text-sm text-gray-600 mt-2 font-semibold">{t('hero.stats.founded')}</div>
            </div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-teal to-[#3a6291] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{t('hero.stats.supportValue')}</div>
              <div className="text-sm text-gray-600 mt-2 font-semibold">{t('hero.stats.support')}</div>
            </div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#3a6291] to-accent-teal bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{t('hero.stats.reachValue')}</div>
              <div className="text-sm text-gray-600 mt-2 font-semibold">{t('hero.stats.reach')}</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
