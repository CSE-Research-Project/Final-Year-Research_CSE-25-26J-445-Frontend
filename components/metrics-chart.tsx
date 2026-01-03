"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { ChartDataPoint, MetricConfig, AVAILABLE_METRICS } from "@/lib/types/company-health-history.types"

interface MetricsChartProps {
    data: ChartDataPoint[]
    loading?: boolean
    error?: string | null
    companyCode?: string
}

export function MetricsChart({ data, loading, error, companyCode }: MetricsChartProps) {
    // Default to showing Z-Score metric
    const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(
        new Set(['z_score'])
    )

    // Toggle metric selection
    const toggleMetric = (key: string) => {
        setSelectedMetrics(prev => {
            const newSet = new Set(prev)
            if (newSet.has(key)) {
                newSet.delete(key)
            } else {
                newSet.add(key)
            }
            return newSet
        })
    }

    // Get selected metric configs for rendering
    const selectedMetricConfigs = useMemo(() => {
        return AVAILABLE_METRICS.filter(m => selectedMetrics.has(m.key))
    }, [selectedMetrics])

    // Calculate statistics for selected metrics
    const statistics = useMemo(() => {
        if (!data.length || !selectedMetricConfigs.length) return null

        const stats: Record<string, { min: number; max: number; avg: number; latest: number; trend: 'up' | 'down' | 'stable' }> = {}

        selectedMetricConfigs.forEach(metric => {
            const values = data.map(d => d[metric.key] as number)
            const latest = values[values.length - 1]
            const previous = values.length > 1 ? values[values.length - 2] : latest

            stats[metric.key] = {
                min: Math.min(...values),
                max: Math.max(...values),
                avg: values.reduce((a, b) => a + b, 0) / values.length,
                latest,
                trend: latest > previous ? 'up' : latest < previous ? 'down' : 'stable'
            }
        })

        return stats
    }, [data, selectedMetricConfigs])

    // Loading state
    if (loading) {
        return (
            <Card className="bg-card border-border">
                <CardHeader>
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-96 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                        {[...Array(10)].map((_, i) => (
                            <Skeleton key={i} className="h-6 w-full" />
                        ))}
                    </div>
                    <Skeleton className="h-80 w-full" />
                </CardContent>
            </Card>
        )
    }

    // Error state
    if (error) {
        return (
            <Card className="bg-red-500/10 border-red-500/30">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertTriangle className="h-5 w-5" />
                        <p className="font-medium">Error loading historical data</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{error}</p>
                </CardContent>
            </Card>
        )
    }

    // Empty state
    if (!data.length) {
        return null
    }

    return (
        <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Historical Financial Metrics
                    {companyCode && (
                        <Badge variant="outline" className="ml-2">
                            {companyCode.toUpperCase().replace('_', '.')}
                        </Badge>
                    )}
                </CardTitle>
                <CardDescription>
                    Track financial health metrics over time. Select metrics to display on the chart.
                    <span className="text-muted-foreground ml-2">({data.length} quarters of data)</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Metric Selection Checkboxes */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {AVAILABLE_METRICS.map((metric) => (
                        <div
                            key={metric.key}
                            className={`flex items-center space-x-2 p-2 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${selectedMetrics.has(metric.key)
                                ? 'bg-muted/30 border-primary/30'
                                : 'border-border'
                                }`}
                            onClick={() => toggleMetric(metric.key)}
                        >
                            <Checkbox
                                id={metric.key}
                                checked={selectedMetrics.has(metric.key)}
                                onCheckedChange={() => toggleMetric(metric.key)}
                                className="pointer-events-none"
                            />
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: metric.color }}
                                />
                                <Label
                                    htmlFor={metric.key}
                                    className="text-xs font-medium cursor-pointer truncate pointer-events-none"
                                    title={metric.description}
                                >
                                    {metric.label}
                                </Label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                {selectedMetrics.size > 0 ? (
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
                                <XAxis
                                    dataKey="date"
                                    stroke="var(--color-muted-foreground)"
                                    tick={{ fontSize: 11 }}
                                    interval="preserveStartEnd"
                                    tickFormatter={(value) => {
                                        // Show only year for cleaner display
                                        const parts = value.split(' ')
                                        return parts.length > 1 ? parts[1] : value
                                    }}
                                />
                                <YAxis
                                    stroke="var(--color-muted-foreground)"
                                    tick={{ fontSize: 11 }}
                                    tickFormatter={(value) => value.toFixed(2)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--color-card)",
                                        border: "1px solid var(--color-border)",
                                        borderRadius: "8px",
                                        padding: "12px",
                                    }}
                                    labelStyle={{ fontWeight: 600, marginBottom: 8 }}
                                    formatter={(value: number, name: string) => {
                                        const metric = AVAILABLE_METRICS.find(m => m.key === name)
                                        return [value.toFixed(4), metric?.label || name]
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: 20 }}
                                    formatter={(value) => {
                                        const metric = AVAILABLE_METRICS.find(m => m.key === value)
                                        return metric?.label || value
                                    }}
                                />
                                {selectedMetricConfigs.map((metric) => (
                                    <Line
                                        key={metric.key}
                                        type="monotone"
                                        dataKey={metric.key}
                                        stroke={metric.color}
                                        strokeWidth={2}
                                        dot={{ r: 2 }}
                                        activeDot={{ r: 5 }}
                                        name={metric.key}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-96 flex items-center justify-center text-muted-foreground">
                        <p>Select at least one metric to display the chart</p>
                    </div>
                )}

                {/* Statistics Summary */}
                {statistics && selectedMetricConfigs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
                        {selectedMetricConfigs.slice(0, 6).map((metric) => {
                            const stat = statistics[metric.key]
                            if (!stat) return null

                            return (
                                <div
                                    key={metric.key}
                                    className="p-4 rounded-lg bg-muted/20 border border-border"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: metric.color }}
                                            />
                                            <span className="text-sm font-medium truncate" title={metric.label}>
                                                {metric.label.length > 25 ? metric.label.substring(0, 25) + '...' : metric.label}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={
                                                stat.trend === 'up'
                                                    ? 'text-green-600 border-green-500/30'
                                                    : stat.trend === 'down'
                                                        ? 'text-red-600 border-red-500/30'
                                                        : 'text-muted-foreground'
                                            }
                                        >
                                            {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                        <div>
                                            <p className="text-muted-foreground">Latest</p>
                                            <p className="font-semibold">{stat.latest.toFixed(3)}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Avg</p>
                                            <p className="font-semibold">{stat.avg.toFixed(3)}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Range</p>
                                            <p className="font-semibold">{stat.min.toFixed(2)}-{stat.max.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
