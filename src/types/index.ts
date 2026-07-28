export type AssetCategory = 'stock' | 'etf' | 'crypto' | 'bond' | 'cash';

export interface Asset {
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  change24h: number;
  change24hPercent: number;
  holdingsQty: number;
  holdingsValue: number;
  avgCost: number;
  totalReturn: number;
  totalReturnPercent: number;
  allocationPercent: number;
  marketCap?: string;
  peRatio?: number;
  high52w?: number;
  low52w?: number;
  volume24h?: string;
  esgRating?: string;
  sparkline: number[];
  riskScore: number; // 1-100
}

export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_LOSS';
export type OrderSide = 'BUY' | 'SELL' | 'SWAP';

export interface Transaction {
  id: string;
  assetSymbol: string;
  assetName: string;
  type: OrderSide;
  quantity: number;
  price: number;
  total: number;
  fee: number;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  timestamp: string;
  orderType: OrderType;
}

export interface PerformanceDataPoint {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
  spyValue: number;
  qqqValue: number;
  dailyReturn: number;
}

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  category: 'REBALANCE' | 'TAX_HARVEST' | 'RISK_ALERT' | 'OPPORTUNITY' | 'MACRO';
  impactScore: 'HIGH' | 'MEDIUM' | 'LOW';
  date: string;
  recommendedAction?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'SYSTEM' | 'SECURITY' | 'TRADE' | 'AI_INSIGHT' | 'MARKET_ALERT';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  tier: 'Alpha Black (Private Wealth)' | 'Alpha Gold' | 'Standard';
  netWorth: number;
  cashBalance: number;
  riskTolerance: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE' | 'HYPER_GROWTH';
  twoFactorEnabled: boolean;
  biometricLogin: boolean;
  aiAggressiveness: 'BALANCED' | 'PROACTIVE' | 'CONSERVATIVE';
  autoRebalance: boolean;
  theme: 'dark' | 'light';
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
}

export interface SectorAllocation {
  sector: string;
  percentage: number;
  value: number;
  color: string;
}

export interface MonthlyReturn {
  year: number;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  total: number;
}
