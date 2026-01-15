import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Ghost, LogOut, Coins, Loader2, Sparkles, FileText, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const DEMO_DATA = {
  email: "demo@example.com",
  credits: 150,
  url: "https://youtube.com/watch?v=example",
};

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [credits, setCredits] = useState<number | null>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [url, setUrl] = useState("");

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

  const handleGenerateStrategy = () => {
    if (isDemoMode) {
      toast({
        title: "Demo Mode",
        description: "This is a preview. Sign in to use actual features.",
      });
      return;
    }
    toast({
      title: "Coming soon",
      description: "This feature will be available shortly.",
    });
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="relative z-20 bg-amber-500/10 border-b border-amber-500/30 py-2">
          <div className="container mx-auto px-6 flex items-center justify-center gap-2">
            <Eye className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-amber-500 font-medium">
              Demo Mode - Viewing sample data. Functionality is disabled.
            </span>
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 group">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors">
                  <Ghost className="h-5 w-5 text-primary" />
                  <div className="absolute inset-0 rounded-lg bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-display text-xl font-bold tracking-tight">
                  Shadow<span className="text-primary">OS</span>
                </span>
              </a>

              {/* User info & Actions */}
              <div className="flex items-center gap-4">
                {/* Demo Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleDemoMode}
                  className="gap-2"
                >
                  {isDemoMode ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      <span className="hidden sm:inline">Exit Demo</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">Demo Mode</span>
                    </>
                  )}
                </Button>

                {isDemoMode && (
                  <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                    Demo
                  </Badge>
                )}

                <span className="text-sm text-muted-foreground hidden sm:block">
                  {displayEmail}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {isDemoMode ? "Exit" : "Sign Out"}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-6 py-12 space-y-8">
          {/* Stats Bar */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credits Remaining</p>
                  {loadingCredits ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <p className="text-2xl font-bold">{displayCredits ?? 0}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* URL Input Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
            <CardContent className="py-8 space-y-6">
              <Input
                type="url"
                placeholder="Paste YouTube or Instagram URL here"
                value={isDemoMode ? DEMO_DATA.url : url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isDemoMode}
                className="h-14 text-lg px-5"
              />
              <Button 
                variant="glow" 
                size="lg" 
                className="w-full h-14 text-lg"
                onClick={handleGenerateStrategy}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Revenue Strategy
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reports Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Your Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No reports yet</p>
                <p className="text-sm text-muted-foreground/70">
                  Generate your first revenue strategy to see it here
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
