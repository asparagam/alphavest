import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ShieldCheck, Activity, TrendingUp, Layers } from 'lucide-react';

export const Analytics: React.FC = () => {
  const monteCarloData = [
    { month: 'Current', p5: 1248590, p50: 1248590, p95: 1248590 },
    { month: 'Month 2', p5: 1190000, p50: 1280000, p95: 1350000 },
    { month: 'Month 4', p5: 1150000, p50: 1320000, p95: 1450000 },
    { month: 'Month 6', p5: 1180000, p50: 1380000, p95: 1560000 },
    { month: 'Month 8', p5: 1210000, p50: 1440000, p95: 1680000 },
    { month: 'Month 10', p5: 1250000, p50: 1510000, p95: 1820000 },
    { month: 'Month 12', p5: 1300000, p50: 1590000, p95: 1980000 },
  ];

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 border-brand-500/30">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">Quantitative Engine</Badge>
          <span className="text-xs text-slate-400 font-mono">10,000 Iterations</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-slate-100">Deep Risk & Performance Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Advanced Sharpe ratio calculation, Monte Carlo forecasting, and Value-at-Risk (VaR) modeling.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Sharpe Ratio (Risk-Adjusted)"
          value="2.14"
          subtext="Top 5% Benchmark"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          glowing={true}
        />
        <MetricCard
          title="Alpha vs S&P 500"
          value="+4.40%"
          subtext="Excess Return"
          icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
        />
        <MetricCard
          title="Portfolio Beta"
          value="1.28"
          subtext="Moderate Growth Volatility"
          icon={<Activity className="w-5 h-5 text-purple-400" />}
        />
        <MetricCard
          title="Max Drawdown (1Y)"
          value="-8.40%"
          subtext="95% Confidence Limit"
          icon={<Layers className="w-5 h-5 text-amber-400" />}
        />
      </div>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>12-Month Monte Carlo Projection ($ Net Worth)</CardTitle>
          <CardDescription>Simulated 10,000 market paths with 5th, 50th, and 95th percentile confidence bands</CardDescription>
        </CardHeader>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monteCarloData}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Value']} />
              <Legend />
              <Line type="monotone" dataKey="p95" name="95th Percentile (Bull Case)" stroke="#10b981" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="p50" name="50th Percentile (Expected)" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="p5" name="5th Percentile (Bear Case)" stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
