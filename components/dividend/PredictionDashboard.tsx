'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Activity, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartCard } from '@/components/chart-card';

interface PredictionDashboardProps {
  data: any;
  firm: string;
  year: number;
}

export default function PredictionDashboard({ data, firm, year }: PredictionDashboardProps) {
  const prediction = data.prediction;
  const features = data.features;
  const score = data.financial_possition;

  // Convert features DataFrame to object (assuming it's the last row)
  const featuresData = features?.iloc?.[features.length - 1] || features;

  console.log(featuresData)
  // Extract prediction details
  const probability = prediction.probability || 0;
  const decision = prediction.decision || 'Unknown';
  const confidence = prediction.confidence || 'Low';
  const featureContributions = prediction.feature_contributions || {};
  console.log("featureContributions", featureContributions)
  const investorExplanation = prediction.investor_explanation || {};

  // Determine if will pay dividend
  const willPay = decision.includes('YES');
  const threshold = 0.82;

  // Financial Health Scorecard Data
  const financialHealthData = [
    { 
      name: 'leverage', 
      score: score.leverage || 0,
      color: score.leverage > 60 ? '#10b981' : '#ef4444'
    },
    { 
      name: 'liquidity', 
      score: score.liquidity || 0,
      color: score.liquidity > 50 ? '#10b981' : '#ef4444'
    },
    { 
      name: 'efficiency', 
      score: score.efficiency || 0,
      color: score.efficiency > 50 ? '#10b981' : '#ef4444'
    },
    { 
      name: 'profitability', 
      score: score.profitability || 0,
      color: score.profitability > 50 ? '#10b981' : '#ef4444'
    },
  ];

  // Risk-Reward Balance (Pie Chart)
  const strengths = investorExplanation.strengths?.length || 0;
  const concerns = investorExplanation.concerns?.length || 0;
  const total = strengths + concerns || 1;
  
  const riskRewardData = [
    { name: 'Strengths', value: strengths, percentage: Math.round((strengths / total) * 100) },
    { name: 'Concerns', value: concerns, percentage: Math.round((concerns / total) * 100) },
  ];

  const PIE_COLORS = ['#10b981', '#ef4444'];

  // Key Factors Driving Prediction
  const factorsData = Object.entries(featureContributions.contributions)
    .map(([key, value]: [string, any]) => ({
      name: key,
      impact: typeof value === 'number' ? value : 0,
    }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 10);

  // Top Financial Metrics
  console.log("investorExplanation", investorExplanation)
  const topMetrics = investorExplanation.key_strengths || [];
  const lowMetrics = investorExplanation.key_concerns || [];
  console.log("topMetrics", topMetrics)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.name}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {payload[0].name}: {payload[0].value.toFixed(3)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Prediction Summary Card */}
      <Card className={`border-${willPay ? 'green' : 'red'}-500/20 ${willPay ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10' : 'bg-gradient-to-r from-red-500/10 to-orange-500/10'}`}>
        <CardHeader>
          <CardTitle className="text-2xl">{firm.toUpperCase()}</CardTitle>
          <CardDescription>{year} Dividend Prediction Analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Prediction</p>
              <p className={`text-3xl font-bold ${willPay ? 'text-green-600' : 'text-red-600'}`}>
                {decision}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Confidence: {confidence}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Probability</p>
              <p className="text-3xl font-bold text-foreground">{(probability * 100).toFixed(1)}%</p>
              <p className={`text-xs ${probability > threshold ? 'text-green-600' : 'text-orange-600'}`}>
                Threshold: {(threshold * 100).toFixed(0)}%
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${willPay ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {willPay ? (
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Probability Progress Bar */}
          <div className="pt-4 space-y-2">
            <p className="text-sm font-medium">Prediction Confidence</p>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              {/* Threshold indicator */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-foreground/30 z-10"
                style={{ left: `${threshold * 100}%` }}
              />
              {/* Probability bar */}
              <div 
                className={`h-full transition-all ${willPay ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
                style={{ width: `${probability * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>Threshold ({(threshold * 100).toFixed(0)}%)</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Factors Driving the Prediction - Full Width */}
      <ChartCard
        title="Key Factors Driving the Prediction"
        description="Impact of financial metrics on prediction"
      >
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={factorsData} layout="vertical" margin={{ left: 150, right: 30, top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
            <XAxis type="number" stroke="var(--color-muted-foreground)" />
            <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
              {factorsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.impact > 0 ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Financial Health and Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Health Scorecard */}
        <ChartCard
          title="Financial Health Scorecard"
          description="Current financial position metrics"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={financialHealthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis domain={[0, 100]} stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {financialHealthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Financial Highlights */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Financial Highlights</CardTitle>
            <CardDescription>Key strengths and concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMetrics.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Strengths</p>
                  </div>
                  {topMetrics.map((metric: any, index: number) => (
                    <div key={index} className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <p className="text-sm text-foreground">{metric}</p>
                    </div>
                  ))}
                </>
              )}

              {lowMetrics.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mt-4 mb-2">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Concerns</p>
                  </div>
                  {lowMetrics.map((metric: any, index: number) => (
                    <div key={index} className="bg-red-500/10 border border-red-500/20 rounded p-3">
                      <p className="text-sm text-foreground">{metric}</p>
                    </div>
                  ))}
                </>
              )}
              
              {topMetrics.length === 0 && lowMetrics.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No metrics available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Insights - Only show if there are strengths/concerns */}
      {((investorExplanation.key_strengths && investorExplanation.key_strengths.length > 0) || 
        (investorExplanation.key_concerns && investorExplanation.key_concerns.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          {investorExplanation.key_strengths && investorExplanation.key_strengths.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">Key Strengths</CardTitle>
                </div>
                <CardDescription>Positive factors supporting dividend payment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {investorExplanation.key_strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Concerns */}
          {investorExplanation.key_concerns && investorExplanation.key_concerns.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <CardTitle className="text-lg">Key Concerns</CardTitle>
                </div>
                <CardDescription>Risk factors to consider</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {investorExplanation.key_concerns.map((concern: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <TrendingDown className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
