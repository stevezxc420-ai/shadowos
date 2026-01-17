import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, Users, DollarSign } from "lucide-react";

interface RevenueCalculatorProps {
  baseAudienceSize?: number;
  basePrice?: number;
}

const RevenueCalculator = ({ 
  baseAudienceSize = 10000, 
  basePrice = 97 
}: RevenueCalculatorProps) => {
  const [conversionRate, setConversionRate] = useState([2]);
  const [priceMultiplier, setPriceMultiplier] = useState([1]);

  const calculations = useMemo(() => {
    const rate = conversionRate[0];
    const price = basePrice * priceMultiplier[0];
    const customers = Math.round(baseAudienceSize * (rate / 100));
    const revenue = customers * price;
    const profit = revenue * 0.85; // 85% margin after platform fees

    return {
      rate,
      price,
      customers,
      revenue,
      profit
    };
  }, [conversionRate, priceMultiplier, baseAudienceSize, basePrice]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
            <Calculator className="h-4 w-4 text-green-500" />
          </div>
          Revenue Calculator
          <span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
            Interactive
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sliders */}
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Conversion Rate
              </label>
              <span className="text-sm font-bold text-primary">{calculations.rate}%</span>
            </div>
            <Slider
              value={conversionRate}
              onValueChange={setConversionRate}
              max={10}
              min={0.5}
              step={0.5}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservative (0.5%)</span>
              <span>Optimistic (10%)</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Price Point
              </label>
              <span className="text-sm font-bold text-primary">{formatCurrency(calculations.price)}</span>
            </div>
            <Slider
              value={priceMultiplier}
              onValueChange={setPriceMultiplier}
              max={5}
              min={0.5}
              step={0.5}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lower ({formatCurrency(basePrice * 0.5)})</span>
              <span>Premium ({formatCurrency(basePrice * 5)})</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-background/80 border border-border/50 text-center">
            <Users className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground mb-1">Customers</p>
            <p className="font-bold text-lg">{formatNumber(calculations.customers)}</p>
          </div>
          <div className="p-4 rounded-xl bg-background/80 border border-border/50 text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground mb-1">Revenue</p>
            <p className="font-bold text-lg">{formatCurrency(calculations.revenue)}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
            <DollarSign className="h-5 w-5 mx-auto mb-2 text-green-500" />
            <p className="text-xs text-green-600 mb-1">Profit (85%)</p>
            <p className="font-bold text-lg text-green-500">{formatCurrency(calculations.profit)}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-2">
          Based on {formatNumber(baseAudienceSize)} audience reach • Adjust sliders to see potential
        </p>
      </CardContent>
    </Card>
  );
};

export default RevenueCalculator;
