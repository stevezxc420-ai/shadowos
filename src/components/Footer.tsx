import { Ghost, Twitter, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-border/50 bg-slate-deep relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Ghost className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-lg font-bold">
                Shadow<span className="text-primary">OS</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              The operating system for shadow operators. Scale creator businesses from the shadows with our all-in-one platform.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="font-display font-semibold mb-3 text-foreground text-sm">Stay in the shadows</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <Button type="submit" variant="glow" size="sm" className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {isSubscribed && (
                <p className="text-xs text-primary mt-2 animate-fade-in-up">Thanks for subscribing!</p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 border border-border hover:bg-primary/10 hover:border-primary/50 transition-all group">
                <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 border border-border hover:bg-primary/10 hover:border-primary/50 transition-all group">
                <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 border border-border hover:bg-primary/10 hover:border-primary/50 transition-all group">
                <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Changelog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 ShadowOS. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for <span className="text-primary font-medium">Shadow Operators</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
