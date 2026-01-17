import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Target } from "lucide-react";

interface CompetitorGap {
  flaw: string;
  advantage: string;
}

interface CompetitorGapCardProps {
  gaps: CompetitorGap[];
}

const CompetitorGapCard = ({ gaps }: CompetitorGapCardProps) => {
  if (!gaps || gaps.length === 0) return null;

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
            <Shield className="h-4 w-4 text-amber-500" />
          </div>
          Your Strategic Advantage
          <span className="ml-auto text-xs font-normal text-amber-600 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
            Competitor Gaps
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {gaps.map((gap, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl bg-background/80 border border-border/50 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mt-0.5">
                <Target className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-medium text-red-500 uppercase tracking-wide mb-1">Competitor Flaw</p>
                <p className="text-sm text-foreground">{gap.flaw}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pl-9">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-medium text-green-500 uppercase tracking-wide mb-1">Your Advantage</p>
                <p className="text-sm text-foreground">{gap.advantage}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CompetitorGapCard;
