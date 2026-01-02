import companiesData from "@/data/mock/companies.json";
import watchlistData from "@/data/mock/watchlist.json";
import ohlcvData from "@/data/mock/ohlcv_snapshot.json";
import riskResultData from "@/data/mock/risk_result.json";
import predictionResultData from "@/data/mock/prediction_result.json";
import usersData from "@/data/mock/users.json";
import newsData from "@/data/mock/news.json";
import dividendData from "@/data/mock/dividend_prediction.json";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface Company {
  symbol: string;
  name: string;
  sector: string;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  lastClose: number;
  volume: number;
  return1d: number;
  return5d: number;
  riskLevel: "low" | "medium" | "high";
}

export interface OhlcvSnapshot {
  symbol: string;
  name: string;
  open: number;
  high: number;
  low: number;
  close: number;
  prevClose: number;
  volume: number;
  date: string;
}

export interface RiskMetrics {
  var95: number;
  cvar: number;
  beta: number;
  volatility20d: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

export interface RiskResult {
  symbol: string;
  asofDate: string;
  riskMetrics: RiskMetrics;
  drawdownData: Array<{ day: number; drawdown: number }>;
  volatilityData: Array<{ day: number; volatility: number }>;
  returnsData: Array<{ range: string; count: number }>;
}

export interface PredictionResult {
  symbol: string;
  asofDate: string;
  openToday: number;
  predOpenTplus5: number;
  confidence: "low" | "medium" | "high";
  forecastPoints: Array<{ day: number; price: number }>;
  baselinePoints: Array<{ day: number; price: number }>;
  deltaPoints: Array<{ day: number; deltaPrice: number; deltaPct: number }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  displayName: string;
  bio: string;
  joinedDate: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedDate: string;
  summary: string;
  tags: string[];
  content?: string;
}

export interface DividendForecast {
  quarter: string;
  predictedDividend: number;
  probability: number;
}

export interface RiskFactor {
  factor: string;
  impact: string;
  probability: number;
}

// export interface DividendPredictionResult {
//   symbol: string;
//   companyName: string;
//   lastDividend: number;
//   lastDividendDate: string;
//   dividendYield: number;
//   payoutRatio: number;
//   historicalDividends: Array<{ year: number; dividend: number; yield: number }>;
//   prediction: {
//     nextQuarter: number;
//     nextYear: number;
//     growthRate: number;
//     confidence: number;
//     exDividendDate: string;
//     paymentDate: string;
//   };
//   forecast: DividendForecast[];
//   riskFactors: RiskFactor[];
//   insights: string[];
// }

export interface DividendPredictionResult {
  data: {
    features: {
      ROA: { "1": number };
      asset_turnover: { "1": number };
      current_ratio: { "1": number };
      non_current_to_total_assets: { "1": number };
      ROA_x_leverage: { "1": number };
      efficiency_score: { "1": number };
      ROA_lag1: { "1": number };
      profit_margin_lag1: { "1": number };
      debt_to_assets_lag1: { "1": number };
    };
    prediction: {
      probability: number;
      predicted_dividend: number;
      decision: string;
      confidence: string;
      feature_contributions: {
        contributions: Record<string, number>;
        intercept: number;
        top_positive_features: Record<string, number>;
        top_negative_features: Record<string, number>;
        explanation: string;
      };
      investor_explanation: {
        summary: string;
        key_strengths: string[];
        key_concerns: string[];
        recommendation: string;
        risk_assessment: string;
        confidence_level: string;
        model_certainty: string;
      };
    };
    financial_possition: {
      profitability: number;
      efficiency: number;
      liquidity: number;
      leverage: number;
    };
  };
}

export const searchTickers = async (query: string): Promise<Company[]> => {
  await delay(300);
  const q = query.toLowerCase();
  return companiesData.companies.filter(
    (c) =>
      c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
  );
};

export const getWatchlist = async (): Promise<WatchlistItem[]> => {
  await delay(400);
  return watchlistData.watchlist as WatchlistItem[];
};

export const getOhlcvSnapshot = async (
  symbol: string
): Promise<OhlcvSnapshot | null> => {
  await delay(300);
  const data = (ohlcvData as any)[symbol];
  return data || null;
};

export const runRiskAnalysis = async (
  symbol: string,
  _dateRange: { start: string; end: string },
  _riskProfile: string
): Promise<RiskResult> => {
  await delay(1000);
  return {
    ...riskResultData,
    symbol,
  };
};

export const predictNextWeekOpen = async (
  symbol: string
): Promise<PredictionResult> => {
  await delay(1200);
  return {
    ...predictionResultData,
    symbol,
  } as PredictionResult;
};

// Auth API functions
export const authSignIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  await delay(800);
  const user = (usersData as any).mockUsers.find((u: any) => u.email === email);
  if (!user) {
    throw new Error("Email not found");
  }
  if (user.password !== password) {
    throw new Error("Invalid password");
  }
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      displayName: user.displayName,
      bio: user.bio,
      joinedDate: user.joinedDate,
    },
    token: `token_${user.id}_${Date.now()}`,
  };
};

export const authSignUp = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  await delay(1000);
  const existingUser = (usersData as any).mockUsers.find(
    (u: any) => u.email === email
  );
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const newUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    password,
    displayName: name,
    bio: "",
    joinedDate: new Date().toISOString().split("T")[0],
  };
  const newAuthResponse: AuthResponse = {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      displayName: newUser.displayName,
      bio: newUser.bio,
      joinedDate: newUser.joinedDate,
    },
    token: `token_${newUser.id}_${Date.now()}`,
  };
  return newAuthResponse;
};

export const authGetMe = async (token: string): Promise<User> => {
  await delay(300);
  if (!token) {
    throw new Error("No token provided");
  }
  // Mock implementation: extract user ID from token and return user
  const mockUser = (usersData as any).mockUsers[0];
  return {
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    displayName: mockUser.displayName,
    bio: mockUser.bio,
    joinedDate: mockUser.joinedDate,
  };
};

export const authUpdateProfile = async (
  _token: string,
  displayName: string,
  bio: string
): Promise<User> => {
  await delay(500);
  const mockUser = (usersData as any).mockUsers[0];
  return {
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    displayName,
    bio,
    joinedDate: mockUser.joinedDate,
  };
};

// News API functions
export const newsList = async (
  query?: string,
  tag?: string,
  sort?: string
): Promise<NewsArticle[]> => {
  await delay(400);
  let articles = [...(newsData as any).news];

  if (query) {
    const q = query.toLowerCase();
    articles = articles.filter(
      (a: any) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.content?.toLowerCase().includes(q)
    );
  }

  if (tag) {
    articles = articles.filter((a: any) => a.tags.includes(tag));
  }

  if (sort === "oldest") {
    articles.sort(
      (a: any, b: any) =>
        new Date(a.publishedDate).getTime() -
        new Date(b.publishedDate).getTime()
    );
  } else {
    articles.sort(
      (a: any, b: any) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );
  }

  return articles as NewsArticle[];
};

export const newsGetById = async (id: string): Promise<NewsArticle | null> => {
  await delay(300);
  const article = (newsData as any).news.find((a: any) => a.id === id);
  return article || null;
};

export const newsGetAllTags = async (): Promise<string[]> => {
  await delay(200);
  const tags = new Set<string>();
  (newsData as any).news.forEach((a: any) => {
    a.tags.forEach((tag: string) => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const predictDividend = async (
  symbol: string
): Promise<DividendPredictionResult> => {
  const data = await fetchDataFromBackend(symbol);
  if (!data) {
    throw new Error("Dividend data not available for this symbol");
  }
  return data as DividendPredictionResult;
};

// API function to fetch data from backend
export const fetchDataFromBackend = async (symbol: string, year: number = 2024): Promise<DividendPredictionResult> => {
  try {
    const response = await fetch('http://localhost:8001/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firm: symbol,
        year: year,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    throw error;
  }
};
