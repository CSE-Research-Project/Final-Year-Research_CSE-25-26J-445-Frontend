/**
 * Custom hook for fetching financial health analysis data
 */

import { useState, useCallback } from 'react';
import { FinancialHealthResponse } from '@/lib/types/financial-health.types';
import { analyzeFinancialHealth } from '@/lib/api/financial-health.api';

interface UseFinancialHealthReturn {
    data: FinancialHealthResponse | null;
    loading: boolean;
    error: string | null;
    fetchAnalysis: (symbol: string) => Promise<void>;
    reset: () => void;
}

/**
 * Hook for managing financial health analysis state and API calls
 * @returns Object with data, loading, error states and control functions
 */
export function useFinancialHealth(): UseFinancialHealthReturn {
    const [data, setData] = useState<FinancialHealthResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalysis = useCallback(async (symbol: string) => {
        if (!symbol) {
            setError('Please provide a stock symbol');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await analyzeFinancialHealth(symbol);
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch financial health data';
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
        fetchAnalysis,
        reset,
    };
}
