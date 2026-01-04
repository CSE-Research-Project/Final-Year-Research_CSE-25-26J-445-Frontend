/**
 * Financial Health API Response Types
 * Endpoint: /api/v1/financial-health/analyze-cse/{symbol}
 */

export interface ReportInfo {
    reportDate: string;
    downloadUrl: string;
    reportPeriod: string;
}

export interface FinancialRatios {
    working_capital_to_total_assets: number;
    retained_earnings_to_total_assets: number;
    ebit_to_total_assets: number;
    mve_to_total_liabilities: number;
    sales_to_total_assets: number;
    current_ratio: number;
    debt_to_equity_ratio: number;
    net_profit_margin: number;
    z_score: number;
}

export interface ExtractedData {
    company_name: string;
    report_period: string;
    currency: string;
    ratios: FinancialRatios;
}

export interface Prediction {
    model_name: string;
    timestamp: string;
    z_score_next_quarter: number;
}

export interface RiskAssessment {
    zone: 'Distress' | 'Grey' | 'Safe';
    description: string;
}

export interface FeatureImpact {
    feature: string;
    displayName: string;
    value: number;
    impact: number;
    direction: 'positive' | 'negative';
    thresholdContext: string;
}

export interface FactorSummary {
    feature: string;
    value: number;
    impact: number;
    context: string;
}

export interface Explanation {
    summary: string;
    keyDrivers: string[];
    featureImpacts: FeatureImpact[];
    topPositiveFactors: FactorSummary[];
    topNegativeFactors: FactorSummary[];
    recommendations: string[];
}

export interface FinancialHealthResponse {
    symbol: string;
    reportInfo: ReportInfo;
    extractedData: ExtractedData;
    prediction: Prediction;
    riskAssessment: RiskAssessment;
    explanation: Explanation;
}

/**
 * Report Health Check API Response Types
 * Endpoint: /api/v1/financial-health/report-health-check/{symbol}
 */

export interface StandardHealthCheck {
    name: string;
    score: number;
    status: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Critical';
    description: string;
}

export interface DynamicHealthCheck {
    name: string;
    score: number;
    status: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Critical';
    description: string;
    relevanceReason: string;
}

export interface ReportHealthCheckResponse {
    symbol: string;
    companyName: string;
    detectedIndustry: string;
    reportInfo: ReportInfo;
    standardHealthChecks: StandardHealthCheck[];
    dynamicHealthChecks: DynamicHealthCheck[];
    overallScore: number;
    overallStatus: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Critical';
    recommendations: string[];
    analysisNotes: string;
}
