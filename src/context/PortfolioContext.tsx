import React, { createContext, useContext, useState } from 'react';
import type { Asset, Transaction, AIInsight, UserProfile } from '../types';
import { mockAssets, mockTransactions, mockAIInsights, mockUserProfile } from '../data/mockData';
import { useNotifications } from './NotificationContext';

interface PortfolioContextType {
  user: UserProfile;
  assets: Asset[];
  transactions: Transaction[];
  aiInsights: AIInsight[];
  watchlist: string[];
  totalPortfolioValue: number;
  todaysReturn: number;
  todaysReturnPercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  executeTrade: (trade: {
    symbol: string;
    type: 'BUY' | 'SELL' | 'SWAP';
    quantity: number;
    price: number;
    orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS';
  }) => boolean;
  toggleWatchlist: (symbol: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  dismissInsight: (id: string) => void;
  executeRebalance: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(mockAIInsights);
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'BTC', 'MSFT', 'TSLA']);

  const { addToast } = useNotifications();

  const totalPortfolioValue = assets.reduce((sum, a) => sum + a.holdingsValue, 0);
  const todaysReturn = assets.reduce((sum, a) => sum + (a.change24h * a.holdingsQty), 0);
  const todaysReturnPercent = (todaysReturn / (totalPortfolioValue - todaysReturn)) * 100;

  const totalReturn = assets.reduce((sum, a) => sum + a.totalReturn, 0);
  const totalCostBasis = totalPortfolioValue - totalReturn;
  const totalReturnPercent = (totalReturn / totalCostBasis) * 100;

  const executeTrade = ({
    symbol,
    type,
    quantity,
    price,
    orderType
  }: {
    symbol: string;
    type: 'BUY' | 'SELL' | 'SWAP';
    quantity: number;
    price: number;
    orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS';
  }): boolean => {
    const asset = assets.find(a => a.symbol === symbol);
    if (!asset && type === 'SELL') {
      addToast('Order Rejected', `Asset ${symbol} not in portfolio`, 'error');
      return false;
    }

    const totalCost = quantity * price;
    if (type === 'BUY' && user.cashBalance < totalCost) {
      addToast('Order Failed', `Insufficient Cash Reserve. Required: $${totalCost.toLocaleString()}, Available: $${user.cashBalance.toLocaleString()}`, 'error');
      return false;
    }

    const newTx: Transaction = {
      id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
      assetSymbol: symbol,
      assetName: asset?.name || `${symbol} Asset`,
      type,
      quantity,
      price,
      total: totalCost,
      fee: 0.00,
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      orderType
    };

    setTransactions(prev => [newTx, ...prev]);

    if (type === 'BUY') {
      setUser(prev => ({ ...prev, cashBalance: prev.cashBalance - totalCost }));
      setAssets(prev => prev.map(a => {
        if (a.symbol === symbol) {
          const newQty = a.holdingsQty + quantity;
          const newValue = newQty * a.price;
          return {
            ...a,
            holdingsQty: newQty,
            holdingsValue: newValue,
          };
        }
        return a;
      }));
      addToast('Order Filled', `Successfully bought ${quantity} shares of ${symbol} at $${price.toFixed(2)}`, 'success');
    } else if (type === 'SELL') {
      setUser(prev => ({ ...prev, cashBalance: prev.cashBalance + totalCost }));
      setAssets(prev => prev.map(a => {
        if (a.symbol === symbol) {
          const newQty = Math.max(0, a.holdingsQty - quantity);
          const newValue = newQty * a.price;
          return {
            ...a,
            holdingsQty: newQty,
            holdingsValue: newValue,
          };
        }
        return a;
      }));
      addToast('Order Filled', `Successfully sold ${quantity} shares of ${symbol} for $${totalCost.toLocaleString()}`, 'success');
    }

    return true;
  };

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(symbol);
      if (exists) {
        addToast('Watchlist Updated', `Removed ${symbol} from watchlist`, 'info');
        return prev.filter(s => s !== symbol);
      } else {
        addToast('Watchlist Updated', `Added ${symbol} to watchlist`, 'success');
        return [...prev, symbol];
      }
    });
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profile }));
    addToast('Profile Updated', 'Your preferences have been saved', 'success');
  };

  const dismissInsight = (id: string) => {
    setAiInsights(prev => prev.filter(i => i.id !== id));
  };

  const executeRebalance = () => {
    addToast('AI Rebalance Triggered', 'Portfolio target weights recalculated. Orders queued for execution.', 'success');
  };

  return (
    <PortfolioContext.Provider
      value={{
        user,
        assets,
        transactions,
        aiInsights,
        watchlist,
        totalPortfolioValue,
        todaysReturn,
        todaysReturnPercent,
        totalReturn,
        totalReturnPercent,
        executeTrade,
        toggleWatchlist,
        updateUserProfile,
        dismissInsight,
        executeRebalance,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
