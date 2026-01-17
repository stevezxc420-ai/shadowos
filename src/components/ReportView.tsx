import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  DollarSign, 
  Target, 
  Calendar, 
  Rocket, 
  Sparkles,
  Download,
  Users,
  TrendingUp,
  MessageSquare,
  X,
  ArrowLeft,
  Mail,
  Presentation
} from "lucide-react";
import { jsPDF } from "jspdf";
import RevenueCalculator from "./RevenueCalculator";
import CompetitorGapCard from "./CompetitorGapCard";
import CopyableScript from "./CopyableScript";
import { toast } from "@/hooks/use-toast";

interface CompetitorGap {
  flaw: string;
  advantage: string;
}

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
    base_audience_size?: number;
    base_price?: number;
  };
  competitor_gaps?: CompetitorGap[];
  launch_strategy: {
    pre_launch_hook: string;
    day_1_to_30_plan: Array<{ week: number; focus: string }>;
    viral_hooks: string[];
    dm_script?: string;
  };
}

interface ReportViewProps {
  report: ReportData;
  platform: string;
  url: string;
  onClose: () => void;
}

const ReportView = ({ report, platform, url, onClose }: ReportViewProps) => {
  
  // Helper function to draw slide background
  const drawSlideBackground = (doc: jsPDF, slideNumber: number, totalSlides: number) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Dark gradient background
    doc.setFillColor(15, 15, 25);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Accent gradient strip at top
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, pageWidth, 8, 'F');
    
    // Subtle corner accent
    doc.setFillColor(139, 92, 246, 0.1);
    doc.circle(pageWidth + 50, pageHeight + 50, 150, 'F');
    
    // Slide number
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 120);
    doc.text(`${slideNumber} / ${totalSlides}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
    
    // Footer branding
    doc.setFontSize(8);
    doc.text('ShadowOS • Revenue Strategy', 20, pageHeight - 10);
  };

  const handleExportPitchDeck = () => {
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;
    const totalSlides = 5;

    // ===== SLIDE 1: Title Slide =====
    drawSlideBackground(doc, 1, totalSlides);
    
    doc.setFontSize(14);
    doc.setTextColor(139, 92, 246);
    doc.text('REVENUE STRATEGY', centerX, 50, { align: 'center' });
    
    doc.setFontSize(42);
    doc.setTextColor(255, 255, 255);
    doc.text(report.the_product.name, centerX, 80, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(180, 180, 200);
    const pitchLines = doc.splitTextToSize(report.the_product.one_sentence_pitch, pageWidth - 80);
    doc.text(pitchLines, centerX, 100, { align: 'center' });
    
    // Product type badge
    doc.setFillColor(139, 92, 246);
    const badgeWidth = 60;
    doc.roundedRect(centerX - badgeWidth/2, 120, badgeWidth, 12, 3, 3, 'F');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(report.the_product.type, centerX, 128, { align: 'center' });
    
    // Platform info
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 120);
    doc.text(`Prepared for: ${platform === 'youtube' ? 'YouTube' : 'Instagram'} Creator`, centerX, 160, { align: 'center' });
    doc.setFontSize(9);
    doc.text(url, centerX, 170, { align: 'center' });

    // ===== SLIDE 2: The Problem =====
    doc.addPage('landscape');
    drawSlideBackground(doc, 2, totalSlides);
    
    doc.setFontSize(12);
    doc.setTextColor(239, 68, 68);
    doc.text('THE PROBLEM', 30, 35);
    
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text('Your Audience Has Unmet Needs', 30, 55);
    
    doc.setFontSize(14);
    doc.setTextColor(180, 180, 200);
    const vibeLines = doc.splitTextToSize(report.creator_analysis.audience_vibe, pageWidth - 60);
    doc.text(vibeLines, 30, 75);
    
    // Pain points as cards
    let cardY = 100;
    report.creator_analysis.unmet_needs.forEach((need, index) => {
      // Card background
      doc.setFillColor(30, 30, 45);
      doc.roundedRect(30, cardY, pageWidth - 60, 25, 4, 4, 'F');
      
      // Number badge
      doc.setFillColor(239, 68, 68);
      doc.circle(45, cardY + 12.5, 8, 'F');
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(String(index + 1), 45, cardY + 16, { align: 'center' });
      
      // Pain point text
      doc.setFontSize(12);
      doc.setTextColor(220, 220, 230);
      const needLines = doc.splitTextToSize(need, pageWidth - 100);
      doc.text(needLines, 60, cardY + 15);
      
      cardY += 30;
    });

    // ===== SLIDE 3: The Solution =====
    doc.addPage('landscape');
    drawSlideBackground(doc, 3, totalSlides);
    
    doc.setFontSize(12);
    doc.setTextColor(34, 197, 94);
    doc.text('THE SOLUTION', 30, 35);
    
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text(report.the_product.name, 30, 55);
    
    doc.setFontSize(14);
    doc.setTextColor(180, 180, 200);
    const solutionPitch = doc.splitTextToSize(`"${report.the_product.one_sentence_pitch}"`, pageWidth - 60);
    doc.text(solutionPitch, 30, 75);
    
    // Two column layout for price and type
    const colWidth = (pageWidth - 80) / 2;
    
    // Left column - Product Type
    doc.setFillColor(30, 30, 45);
    doc.roundedRect(30, 95, colWidth, 50, 6, 6, 'F');
    doc.setFontSize(10);
    doc.setTextColor(139, 92, 246);
    doc.text('PRODUCT TYPE', 40, 110);
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(report.the_product.type, 40, 130);
    
    // Right column - Suggested Price
    doc.setFillColor(30, 30, 45);
    doc.roundedRect(50 + colWidth, 95, colWidth, 50, 6, 6, 'F');
    doc.setFontSize(10);
    doc.setTextColor(34, 197, 94);
    doc.text('SUGGESTED PRICE', 60 + colWidth, 110);
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(report.the_product.suggested_price, 60 + colWidth, 130);

    // ===== SLIDE 4: Revenue Potential =====
    doc.addPage('landscape');
    drawSlideBackground(doc, 4, totalSlides);
    
    doc.setFontSize(12);
    doc.setTextColor(139, 92, 246);
    doc.text('THE OPPORTUNITY', 30, 35);
    
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text('Revenue Potential', 30, 55);
    
    // Big revenue number
    doc.setFillColor(139, 92, 246);
    doc.roundedRect(30, 70, pageWidth - 60, 60, 8, 8, 'F');
    doc.setFontSize(36);
    doc.setTextColor(255, 255, 255);
    doc.text(report.the_product.estimated_revenue_potential, centerX, 105, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Estimated Monthly Revenue', centerX, 120, { align: 'center' });
    
    // Competitor advantages if available
    if (report.competitor_gaps && report.competitor_gaps.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(251, 191, 36);
      doc.text('Strategic Advantages', 30, 150);
      
      let gapY = 160;
      report.competitor_gaps.slice(0, 2).forEach((gap) => {
        doc.setFontSize(11);
        doc.setTextColor(180, 180, 200);
        const gapText = doc.splitTextToSize(`✓ ${gap.advantage}`, pageWidth - 60);
        doc.text(gapText, 30, gapY);
        gapY += 15;
      });
    }

    // ===== SLIDE 5: Launch Roadmap =====
    doc.addPage('landscape');
    drawSlideBackground(doc, 5, totalSlides);
    
    doc.setFontSize(12);
    doc.setTextColor(139, 92, 246);
    doc.text('THE ROADMAP', 30, 35);
    
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text('30-Day Launch Plan', 30, 55);
    
    // Week cards in a row
    const weekCardWidth = (pageWidth - 80) / 4;
    report.launch_strategy.day_1_to_30_plan.forEach((item, index) => {
      const cardX = 30 + (index * (weekCardWidth + 10));
      
      // Card background
      doc.setFillColor(30, 30, 45);
      doc.roundedRect(cardX, 70, weekCardWidth, 60, 6, 6, 'F');
      
      // Week number
      doc.setFillColor(139, 92, 246);
      doc.roundedRect(cardX + 10, 78, 50, 16, 3, 3, 'F');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(`WEEK ${item.week}`, cardX + 35, 89, { align: 'center' });
      
      // Focus text
      doc.setFontSize(10);
      doc.setTextColor(180, 180, 200);
      const focusLines = doc.splitTextToSize(item.focus, weekCardWidth - 20);
      doc.text(focusLines, cardX + 10, 105);
    });
    
    // Pre-launch hook
    doc.setFillColor(30, 30, 45);
    doc.roundedRect(30, 140, pageWidth - 60, 35, 6, 6, 'F');
    doc.setFontSize(10);
    doc.setTextColor(139, 92, 246);
    doc.text('🚀 PRE-LAUNCH HOOK', 40, 155);
    doc.setFontSize(11);
    doc.setTextColor(220, 220, 230);
    const hookLines = doc.splitTextToSize(report.launch_strategy.pre_launch_hook, pageWidth - 80);
    doc.text(hookLines, 40, 167);

    doc.save(`ShadowOS-PitchDeck-${Date.now()}.pdf`);
    
    toast({
      title: "Pitch Deck Exported!",
      description: "Your professional 5-slide pitch deck has been downloaded.",
    });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Title
    doc.setFontSize(24);
    doc.setTextColor(139, 92, 246);
    doc.text("ShadowOS Revenue Strategy", pageWidth / 2, y, { align: "center" });
    y += 15;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated for: ${url}`, pageWidth / 2, y, { align: "center" });
    y += 20;

    // Creator Analysis Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Creator Analysis", 20, y);
    y += 10;

    doc.setFontSize(11);
    doc.text(`Niche: ${report.creator_analysis.niche}`, 20, y);
    y += 8;

    doc.setFontSize(10);
    const audienceLines = doc.splitTextToSize(`Audience Vibe: ${report.creator_analysis.audience_vibe}`, pageWidth - 40);
    doc.text(audienceLines, 20, y);
    y += audienceLines.length * 6 + 8;

    doc.text("Unmet Needs:", 20, y);
    y += 6;
    report.creator_analysis.unmet_needs.forEach((need) => {
      const needLines = doc.splitTextToSize(`• ${need}`, pageWidth - 50);
      doc.text(needLines, 25, y);
      y += needLines.length * 6;
    });
    y += 10;

    // The Product Section
    doc.setFontSize(16);
    doc.text("The Product", 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.setTextColor(139, 92, 246);
    doc.text(report.the_product.name, 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Type: ${report.the_product.type}`, 20, y);
    y += 6;

    const pitchLines = doc.splitTextToSize(`Pitch: ${report.the_product.one_sentence_pitch}`, pageWidth - 40);
    doc.text(pitchLines, 20, y);
    y += pitchLines.length * 6 + 4;

    doc.text(`Price: ${report.the_product.suggested_price}`, 20, y);
    y += 6;
    doc.text(`Revenue Potential: ${report.the_product.estimated_revenue_potential}`, 20, y);
    y += 15;

    // Competitor Gaps Section
    if (report.competitor_gaps && report.competitor_gaps.length > 0) {
      if (y > 220) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(16);
      doc.text("Strategic Advantages (Competitor Gaps)", 20, y);
      y += 10;

      doc.setFontSize(10);
      report.competitor_gaps.forEach((gap, index) => {
        const flawLines = doc.splitTextToSize(`${index + 1}. Flaw: ${gap.flaw}`, pageWidth - 50);
        doc.text(flawLines, 25, y);
        y += flawLines.length * 6;
        
        const advLines = doc.splitTextToSize(`   Advantage: ${gap.advantage}`, pageWidth - 50);
        doc.text(advLines, 25, y);
        y += advLines.length * 6 + 4;
      });
      y += 10;
    }

    // Launch Strategy Section
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(16);
    doc.text("30-Day Launch Strategy", 20, y);
    y += 10;

    doc.setFontSize(10);
    const hookLines = doc.splitTextToSize(`Pre-Launch Hook: ${report.launch_strategy.pre_launch_hook}`, pageWidth - 40);
    doc.text(hookLines, 20, y);
    y += hookLines.length * 6 + 8;

    doc.text("Weekly Plan:", 20, y);
    y += 6;
    report.launch_strategy.day_1_to_30_plan.forEach((item) => {
      doc.text(`Week ${item.week}: ${item.focus}`, 25, y);
      y += 6;
    });
    y += 10;

    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.text("Viral Hooks:", 20, y);
    y += 6;
    report.launch_strategy.viral_hooks.forEach((hook, i) => {
      const hookTextLines = doc.splitTextToSize(`${i + 1}. ${hook}`, pageWidth - 50);
      doc.text(hookTextLines, 25, y);
      y += hookTextLines.length * 6 + 2;
    });

    // DM Script
    if (report.launch_strategy.dm_script) {
      if (y > 200) {
        doc.addPage();
        y = 20;
      }
      y += 10;
      doc.text("DM Script:", 20, y);
      y += 6;
      const dmLines = doc.splitTextToSize(report.launch_strategy.dm_script, pageWidth - 50);
      doc.text(dmLines, 25, y);
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by ShadowOS • shadowos.app", pageWidth / 2, 285, { align: "center" });

    doc.save(`ShadowOS-Report-${Date.now()}.pdf`);
  };

  // Extract base values for calculator
  const baseAudienceSize = report.the_product.base_audience_size || 10000;
  const basePrice = report.the_product.base_price || 97;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full max-w-4xl bg-background border-l border-border shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="flex items-center gap-4">
            <Button onClick={onClose} variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Revenue Strategy Report
              </h2>
              <p className="text-muted-foreground text-sm">
                {platform === 'youtube' ? 'YouTube' : 'Instagram'} Creator Analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleExportPitchDeck} 
              size="sm" 
              className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25"
            >
              <Presentation className="h-4 w-4" />
              Export Pitch Deck
            </Button>
            <Button onClick={handleDownloadPDF} size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Full Report
            </Button>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-73px)] p-6 space-y-6">
          {/* Creator Analysis */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                Creator Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {report.creator_analysis.niche}
                </Badge>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Audience Vibe</p>
                <p className="text-foreground leading-relaxed">{report.creator_analysis.audience_vibe}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" />
                  Audience Pain Points
                </p>
                <div className="grid gap-2">
                  {report.creator_analysis.unmet_needs.map((need, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-destructive/20 text-destructive text-xs flex items-center justify-center font-medium mt-0.5">
                        !
                      </span>
                      <p className="text-sm text-foreground">{need}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Product */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                The Product Idea
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-2">{report.the_product.name}</h3>
                <Badge variant="outline" className="border-primary/30 text-primary">{report.the_product.type}</Badge>
              </div>
              <blockquote className="pl-4 border-l-2 border-primary/50 italic text-foreground/90">
                "{report.the_product.one_sentence_pitch}"
              </blockquote>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/80 border border-border/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Suggested Price</p>
                    <p className="font-bold text-lg">{report.the_product.suggested_price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/80 border border-border/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Revenue Potential</p>
                    <p className="font-bold text-lg">{report.the_product.estimated_revenue_potential}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Calculator */}
          <RevenueCalculator 
            baseAudienceSize={baseAudienceSize} 
            basePrice={basePrice} 
          />

          {/* Competitor Gap Card */}
          {report.competitor_gaps && report.competitor_gaps.length > 0 && (
            <CompetitorGapCard gaps={report.competitor_gaps} />
          )}

          {/* Launch Strategy */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-4 w-4 text-primary" />
                </div>
                Launch Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-primary uppercase tracking-wide">🚀 Pre-Launch Hook</p>
                  <CopyableScript text={report.launch_strategy.pre_launch_hook} label="Copy" />
                </div>
                <p className="font-medium text-foreground">{report.launch_strategy.pre_launch_hook}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  30-Day Launch Calendar
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {report.launch_strategy.day_1_to_30_plan.map((item) => (
                    <div 
                      key={item.week} 
                      className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 transition-all hover:bg-muted/50"
                    >
                      <p className="text-primary font-bold text-sm mb-1">Week {item.week}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.focus}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Viral Content Hooks
                  <span className="text-xs font-normal text-muted-foreground ml-auto">One-click copy</span>
                </h4>
                <div className="space-y-2">
                  {report.launch_strategy.viral_hooks.map((hook, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg bg-muted/20 border border-border/30 flex items-start gap-3 hover:bg-muted/30 transition-colors group"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed flex-1">{hook}</p>
                      <CopyableScript text={hook} label="Copy" />
                    </div>
                  ))}
                </div>
              </div>

              {/* DM Script Section */}
              {report.launch_strategy.dm_script && (
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Ready-to-Use DM Script
                    <span className="text-xs font-normal text-muted-foreground ml-auto">Copy & personalize</span>
                  </h4>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/30">
                    <div className="flex justify-end mb-2">
                      <CopyableScript text={report.launch_strategy.dm_script} label="Copy Script" />
                    </div>
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                      {report.launch_strategy.dm_script}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
