/**
 * Company Health History API Response Types
 * Endpoint: /api/v1/financial-health/company/{companyCode}/all
 */

/**
 * Individual quarterly data point from the API
 */
export interface CompanyHealthDataPoint {
    _id: string;
    Company: string;
    QuarterDate: string;
    working_capital_to_total_assets: string;
    retained_earnings_to_total_assets: string;
    ebit_to_total_assets: string;
    mve_to_total_liabilities: string;
    sales_to_total_assets: string;
    current_ratio: string;
    debt_to_equity_ratio: string;
    net_profit_margin: string;
    z_score: string;
    z_score_next_quarter: string;
}

/**
 * Full API response for company health history
 */
export interface CompanyHealthHistoryResponse {
    companyCode: string;
    data: CompanyHealthDataPoint[];
    total: number;
}

/**
 * Transformed data point for charting (numeric values)
 */
export interface ChartDataPoint {
    date: string;
    quarterDate: Date;
    working_capital_to_total_assets: number;
    retained_earnings_to_total_assets: number;
    ebit_to_total_assets: number;
    mve_to_total_liabilities: number;
    sales_to_total_assets: number;
    current_ratio: number;
    debt_to_equity_ratio: number;
    net_profit_margin: number;
    z_score: number;
    z_score_next_quarter: number;
}

/**
 * Metric configuration for chart display
 */
export interface MetricConfig {
    key: keyof Omit<ChartDataPoint, 'date' | 'quarterDate'>;
    label: string;
    color: string;
    description: string;
}

/**
 * Available metrics for selection
 */
export const AVAILABLE_METRICS: MetricConfig[] = [
    {
        key: 'z_score',
        label: 'Z-Score',
        color: '#8b5cf6',
        description: 'Altman Z-Score indicating bankruptcy risk'
    },
    {
        key: 'working_capital_to_total_assets',
        label: 'Working Capital / Total Assets',
        color: '#3b82f6',
        description: 'Liquidity measure'
    },
    {
        key: 'retained_earnings_to_total_assets',
        label: 'Retained Earnings / Total Assets',
        color: '#06b6d4',
        description: 'Accumulated profitability'
    },
    {
        key: 'ebit_to_total_assets',
        label: 'EBIT / Total Assets',
        color: '#10b981',
        description: 'Operating efficiency'
    },
    {
        key: 'mve_to_total_liabilities',
        label: 'MVE / Total Liabilities',
        color: '#22c55e',
        description: 'Market value vs liabilities'
    },
    {
        key: 'sales_to_total_assets',
        label: 'Sales / Total Assets',
        color: '#eab308',
        description: 'Asset turnover'
    },
    {
        key: 'current_ratio',
        label: 'Current Ratio',
        color: '#f97316',
        description: 'Short-term liquidity'
    },
    {
        key: 'debt_to_equity_ratio',
        label: 'Debt to Equity Ratio',
        color: '#ef4444',
        description: 'Financial leverage'
    },
    {
        key: 'net_profit_margin',
        label: 'Net Profit Margin',
        color: '#ec4899',
        description: 'Profitability percentage'
    }
];
