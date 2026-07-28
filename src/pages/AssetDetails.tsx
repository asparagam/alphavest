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
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl border border-dark-border bg-dark-card text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="type-heading-xl text-slate-100">{asset.name}</h1>
            <span className="font-mono font-bold text-lg text-brand-400">({asset.symbol})</span>
            <Badge variant="neutral">{asset.category}</Badge>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleWatchlist(asset.symbol)}
              className="p-2.5 rounded-xl border border-dark-border bg-dark-card text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Star className={`w-4 h-4 ${watchlist.includes(asset.symbol) ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/trading?symbol=${asset.symbol}`)}
              leftIcon={<ArrowLeftRight className="w-4 h-4" />}
            >
              Trade {asset.symbol}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold font-mono font-mono-nums text-slate-100">{formatCurrency(asset.price)}</span>
                <ReturnBadge value={asset.change24hPercent} />
              </div>
              <CardDescription>Live Price Telemetry & Volume</CardDescription>
            </div>

            <div className="flex bg-dark-surface p-1 rounded-xl border border-dark-border">
              {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-xs font-bold font-mono rounded-lg transition-colors cursor-pointer ${
                    timeframe === t ? 'bg-brand-500 text-white shadow-emerald-glow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </CardHeader>

          <div className="p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="assetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} className="font-mono" />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v.toFixed(0)}`} className="font-mono" />
                <Tooltip content={<CustomChartTooltip />} />
                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2.5} fill="url(#assetGrad)" name="Asset Price" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Fundamental Key Stats</CardTitle>
          </CardHeader>

          <div className="p-6 space-y-4 text-xs font-mono-nums">
            <div className="flex justify-between py-2 border-b border-dark-border/40">
              <span className="type-caption text-slate-400">Market Cap:</span>
              <span className="font-bold text-slate-100">$3.14 Trillion</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-border/40">
              <span className="type-caption text-slate-400">P/E Ratio:</span>
              <span className="font-bold text-slate-100">48.6x</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-border/40">
              <span className="type-caption text-slate-400">52-Week High:</span>
              <span className="font-bold text-emerald-400">${(asset.price * 1.15).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-border/40">
              <span className="type-caption text-slate-400">52-Week Low:</span>
              <span className="font-bold text-red-400">${(asset.price * 0.75).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-border/40">
              <span className="type-caption text-slate-400">ESG Sustainability Rating:</span>
              <span className="font-bold text-brand-400">AA (Top 10%)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="type-caption text-slate-400">Analyst Consensus:</span>
              <Badge variant="success" size="sm">STRONG BUY</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
