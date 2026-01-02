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

import PredictionDashboard from '@/components/dividend/PredictionDashboard';


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
      console.log("RRRR", result)
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
      {results && <PredictionDashboard data={results.data} firm={inputs.symbol} year={2025} />}


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
