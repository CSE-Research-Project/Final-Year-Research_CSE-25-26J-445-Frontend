/**
 * Financial Health API Service
 * Handles all API calls related to financial health analysis
 */

import { FinancialHealthResponse, ReportHealthCheckResponse } from '@/lib/types/financial-health.types';
import { CompanyHealthHistoryResponse } from '@/lib/types/company-health-history.types';

// API base URL - can be configured via environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3400';

/**
 * Get all historical financial health data for a company
 * @param companyCode - The company code (e.g., "acl_n0000")
 * @returns Promise with the historical financial health data
 */
export async function getCompanyHealthHistory(companyCode: string): Promise<CompanyHealthHistoryResponse> {
    const encodedCode = encodeURIComponent(companyCode.toLowerCase().replace('.', '_'));
    const url = `${API_BASE_URL}/api/v1/financial-health/company/${encodedCode}/all`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || `Failed to fetch company health history: ${response.status} ${response.statusText}`
            );
        }

        const data: CompanyHealthHistoryResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred while fetching company health history');
    }
}

/**
 * Analyze financial health for a CSE-listed company
 * @param symbol - The stock symbol (e.g., "ALUM.N0000")
 * @returns Promise with the financial health analysis data
 */
export async function analyzeFinancialHealth(symbol: string): Promise<FinancialHealthResponse> {
    const encodedSymbol = encodeURIComponent(symbol);
    const url = `${API_BASE_URL}/api/v1/financial-health/analyze-cse/${encodedSymbol}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || `Failed to analyze financial health: ${response.status} ${response.statusText}`
            );
        }

        const data: FinancialHealthResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred while analyzing financial health');
    }
}

/**
 * Get report health check for a CSE-listed company
 * @param symbol - The stock symbol (e.g., "CERA.N0000")
 * @returns Promise with the report health check data
 */
export async function getReportHealthCheck(symbol: string): Promise<ReportHealthCheckResponse> {
    const encodedSymbol = encodeURIComponent(symbol);
    const url = `${API_BASE_URL}/api/v1/financial-health/report-health-check/${encodedSymbol}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || `Failed to fetch report health check: ${response.status} ${response.statusText}`
            );
        }

        const data: ReportHealthCheckResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred while fetching report health check');
    }
}

