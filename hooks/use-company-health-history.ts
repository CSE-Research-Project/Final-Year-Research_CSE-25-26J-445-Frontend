/**
 * Custom hook for fetching company financial health history data
 */

import { useState, useCallback, useMemo } from 'react';
import {
    CompanyHealthHistoryResponse,
    ChartDataPoint,
    CompanyHealthDataPoint
} from '@/lib/types/company-health-history.types';
import { getCompanyHealthHistory } from '@/lib/api/financial-health.api';

interface UseCompanyHealthHistoryReturn {
    data: CompanyHealthHistoryResponse | null;
    chartData: ChartDataPoint[];
    loading: boolean;
    error: string | null;
    fetchHistory: (companyCode: string) => Promise<void>;
    reset: () => void;
}

/**
 * Parse a date string in M/D/YYYY format to a Date object
 */
function parseQuarterDate(dateStr: string): Date {
    const [month, day, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Format date for display in chart
 */
function formatDateForChart(dateStr: string): string {
    const date = parseQuarterDate(dateStr);
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    return `Q${quarter} ${date.getFullYear()}`;
}

/**
 * Transform raw API data to chart-friendly format
 */
function transformToChartData(data: CompanyHealthDataPoint[]): ChartDataPoint[] {
    return data
        .map(item => ({
            date: formatDateForChart(item.QuarterDate),
            quarterDate: parseQuarterDate(item.QuarterDate),
            working_capital_to_total_assets: parseFloat(item.working_capital_to_total_assets) || 0,
            retained_earnings_to_total_assets: parseFloat(item.retained_earnings_to_total_assets) || 0,
            ebit_to_total_assets: parseFloat(item.ebit_to_total_assets) || 0,
            mve_to_total_liabilities: parseFloat(item.mve_to_total_liabilities) || 0,
            sales_to_total_assets: parseFloat(item.sales_to_total_assets) || 0,
            current_ratio: parseFloat(item.current_ratio) || 0,
            debt_to_equity_ratio: parseFloat(item.debt_to_equity_ratio) || 0,
            net_profit_margin: parseFloat(item.net_profit_margin) || 0,
            z_score: parseFloat(item.z_score) || 0,
            z_score_next_quarter: parseFloat(item.z_score_next_quarter) || 0,
        }))
        .sort((a, b) => a.quarterDate.getTime() - b.quarterDate.getTime());
}

/**
 * Hook for managing company health history state and API calls
 * @returns Object with data, chartData, loading, error states and control functions
 */
export function useCompanyHealthHistory(): UseCompanyHealthHistoryReturn {
    const [data, setData] = useState<CompanyHealthHistoryResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Transform data for charting (memoized)
    const chartData = useMemo(() => {
        if (!data?.data) return [];
        return transformToChartData(data.data);
    }, [data]);

    const fetchHistory = useCallback(async (companyCode: string) => {
        if (!companyCode) {
            setError('Please provide a company code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await getCompanyHealthHistory(companyCode);
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch company health history';
            setError(errorMessage);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return {
        data,
        chartData,
        loading,
        error,
        fetchHistory,
        reset,
    };
}
