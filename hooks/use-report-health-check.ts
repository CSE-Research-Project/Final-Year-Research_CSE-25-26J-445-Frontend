/**
 * Custom hook for fetching report health check data
 */

import { useState, useCallback } from 'react';
import { ReportHealthCheckResponse } from '@/lib/types/financial-health.types';
import { getReportHealthCheck } from '@/lib/api/financial-health.api';

interface UseReportHealthCheckReturn {
    data: ReportHealthCheckResponse | null;
    loading: boolean;
    error: string | null;
    fetchHealthCheck: (symbol: string) => Promise<void>;
    reset: () => void;
}

/**
 * Hook for managing report health check state and API calls
 * @returns Object with data, loading, error states and control functions
 */
export function useReportHealthCheck(): UseReportHealthCheckReturn {
    const [data, setData] = useState<ReportHealthCheckResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHealthCheck = useCallback(async (symbol: string) => {
        if (!symbol) {
            setError('Please provide a stock symbol');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await getReportHealthCheck(symbol);
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch report health check';
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
        loading,
        error,
        fetchHealthCheck,
        reset,
    };
}
