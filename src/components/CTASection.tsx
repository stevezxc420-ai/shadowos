import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
            Ready to close your next{" "}
            <span className="text-primary">creator deal</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop guessing. Start closing. Analyze any creator and get the insights you need to pitch with confidence.
          </p>
          <Link to="/auth">
            <Button variant="glow" size="xl" className="group">
              Analyze Your First Creator
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            3 free analyses • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
