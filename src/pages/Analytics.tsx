import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { CustomChartTooltip } from '../components/ui/CustomChartTooltip';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Activity, BarChart2, TrendingUp, Zap } from 'lucide-react';

export const Analytics: React.FC = () => {
  const monteCarloData = [
    { month: 'Current', p5: 1248590, p50: 1248590, p95: 1248590 },
    { month: '+2M', p5: 1210000, p50: 1280000, p95: 1350000 },
    { month: '+4M', p5: 1180000, p50: 1320000, p95: 1440000 },
    { month: '+6M', p5: 1220000, p50: 1390000, p95: 1560000 },
    { month: '+8M', p5: 1250000, p50: 1450000, p95: 1680000 },
    { month: '+10M', p5: 1290000, p50: 1520000, p95: 1810000 },
    { month: '+12M', p5: 1340000, p50: 1610000, p95: 1950000 },
  ];

  return (
    <div className="space-y-8" role="region" aria-label="Quantitative Risk & Performance Analytics">
      {/* Hero Panel Header */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm" icon={<Zap className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />}>
              Institutional Risk Engine
            </Badge>
            <span className="type-caption font-mono font-medium">10,000 Iteration Stochastic Engine</span>
          </div>
          <h1 className="type-display-l text-slate-900 dark:text-white">Quantitative Risk & Performance Analytics</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Sharpe ratio, Alpha/Beta factor modeling, and 12-month Monte Carlo probabilistic projections.
          </p>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Sharpe Ratio (1Y)"
          value="2.14"
          subtext="Top 5% Institutional Benchmark"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
          glowing
        />

        <MetricCard
          title="Alpha vs S&P 500"
          value="+4.40%"
          subtext="Excess Return Generation"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
        />

        <MetricCard
          title="Beta Volatility"
          value="1.28"
          subtext="Market Correlation Factor"
          icon={<Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />}
        />

        <MetricCard
          title="Max Drawdown (1Y)"
          value="-8.40%"
          subtext="Stress Test Peak-to-Trough"
          icon={<BarChart2 className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />}
        />
      </div>

      {/* Main Monte Carlo Chart */}
      <Card variant="glass">
        <CardHeader>
          <div>
            <CardTitle>12-Month Monte Carlo Projection Bands</CardTitle>
            <CardDescription>Probabilistic Outcome Bands (5th, 50th, 95th Percentiles)</CardDescription>
          </div>

          {/* High-Contrast Accessible Chart Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 flex-shrink-0" aria-hidden="true" />
              <span className="font-bold text-emerald-900 dark:text-emerald-400 font-mono-nums">95th Percentile ($1.95M)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0" aria-hidden="true" />
              <span className="font-bold text-blue-900 dark:text-blue-300 font-mono-nums">50th Expected ($1.61M)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 dark:bg-slate-800 dark:border-slate-700">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600 dark:bg-slate-400 flex-shrink-0" aria-hidden="true" />
              <span className="font-bold text-slate-800 dark:text-slate-300 font-mono-nums">5th Stress ($1.34M)</span>
            </div>
          </div>
        </CardHeader>

        <div className="p-4 sm:p-6 h-88" role="img" aria-label="12-month Monte Carlo probabilistic projection chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monteCarloData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="p95Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16c784" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16c784" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="p50Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={11} className="font-mono" />
              <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} className="font-mono" />
              <Tooltip content={<CustomChartTooltip />} />
              <Area type="monotone" dataKey="p95" stroke="#16c784" strokeWidth={2.5} fill="url(#p95Grad)" name="95th Percentile" />
              <Area type="monotone" dataKey="p50" stroke="#3b82f6" strokeWidth={2.5} fill="url(#p50Grad)" name="50th Expected" />
              <Area type="monotone" dataKey="p5" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="3 3" fill="none" name="5th Percentile" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
