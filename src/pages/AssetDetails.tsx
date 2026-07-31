import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, ReturnBadge } from '../components/ui/Badge';
import { CustomChartTooltip } from '../components/ui/CustomChartTooltip';
import { formatCurrency } from '../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeftRight, Star, ArrowLeft } from 'lucide-react';

export const AssetDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { assets, toggleWatchlist, watchlist } = usePortfolio();

  const asset = assets.find(a => a.symbol.toUpperCase() === (symbol || 'NVDA').toUpperCase()) || assets[0];
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');

  const historyData = [
    { date: 'Jul 01', price: asset.price * 0.94 },
    { date: 'Jul 05', price: asset.price * 0.96 },
    { date: 'Jul 10', price: asset.price * 0.92 },
    { date: 'Jul 15', price: asset.price * 0.98 },
    { date: 'Jul 20', price: asset.price * 1.02 },
    { date: 'Jul 25', price: asset.price * 0.99 },
    { date: 'Jul 28', price: asset.price },
  ];

  return (
    <div className="space-y-8" role="region" aria-label={`Asset Details for ${asset.name}`}>
      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-800 hover:text-slate-950 hover:bg-slate-200 dark:bg-dark-card dark:border-white/10 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Navigate back"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="type-display-l text-slate-900 dark:text-white">{asset.name}</h1>
            <span className="font-mono font-extrabold text-xl text-emerald-700 dark:text-emerald-400">({asset.symbol})</span>
            <Badge variant="neutral">{asset.category}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWatchlist(asset.symbol)}
            className="p-2.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-700 hover:text-amber-500 hover:bg-slate-200 dark:bg-dark-card dark:border-white/10 dark:text-slate-300 dark:hover:text-amber-400 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={`Toggle ${asset.symbol} in watchlist`}
          >
            <Star className={`w-4 h-4 ${watchlist.includes(asset.symbol) ? 'fill-amber-400 text-amber-500' : ''}`} aria-hidden="true" />
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/trading?symbol=${asset.symbol}`)}
            leftIcon={<ArrowLeftRight className="w-4 h-4" aria-hidden="true" />}
            aria-label={`Trade ${asset.symbol}`}
          >
            Trade {asset.symbol}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Price Telemetry & Performance Chart */}
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <div>
              <div className="flex items-baseline gap-3">
                {/* Dominant Live Price Metric */}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono font-mono-nums text-slate-900 dark:text-white tracking-tight">
                  {formatCurrency(asset.price)}
                </span>
                <ReturnBadge value={asset.change24hPercent} />
              </div>
              <CardDescription>Live Price Telemetry & Volume Execution</CardDescription>
            </div>

            <div className="flex bg-slate-100 border border-slate-300 dark:bg-dark-surface1 dark:border-white/10 p-1 rounded-xl" role="toolbar" aria-label="Chart Timeframe Selectors">
              {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-xs font-bold font-mono rounded-lg transition-colors cursor-pointer ${
                    timeframe === t
                      ? 'bg-brand-500 text-slate-950 shadow-emerald-glow font-extrabold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                  aria-selected={timeframe === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 h-80" role="img" aria-label={`Historical price chart for ${asset.symbol}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="assetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16c784" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16c784" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={11} className="font-mono" />
                <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `$${v.toFixed(0)}`} className="font-mono" />
                <Tooltip content={<CustomChartTooltip />} />
                <Area type="monotone" dataKey="price" stroke="#16c784" strokeWidth={2.5} fill="url(#assetGrad)" name="Asset Price" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Fundamental Key Stats Card */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Fundamental Key Stats</CardTitle>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-3.5 text-xs font-mono-nums">
            <div className="flex justify-between py-2.5 border-b border-slate-200 dark:border-white/10">
              <span className="type-caption text-slate-700 dark:text-slate-400 font-semibold">Market Cap:</span>
              <span className="font-mono font-extrabold text-slate-900 dark:text-white">$3.14 Trillion</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-200 dark:border-white/10">
              <span className="type-caption text-slate-700 dark:text-slate-400 font-semibold">P/E Ratio:</span>
              <span className="font-mono font-extrabold text-slate-900 dark:text-white">48.6x</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-200 dark:border-white/10">
              <span className="type-caption text-slate-700 dark:text-slate-400 font-semibold">52-Week High:</span>
              <span className="font-mono font-extrabold text-emerald-700 dark:text-emerald-400">${(asset.price * 1.15).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-200 dark:border-white/10">
              <span className="type-caption text-slate-700 dark:text-slate-400 font-semibold">52-Week Low:</span>
              <span className="font-mono font-extrabold text-red-700 dark:text-red-400">${(asset.price * 0.75).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-200 dark:border-white/10">
              <span className="type-caption text-slate-700 dark:text-slate-400 font-semibold">ESG Rating:</span>
              <span className="font-mono font-extrabold text-emerald-700 dark:text-emerald-400">AA (Top 10%)</span>
            </div>
            <div className="flex justify-between py-2.5 items-center">
              <span className="type-caption text-slate-700 dark:text-slate-400 font-semibold">Analyst Consensus:</span>
              <Badge variant="success" size="sm">STRONG BUY</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
