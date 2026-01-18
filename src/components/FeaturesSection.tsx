import { Sparkles, DollarSign, MessageCircle, FileText, Target, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Sparkles,
    title: "AI Content Analysis",
    description: "Instantly scan any creator's content to identify monetization gaps and untapped revenue streams.",
  },
  {
    icon: DollarSign,
    title: "Revenue Projections",
    description: "Get accurate revenue estimates with interactive calculators to show creators their earning potential.",
  },
  {
    icon: MessageCircle,
    title: "Ready-to-Send DM Scripts",
    description: "One-click copy scripts crafted to convert creators into high-paying clients.",
  },
  {
    icon: Target,
    title: "Viral Hook Generator",
    description: "AI-generated hooks and pre-launch teasers tailored to the creator's niche and audience.",
  },
  {
    icon: FileText,
    title: "Professional Pitch Decks",
    description: "Export beautiful 5-page PDFs summarizing the opportunity to share with creators.",
  },
  {
    icon: Zap,
    title: "Competitor Gap Analysis",
    description: "Identify strategic advantages by analyzing what competitors in the niche are missing.",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div
      ref={ref}
      className={`glass-card p-6 group hover:border-primary/50 transition-all duration-500 glow-border hover:shadow-primary/20 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transitionProperty: "opacity, transform, border-color, box-shadow"
      }}
    >
      <div className="relative">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <feature.icon className="h-6 w-6 text-primary" />
        </div>

        {/* Content */}
        <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 -m-6 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-medium/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your Secret Weapon for{" "}
            <span className="text-primary">Closing Deals</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to identify, pitch, and close creator clients with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
