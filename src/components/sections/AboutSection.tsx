import { useState } from 'react';
import { ScrollTrigger } from '../ScrollTrigger';
import { TypewriterText } from '../TypewriterText';
import { Target, Zap, TrendingDown } from 'lucide-react';

export const AboutSection = () => {
  const [showTypewriter1, setShowTypewriter1] = useState(false);
  const [showTypewriter2, setShowTypewriter2] = useState(false);
  const [showTypewriter3, setShowTypewriter3] = useState(false);

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollTrigger onEnterViewport={() => setShowTypewriter1(true)}>
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
              <span className="text-accent">{'>'}</span> About mission101.ai
            </h2>
            <div className="code-block text-lg text-foreground leading-relaxed">
              <p className="mb-4">
                Founded in 2025 and based in Uzhhorod, Ukraine, we serve clients worldwide with cutting-edge AI automation solutions.
              </p>
              {showTypewriter1 && (
                <TypewriterText 
                  text="Our expertise spans process automation, performance optimization, and operational cost reduction. We bridge the gap between cutting-edge AI technology and real-world business challenges by delivering tailored automation solutions that streamline operations, enhance productivity, and drive measurable results."
                  speed={20}
                  className="text-muted-foreground"
                  onComplete={() => setShowTypewriter2(true)}
                />
              )}
            </div>
          </div>
        </ScrollTrigger>

        <ScrollTrigger>
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Goal */}
            <div className="terminal">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold text-accent">Our Goal</h3>
              </div>
              {showTypewriter2 && (
                <TypewriterText 
                  text="To empower businesses worldwide to unlock their full potential through intelligent automation and AI-driven optimization, making enterprise-grade artificial intelligence accessible and practical for companies of all sizes."
                  speed={20}
                  className="text-muted-foreground"
                  onComplete={() => setShowTypewriter3(true)}
                />
              )}
            </div>

            {/* Mission */}
            <div className="terminal">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold text-accent">Our Mission</h3>
              </div>
              {showTypewriter3 && (
                <TypewriterText 
                  text="To bridge the gap between cutting-edge AI technology and real-world business challenges by delivering tailored automation solutions that streamline operations, enhance productivity, and drive measurable cost reduction."
                  speed={20}
                  className="text-muted-foreground"
                />
              )}
            </div>
          </div>
        </ScrollTrigger>

        {/* Key Focus Areas */}
        <ScrollTrigger>
          <div className="bg-secondary border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-8 font-mono text-center">
              <span className="text-accent">Focus Areas</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-mono font-semibold mb-2">Process Automation</h4>
                <p className="text-sm text-muted-foreground">Automate repetitive tasks and workflows</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-mono font-semibold mb-2">Performance Optimization</h4>
                <p className="text-sm text-muted-foreground">Enhance productivity and efficiency</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-mono font-semibold mb-2">Cost Reduction</h4>
                <p className="text-sm text-muted-foreground">Deliver measurable ROI and savings</p>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};
