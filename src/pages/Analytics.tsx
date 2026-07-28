import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { CustomChartTooltip } from '../components/ui/CustomChartTooltip';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Activity, BarChart2, TrendingUp } from 'lucide-react';

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
    <div className="space-y-8">
      <div className="glass-panel p-6 border-brand-500/30">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">Institutional Risk Engine</Badge>
          <span className="type-caption font-mono">10,000 Iteration Stochastic Engine</span>
        </div>
        <h1 className="type-heading-xl text-slate-100">Quantitative Risk & Performance Analytics</h1>
        <p className="type-body text-slate-400 mt-1">
          Sharpe ratio, Alpha/Beta factor modeling, and 12-month Monte Carlo probabilistic projections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Sharpe Ratio (1Y)"
          value="2.14"
          subtext="Top 5% Institutional Benchmark"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          glowing
        />

        <MetricCard
          title="Alpha vs S&P 500"
          value="+4.40%"
          subtext="Excess Return Generation"
          icon={<TrendingUp className="w-5 h-5 text-brand-400" />}
        />

        <MetricCard
          title="Beta Volatility"
          value="1.28"
          subtext="Market Correlation Factor"
          icon={<Activity className="w-5 h-5 text-purple-400" />}
        />

        <MetricCard
          title="Max Drawdown (1Y)"
          value="-8.40%"
          subtext="Stress Test Peak-to-Trough"
          icon={<BarChart2 className="w-5 h-5 text-amber-400" />}
        />
      </div>

      <Card variant="glass">
        <CardHeader>
          <div>
            <CardTitle>12-Month Monte Carlo Projection Bands</CardTitle>
            <CardDescription>Probabilistic Outcome Bands (5th, 50th, 95th Percentiles)</CardDescription>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300">95th Percentile ($1.95M)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate-300">50th Expected ($1.61M)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span className="text-slate-300">5th Stress ($1.34M)</span>
            </div>
          </div>
        </CardHeader>

        <div className="p-6 h-88">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monteCarloData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="p95Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="p50Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} className="font-mono" />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} className="font-mono" />
              <Tooltip content={<CustomChartTooltip />} />
              <Area type="monotone" dataKey="p95" stroke="#10b981" strokeWidth={2} fill="url(#p95Grad)" name="95th Percentile" />
              <Area type="monotone" dataKey="p50" stroke="#3b82f6" strokeWidth={2} fill="url(#p50Grad)" name="50th Expected" />
              <Area type="monotone" dataKey="p5" stroke="#64748b" strokeWidth={1.5} strokeDasharray="3 3" fill="none" name="5th Percentile" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
