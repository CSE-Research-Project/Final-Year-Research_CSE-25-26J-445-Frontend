"use client"

import { useState } from "react"
import { predictDividend, getOhlcvSnapshot, type OhlcvSnapshot } from "@/lib/fakeApi"
import { useDividendStore } from "@/stores/useDividendStore"
import { TickerSearch } from "@/components/ticker-search"
import { KpiCard } from "@/components/kpi-card"
import { ChartCard } from "@/components/chart-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, AlertCircle } from "lucide-react"

export default function DividendPredictionPage() {
  const { inputs, results, loading, setInputs, setResults, setLoading } = useDividendStore()
  const [snapshot, setSnapshot] = useState<OhlcvSnapshot | null>(null)
  const { toast } = useToast()

  const handleSearch = (company: any) => {
    setInputs({ symbol: company.symbol })
    setSnapshot(null)
    setResults(null)
  }

  const handlePredict = async () => {
    if (!inputs.symbol) {
      toast({ title: "Error", description: "Please select a stock", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      // Get OHLCV snapshot
      const snap = await getOhlcvSnapshot(inputs.symbol)
      setSnapshot(snap)

      // Get dividend prediction
      const result = await predictDividend(inputs.symbol)
      setResults(result)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate prediction",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dividend Prediction & Analysis</h1>
        <p className="text-muted-foreground">Forecast dividend payouts and analyze dividend sustainability</p>
      </div>

      {/* Input Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Dividend Analysis Configuration</CardTitle>
          <CardDescription>Select a stock to analyze dividend history and predictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Stock Selection</label>
            <TickerSearch onSelect={handleSearch} placeholder="Search for a stock..." />
          </div>

          <Button onClick={handlePredict} disabled={!inputs.symbol || loading} className="w-full md:w-auto">
            {loading ? "Analyzing Dividend..." : "Analyze Dividend"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Summary Card */}
          <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{results.companyName}</CardTitle>
                  <CardDescription>{results.symbol}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Yield</p>
                  <p className="text-2xl font-bold text-green-600">{results.dividendYield.toFixed(2)}%</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              label="Last Dividend"
              value={`LKR ${results.lastDividend.toFixed(2)}`}
              description={`Paid on ${results.lastDividendDate}`}
            />
            <KpiCard
              label="Next Quarter Forecast"
              value={`LKR ${results.prediction.nextQuarter.toFixed(2)}`}
              description={`Ex-dividend: ${results.prediction.exDividendDate}`}
              trend={{ value: results.prediction.growthRate, isPositive: true }}
            />
            <KpiCard
              label="Annual Forecast"
              value={`LKR ${results.prediction.nextYear.toFixed(2)}`}
              description={`Growth: ${results.prediction.growthRate.toFixed(2)}%`}
            />
            <KpiCard
              label="Payout Ratio"
              value={`${results.payoutRatio.toFixed(1)}%`}
              description="Earnings distributed as dividends"
            />
          </div>

          {/* Historical Dividend Trend */}
          <ChartCard
            title="Historical Dividend Trend (5-Year)"
            description="Annual dividend payments and yield progression"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.historicalDividends} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" />
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="dividend"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  name="Dividend (LKR)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="yield"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  name="Yield (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Quarterly Forecast */}
          <ChartCard title="Quarterly Dividend Forecast" description="Predicted dividend payments for next 4 quarters">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.forecast} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
                <XAxis dataKey="quarter" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                  formatter={(value: number) => `LKR ${value.toFixed(2)}`}
                />
                <Bar dataKey="predictedDividend" fill="#10b981" radius={[8, 8, 0, 0]} name="Predicted Dividend" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Forecast Probability */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Forecast Confidence Levels</CardTitle>
              <CardDescription>Probability of each quarterly payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.forecast.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.quarter}</span>
                      <span className="text-sm text-green-600 font-semibold">
                        {(item.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full"
                        style={{ width: `${item.probability * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Risk Factors
              </CardTitle>
              <CardDescription>Factors that could impact dividend sustainability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.riskFactors.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between pb-3 border-b last:border-0">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">{item.factor}</p>
                      <p className="text-xs text-muted-foreground">
                        Risk probability: {(item.probability * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-full ${
                          item.impact === "High"
                            ? "bg-red-500/20 text-red-700 dark:text-red-400"
                            : item.impact === "Medium"
                              ? "bg-amber-500/20 text-amber-700 dark:text-amber-400"
                              : "bg-green-500/20 text-green-700 dark:text-green-400"
                        }`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.insights.map((insight, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span className="text-sm text-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Explanation Accordion */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="explanation">
                  <AccordionTrigger>Understanding Dividend Predictions</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">What is a dividend?</h4>
                      <p className="text-sm text-muted-foreground">
                        A dividend is a distribution of profits to shareholders, typically paid quarterly or annually.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Key Metrics:</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>
                          <strong>Dividend Yield:</strong> Annual dividend as a percentage of stock price
                        </li>
                        <li>
                          <strong>Payout Ratio:</strong> Percentage of earnings paid as dividends
                        </li>
                        <li>
                          <strong>Growth Rate:</strong> Year-over-year dividend growth percentage
                        </li>
                        <li>
                          <strong>Ex-Dividend Date:</strong> Last day to be eligible for next dividend
                        </li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        <strong>Disclaimer:</strong> This analysis is based on historical data and machine learning
                        models. Not financial advice. Past dividends do not guarantee future payments. Consult a
                        qualified advisor.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Export Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => toast({ title: "Coming soon", description: "PDF export" })}>
              Export as PDF
            </Button>
            <Button variant="outline" onClick={() => toast({ title: "Coming soon", description: "CSV export" })}>
              Export as CSV
            </Button>
          </div>
        </>
      )}

      {/* Empty State */}
      {!results && !loading && (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-muted-foreground">Select a stock and run the analysis to see dividend predictions</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
