import { Link2, Sparkles, FileText, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Paste the URL",
    description: "Drop any YouTube channel or Instagram profile link. We support all major creator platforms.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "AI Analyzes",
    description: "Our AI scans their content, audience, and monetization gaps in under 60 seconds.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Get Your Blueprint",
    description: "Receive viral hooks, DM scripts, revenue projections, and a professional pitch deck.",
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  
  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Step number badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 z-10">
        <span className="text-xs font-bold text-primary">{step.step}</span>
      </div>

      {/* Icon container with animation */}
      <div className={`relative mb-6 mt-4 group ${isVisible ? "animate-pulse-glow" : ""}`}>
        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/60 transition-all duration-500">
          <step.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
        
        {/* Floating particles */}
        <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary/40 ${isVisible ? "animate-float" : ""}`} style={{ animationDelay: `${index * 0.3}s` }} />
        <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary/30 ${isVisible ? "animate-float" : ""}`} style={{ animationDelay: `${index * 0.3 + 0.5}s` }} />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
        {step.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed max-w-xs">
        {step.description}
      </p>

      {/* Connector arrow (not on last item) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:flex absolute top-1/2 -right-8 transform -translate-y-1/2 translate-x-full">
          <ArrowRight className={`h-6 w-6 text-primary/40 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ transitionDelay: `${index * 200 + 400}ms` }} />
        </div>
      )}
    </div>
  );
};

const HowItWorksSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">Simple 3-step process</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From URL to pitch-ready blueprint in under 60 seconds
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        {/* Bottom connector line (desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[60%] max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" style={{ marginTop: "2rem" }} />
      </div>
    </section>
  );
};

export default HowItWorksSection;