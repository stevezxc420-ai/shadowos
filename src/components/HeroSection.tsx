import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in-up">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">The Shadow Agency Platform</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Operate from the </span>
            <span className="gradient-text glow-text">Shadows</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The all-in-one operating system for shadow operators who scale creator businesses behind the scenes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="glow" size="xl" className="group">
              Start Operating
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground mb-4">Trusted by elite operators worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-50">
              <div className="text-2xl font-display font-bold text-muted-foreground">500+</div>
              <div className="h-8 w-px bg-border" />
              <div className="text-2xl font-display font-bold text-muted-foreground">$10M+</div>
              <div className="h-8 w-px bg-border" />
              <div className="text-2xl font-display font-bold text-muted-foreground">50K+</div>
            </div>
            <div className="flex items-center justify-center gap-8 mt-1">
              <span className="text-xs text-muted-foreground">Operators</span>
              <div className="w-px opacity-0">|</div>
              <span className="text-xs text-muted-foreground">Revenue Managed</span>
              <div className="w-px opacity-0">|</div>
              <span className="text-xs text-muted-foreground">Creators Scaled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
