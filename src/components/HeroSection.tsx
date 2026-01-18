import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Target, TrendingUp } from "lucide-react";
import { useScrollAnimation, useAnimatedCounter } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const AnimatedStat = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
  const count = useAnimatedCounter(end, 2000, isVisible);
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
        {suffix === "$" ? `$${count}M+` : `${count}${suffix}`}
      </div>
      <span className="text-xs text-muted-foreground mt-1 block">{label}</span>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none noise-texture" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Enhanced Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 left-1/6 w-48 h-48 bg-primary/20 rounded-full blur-[80px] animate-float" />
      <div className="absolute top-1/3 right-1/6 w-32 h-32 bg-primary/25 rounded-full blur-[60px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in-up backdrop-blur-sm">
            <Zap className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">AI-Powered Creator Analysis</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Find Hidden </span>
            <span className="gradient-text glow-text">Revenue</span>
            <span className="text-foreground"> in Any Creator</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Paste any YouTube or Instagram profile and get an instant monetization blueprint with viral hooks, DM scripts, and revenue projections.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/auth">
              <Button variant="glow" size="xl" className="group">
                Analyze a Creator Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </div>

          {/* Enhanced Social Proof */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground mb-6">Trusted by operators closing high-ticket deals</p>
            
            {/* Animated Stats */}
            <div className="glass-card inline-flex items-center justify-center gap-8 md:gap-12 px-8 py-6 mb-8">
              <AnimatedStat end={2500} suffix="+" label="Creators Analyzed" />
              <div className="h-12 w-px bg-border" />
              <AnimatedStat end={5} suffix="$" label="Revenue Uncovered" />
              <div className="h-12 w-px bg-border" />
              <AnimatedStat end={89} suffix="%" label="Close Rate Boost" />
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 flex-wrap mt-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50">
                <Target className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">Instant Results</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">Revenue Focused</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
