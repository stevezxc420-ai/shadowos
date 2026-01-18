import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ghost, LogOut, Coins, Loader2, Sparkles, FileText, Eye, EyeOff, Youtube, Instagram, Zap, ArrowRight, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ReportView from "@/components/ReportView";

const DEMO_DATA = {
  email: "demo@example.com",
  credits: 150,
  url: "https://youtube.com/watch?v=example",
};

interface ReportData {
  creator_analysis: {
    niche: string;
    audience_vibe: string;
    unmet_needs: string[];
  };
  the_product: {
    name: string;
    type: string;
    one_sentence_pitch: string;
    suggested_price: string;
    estimated_revenue_potential: string;
  };
  launch_strategy: {
    pre_launch_hook: string;
    day_1_to_30_plan: Array<{ week: number; focus: string }>;
    viral_hooks: string[];
  };
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [credits, setCredits] = useState<number | null>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<"youtube" | "instagram">("youtube");
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [reportMeta, setReportMeta] = useState<{ platform: string; url: string } | null>(null);

  const isDemoMode = searchParams.get("demo") === "true";

  const toggleDemoMode = () => {
    if (isDemoMode) {
      searchParams.delete("demo");
    } else {
      searchParams.set("demo", "true");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!loading && !user && !isDemoMode) {
      navigate("/auth");
    }
  }, [user, loading, navigate, isDemoMode]);

  useEffect(() => {
    if (isDemoMode) {
      setCredits(DEMO_DATA.credits);
      setLoadingCredits(false);
      return;
    }

    const fetchCredits = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("credits")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching credits:", error);
          toast({
            title: "Error",
            description: "Failed to load your credits.",
            variant: "destructive",
          });
        } else if (data) {
          setCredits(data.credits);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingCredits(false);
      }
    };

    if (user) {
      fetchCredits();
    }
  }, [user, toast, isDemoMode]);

  const handleSignOut = async () => {
    if (isDemoMode) {
      toggleDemoMode();
      toast({
        title: "Demo mode disabled",
        description: "Returning to normal mode.",
      });
      return;
    }
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  const handleGenerateStrategy = async () => {
    if (isDemoMode) {
      toast({
        title: "Demo Mode",
        description: "This is a preview. Sign in to use actual features.",
      });
      return;
    }

    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please paste a YouTube or Instagram URL.",
        variant: "destructive",
      });
      return;
    }

    if (credits === null || credits <= 0) {
      toast({
        title: "No Credits",
        description: "You need at least 1 credit to generate a strategy.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setReport(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-creator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ url, platform }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.code === "NO_CREDITS") {
          toast({
            title: "No Credits",
            description: "You need more credits to generate a strategy.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.error || "Failed to generate strategy");
        }
        return;
      }

      setReport(data.report);
      setReportMeta({ platform: data.platform, url: data.url });
      setCredits(data.credits_remaining);
      
      toast({
        title: "Strategy Generated!",
        description: "Your revenue strategy report is ready.",
      });

    } catch (error) {
      console.error("Error generating strategy:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate strategy.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseReport = () => {
    setReport(null);
    setReportMeta(null);
    setUrl("");
  };

  if (loading && !isDemoMode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayEmail = isDemoMode ? DEMO_DATA.email : user?.email;
  const displayCredits = isDemoMode ? DEMO_DATA.credits : credits;

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="sticky top-0 z-30 bg-amber-500/10 border-b border-amber-500/30 py-2">
          <div className="container mx-auto px-4 flex items-center justify-center gap-2">
            <Eye className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-amber-500 font-medium">
              Demo Mode - Viewing sample data
            </span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors">
                <Ghost className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Shadow<span className="text-primary">OS</span>
              </span>
            </a>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link to="/my-reports">
                <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                  <FolderOpen className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">My Reports</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDemoMode}
                className="gap-1.5 text-xs h-8"
              >
                {isDemoMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{isDemoMode ? "Exit Demo" : "Demo"}</span>
              </Button>

              {isDemoMode && (
                <Badge variant="outline" className="border-amber-500/50 text-amber-500 text-xs">
                  Demo
                </Badge>
              )}

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <Coins className="h-3.5 w-3.5 text-primary" />
                {loadingCredits ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                ) : (
                  <span className="text-sm font-medium">{displayCredits ?? 0}</span>
                )}
              </div>

              <span className="text-xs text-muted-foreground hidden md:block max-w-[150px] truncate">
                {displayEmail}
              </span>

              <Button variant="ghost" size="sm" onClick={handleSignOut} className="h-8 px-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Generate Revenue Strategy
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Paste a creator's URL to unlock their monetization potential
            </p>
          </div>

          {/* Credits Card - Mobile */}
          <div className="sm:hidden">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Coins className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Credits</span>
                </div>
                {loadingCredits ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  <span className="text-xl font-bold">{displayCredits ?? 0}</span>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Input Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 space-y-5">
              {/* Platform Selection */}
              <div className="flex gap-2">
                <button
                  onClick={() => setPlatform("youtube")}
                  disabled={isDemoMode || isGenerating}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                    platform === "youtube" 
                      ? "bg-red-500/10 border-red-500/50 text-red-500" 
                      : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <Youtube className="h-5 w-5" />
                  <span className="font-medium">YouTube</span>
                </button>
                <button
                  onClick={() => setPlatform("instagram")}
                  disabled={isDemoMode || isGenerating}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                    platform === "instagram" 
                      ? "bg-pink-500/10 border-pink-500/50 text-pink-500" 
                      : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <Instagram className="h-5 w-5" />
                  <span className="font-medium">Instagram</span>
                </button>
              </div>

              {/* URL Input */}
              <div className="relative">
                <Input
                  type="url"
                  placeholder={platform === 'youtube' 
                    ? "https://youtube.com/@creator or video URL" 
                    : "https://instagram.com/creator"
                  }
                  value={isDemoMode ? DEMO_DATA.url : url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isDemoMode || isGenerating}
                  className="h-14 text-base px-4 pr-12 bg-background/50"
                />
                {url && !isDemoMode && (
                  <button 
                    onClick={() => setUrl("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Generate Button */}
              <Button 
                variant="glow" 
                size="lg" 
                className="w-full h-14 text-base font-semibold gap-2"
                onClick={handleGenerateStrategy}
                disabled={isDemoMode || isGenerating || (credits !== null && credits <= 0)}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Creator...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Strategy
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>

              {credits !== null && credits <= 0 && !isDemoMode && (
                <p className="text-center text-sm text-destructive">
                  You have no credits remaining. Please add more credits to continue.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Zap, label: "Instant Analysis" },
              { icon: FileText, label: "PDF Export" },
              { icon: Sparkles, label: "AI-Powered" },
            ].map(({ icon: Icon, label }) => (
              <div 
                key={label}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/20 border border-border/30"
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground text-center">{label}</span>
              </div>
            ))}
          </div>

          {/* How it Works */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">How it works</h3>
            <div className="flex items-center justify-between gap-2">
              {[
                { step: "1", text: "Paste URL" },
                { step: "2", text: "AI Analysis" },
                { step: "3", text: "Get Strategy" },
              ].map(({ step, text }, index) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary">
                      {step}
                    </div>
                    <span className="text-xs text-muted-foreground">{text}</span>
                  </div>
                  {index < 2 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {report && reportMeta && (
        <ReportView 
          report={report} 
          platform={reportMeta.platform} 
          url={reportMeta.url}
          onClose={handleCloseReport}
        />
      )}
    </div>
  );
};

export default Dashboard;