import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card max-w-4xl mx-auto p-12 md:p-16 text-center glow-border">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Ready to operate from the{" "}
            <span className="text-primary">shadows</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join elite shadow operators who are scaling creator businesses and earning while staying behind the scenes.
          </p>
          <Button variant="glow" size="xl" className="group">
            Start Your Free Trial
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
