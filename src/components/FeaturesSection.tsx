import { BarChart3, Users, Wallet, Calendar, MessageSquare, Shield } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description: "Track every revenue stream across multiple creators. Real-time dashboards that reveal growth opportunities.",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Manage your entire roster of creators from one place. Streamlined communication and task tracking.",
  },
  {
    icon: Wallet,
    title: "Payment Automation",
    description: "Automate invoicing, revenue splits, and payouts. Never chase payments again.",
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    description: "Plan and schedule content across all platforms. Coordinate launches and campaigns effortlessly.",
  },
  {
    icon: MessageSquare,
    title: "Team Collaboration",
    description: "Built-in chat, file sharing, and project management for your shadow agency team.",
  },
  {
    icon: Shield,
    title: "Contract Vault",
    description: "Secure storage for contracts, NDAs, and sensitive documents. Full audit trail included.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-medium/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-primary">operate</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete toolkit designed for shadow operators who demand excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 glow-border hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
