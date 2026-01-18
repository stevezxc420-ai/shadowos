import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ghost, LogOut, Loader2, FileText, ArrowLeft, Calendar, ExternalLink, Trash2, Youtube, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReportView from "@/components/ReportView";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

interface SavedReport {
  id: string;
  platform: string;
  url: string;
  report_data: ReportData;
  created_at: string;
}

const MyReports = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching reports:", error);
          toast({
            title: "Error",
            description: "Failed to load your reports.",
            variant: "destructive",
          });
        } else if (data) {
          const typedReports = data.map((r) => ({
            id: r.id,
            platform: r.platform,
            url: r.url,
            report_data: r.report_data as unknown as ReportData,
            created_at: r.created_at,
          }));
          setReports(typedReports);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingReports(false);
      }
    };

    if (user) {
      fetchReports();
    }
  }, [user, toast]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  const handleDeleteReport = async (reportId: string) => {
    setDeletingId(reportId);
    try {
      const { error } = await supabase
        .from("reports")
        .delete()
        .eq("id", reportId);

      if (error) {
        throw error;
      }

      setReports((prev) => prev.filter((r) => r.id !== reportId));
      toast({
        title: "Report deleted",
        description: "The report has been removed.",
      });
    } catch (error) {
      console.error("Error deleting report:", error);
      toast({
        title: "Error",
        description: "Failed to delete the report.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const extractCreatorName = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (url.includes("youtube")) {
        const match = url.match(/@([^\/\?]+)/);
        if (match) return `@${match[1]}`;
        return urlObj.pathname.split("/").filter(Boolean)[0] || "YouTube Creator";
      }
      if (url.includes("instagram")) {
        const path = urlObj.pathname.split("/").filter(Boolean)[0];
        return path ? `@${path}` : "Instagram Creator";
      }
      return urlObj.hostname;
    } catch {
      return "Creator";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors">
                <Ghost className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Shadow<span className="text-primary">OS</span>
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>

              <span className="text-xs text-muted-foreground hidden md:block max-w-[150px] truncate">
                {user?.email}
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
                <FileText className="h-7 w-7 text-primary" />
                My Reports
              </h1>
              <p className="text-muted-foreground text-sm">
                Access all your generated creator analyses
              </p>
            </div>
            <Link to="/dashboard">
              <Button variant="glow" size="sm" className="gap-2">
                New Analysis
              </Button>
            </Link>
          </div>

          {/* Reports List */}
          {loadingReports ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : reports.length === 0 ? (
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary/60" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                  Generate your first creator analysis to see it here
                </p>
                <Link to="/dashboard">
                  <Button variant="glow">Generate Your First Report</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {reports.map((report) => (
                <Card
                  key={report.id}
                  className="border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors group"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Platform Icon */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                            report.platform === "youtube"
                              ? "bg-red-500/10 border border-red-500/30"
                              : "bg-pink-500/10 border border-pink-500/30"
                          }`}
                        >
                          {report.platform === "youtube" ? (
                            <Youtube className="h-6 w-6 text-red-500" />
                          ) : (
                            <Instagram className="h-6 w-6 text-pink-500" />
                          )}
                        </div>

                        {/* Report Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg truncate">
                              {report.report_data.the_product?.name || extractCreatorName(report.url)}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 truncate">
                            {extractCreatorName(report.url)} • {report.report_data.creator_analysis?.niche || "Creator"}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(report.created_at)}
                            </span>
                            <a
                              href={report.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-primary transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Source
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                          className="gap-1.5"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="hidden sm:inline">View Report</span>
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              {deletingId === report.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Report</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this report? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteReport(report.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    {/* Revenue Preview */}
                    {report.report_data.the_product?.estimated_revenue_potential && (
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Revenue Potential</span>
                          <span className="font-semibold text-primary">
                            {report.report_data.the_product.estimated_revenue_potential}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Report Modal */}
      {selectedReport && (
        <ReportView
          report={selectedReport.report_data}
          platform={selectedReport.platform}
          url={selectedReport.url}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default MyReports;
