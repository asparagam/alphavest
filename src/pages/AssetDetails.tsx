import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, ReturnBadge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/formatters';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowLeft, ArrowUpRight, Sparkles, Star } from 'lucide-react';

export const AssetDetails: React.FC = () => {
  const { symbol = 'NVDA' } = useParams<{ symbol: string }>();
  const { assets, watchlist, toggleWatchlist } = usePortfolio();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');

  const asset = assets.find(a => a.symbol.toUpperCase() === symbol.toUpperCase()) || assets[0];
  const isWatchlisted = watchlist.includes(asset.symbol);

  const chartData = [
    { date: 'Jul 01', price: asset.price * 0.88 },
    { date: 'Jul 05', price: asset.price * 0.92 },
    { date: 'Jul 10', price: asset.price * 0.90 },
    { date: 'Jul 15', price: asset.price * 0.95 },
    { date: 'Jul 20', price: asset.price * 0.98 },
    { date: 'Jul 25', price: asset.price * 0.97 },
    { date: 'Jul 28', price: asset.price },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWatchlist(asset.symbol)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isWatchlisted
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-dark-surface text-slate-300 border-dark-border hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-amber-400' : ''}`} />
            {isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/trading?symbol=${asset.symbol}`)}
            leftIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Trade {asset.symbol}
          </Button>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-brand-500/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center font-bold font-mono text-xl text-brand-400 shadow-lg">
            {asset.symbol.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold font-display text-slate-100">{asset.name}</h1>
              <Badge variant="brand" size="sm">{asset.category}</Badge>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              NASDAQ: {asset.symbol} • ESG Rating: {asset.esgRating || 'A'}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-extrabold font-mono text-slate-100">{formatCurrency(asset.price)}</div>
          <div className="mt-1 flex items-center justify-end gap-2">
            <ReturnBadge value={asset.change24hPercent} percent={true} />
            <span className="text-xs text-slate-400 font-mono">
              ({asset.change24h >= 0 ? '+' : ''}${asset.change24h.toFixed(2)})
            </span>
          </div>
        </div>
      </div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <CardTitle>Historical Price Performance</CardTitle>
          <div className="flex items-center bg-dark-surface/90 border border-dark-border p-1 rounded-xl">
            {(['1D', '1W', '1M', '1Y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  timeRange === r ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="assetChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(v) => `$${v.toFixed(0)}`} />
              <Tooltip formatter={(v: any) => [`$${Number(v).toFixed(2)}`, 'Price']} />
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#assetChartGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Key Market Metrics & Position</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Your Holdings Qty</span>
              <div className="text-base font-bold font-mono text-slate-100 mt-1">
                {asset.holdingsQty.toLocaleString()} {asset.symbol}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Position Value</span>
              <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                {formatCurrency(asset.holdingsValue)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg Cost Basis</span>
              <div className="text-base font-bold font-mono text-slate-100 mt-1">
                {formatCurrency(asset.avgCost)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Market Cap</span>
              <div className="text-base font-bold font-mono text-slate-100 mt-1">
                {asset.marketCap || 'N/A'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">52-Week Range</span>
              <div className="text-xs font-bold font-mono text-slate-100 mt-1">
                ${asset.low52w || '0'} - ${asset.high52w || '0'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">P/E Ratio</span>
              <div className="text-base font-bold font-mono text-slate-100 mt-1">
                {asset.peRatio || 'N/A'}
              </div>
            </div>
          </div>
        </Card>

        <Card variant="ai">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ai-400" />
              <CardTitle>Analyst Consensus</CardTitle>
            </div>
          </CardHeader>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-semibold">
                <span className="text-emerald-400">Strong Buy (82%)</span>
                <span className="text-slate-400">18 Analysts</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[82%]" />
                <div className="bg-amber-500 h-full w-[12%]" />
                <div className="bg-red-500 h-full w-[6%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-dark-card/80 border border-dark-border/60 text-xs space-y-2">
              <div className="font-bold text-slate-200">AI Target Rating: OUTPERFORM</div>
              <p className="text-slate-400 leading-relaxed">
                Neural sentiment analysis indicates institutional momentum supported by robust Q3 earnings forecasts.
              </p>
            </div>

            <Button
              variant="ai"
              size="md"
              fullWidth
              onClick={() => navigate('/copilot')}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Ask AI Deep-Dive Analysis
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
