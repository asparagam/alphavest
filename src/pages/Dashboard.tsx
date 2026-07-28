import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Sparkles,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  DollarSign,
  PieChart as PieIcon,
  Flame,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { MetricCard } from '../components/ui/MetricCard';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockPerformanceHistory, mockSectors, mockMonthlyReturns } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const {
    totalPortfolioValue,
    todaysReturn,
    todaysReturnPercent,
    totalReturn,
    totalReturnPercent,
    aiInsights,
    executeRebalance,
    dismissInsight,
  } = usePortfolio();

  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'YTD' | 'ALL'>('1M');
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [showSpy, setShowSpy] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 bg-gradient-to-r from-dark-card via-dark-surface to-brand-950/20 border-brand-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">
              <Zap className="w-3 h-3 mr-1" /> Alpha Private Wealth
            </Badge>
            <span className="text-xs text-slate-400 font-mono">Live Telemetry</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold font-display text-slate-100 tracking-tight">
            Portfolio Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-asset wealth management powered by neural predictive models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ai"
            size="md"
            onClick={executeRebalance}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            AI One-Click Rebalance
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/trading')}
            leftIcon={<ArrowUpRight className="w-4 h-4" />}
          >
            Execute Trade
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio Value"
          value={formatCurrency(totalPortfolioValue)}
          change={todaysReturn}
          changePercent={todaysReturnPercent}
          subtext="Updated 1 min ago"
          icon={<DollarSign className="w-5 h-5" />}
          glowing={true}
          sparkline={[1180, 1192, 1185, 1210, 1228, 1234, 1248]}
        />

        <MetricCard
          title="Today's Gain / Loss"
          value={formatCurrency(todaysReturn)}
          changePercent={todaysReturnPercent}
          subtext="vs Previous Close"
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
          sparkline={[10, 22, 15, 30, 28, 35, 42]}
        />

        <MetricCard
          title="Unrealized Total Return"
          value={formatCurrency(totalReturn)}
          changePercent={totalReturnPercent}
          subtext="Cost Basis: $900,000"
          icon={<Flame className="w-5 h-5 text-amber-400" />}
        />

        <MetricCard
          title="S&P 500 Benchmark"
          value="+14.20% YTD"
          changePercent={4.40}
          subtext="Alpha: +4.40% Outperformance"
          icon={<ShieldCheck className="w-5 h-5 text-blue-400" />}
        />
      </div>

      <Card variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <CardTitle>Performance Overview & Benchmark Analysis</CardTitle>
            <CardDescription>Interactive historical valuation with AI risk overlay</CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                showBenchmark
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                  : 'bg-dark-surface text-slate-400 border-dark-border'
              }`}
            >
              Benchmark (S&P 500)
            </button>
            <button
              onClick={() => setShowSpy(!showSpy)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                showSpy
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                  : 'bg-dark-surface text-slate-400 border-dark-border'
              }`}
            >
              NASDAQ (QQQ)
            </button>

            <div className="flex items-center bg-dark-surface/90 border border-dark-border p-1 rounded-xl">
              {(['1D', '1W', '1M', '3M', '1Y', 'YTD', 'ALL'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    timeRange === range
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockPerformanceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorQqq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Valuation']}
                contentStyle={{ borderRadius: '12px' }}
              />
              <Area
                type="monotone"
                dataKey="portfolioValue"
                name="AlphaVest Portfolio"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPortfolio)"
              />
              {showBenchmark && (
                <Area
                  type="monotone"
                  dataKey="benchmarkValue"
                  name="S&P 500 Index"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorBenchmark)"
                />
              )}
              {showSpy && (
                <Area
                  type="monotone"
                  dataKey="qqqValue"
                  name="NASDAQ 100"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorQqq)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="ai" className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ai-400 animate-pulse" />
              <CardTitle>AI Neural Strategy Insights</CardTitle>
            </div>
            <Badge variant="ai" size="sm">Real-time Signals</Badge>
          </CardHeader>

          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-xl bg-dark-card/90 border border-dark-border/80 hover:border-ai-500/40 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md uppercase bg-ai-500/20 text-ai-400 border border-ai-500/30">
                      {insight.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-100">{insight.title}</h4>
                  </div>
                  <button
                    onClick={() => dismissInsight(insight.id)}
                    className="text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.summary}</p>
                {insight.recommendedAction && (
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-brand-400">
                      Action: {insight.recommendedAction}
                    </span>
                    <Button variant="ai" size="sm" onClick={() => navigate('/copilot')}>
                      Review with Copilot
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-brand-400" />
              <CardTitle>Asset Allocation</CardTitle>
            </div>
          </CardHeader>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockSectors}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="percentage"
                >
                  {mockSectors.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} stroke="#0d1322" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, 'Allocation']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-2">
            {mockSectors.map((s) => (
              <div key={s.sector} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-300 font-medium">{s.sector}</span>
                </div>
                <span className="font-mono font-bold text-slate-100">{s.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>Historical Monthly Performance Heatmap (%)</CardTitle>
          <CardDescription>Track compounding monthly returns across market cycles</CardDescription>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs">
            <thead className="bg-dark-surface/90 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-3 text-left">Year</th>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <th key={m} className="py-3 px-2">{m}</th>
                ))}
                <th className="py-3 px-3 text-right">YTD Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/40 font-mono">
              {mockMonthlyReturns.map((row) => (
                <tr key={row.year} className="hover:bg-white/5">
                  <td className="py-3 px-3 text-left font-bold text-slate-200">{row.year}</td>
                  {[row.jan, row.feb, row.mar, row.apr, row.may, row.jun, row.jul, row.aug, row.sep, row.oct, row.nov, row.dec].map((val, i) => (
                    <td key={i} className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-md font-semibold inline-block min-w-[42px] ${
                        val > 0
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : val < 0
                          ? 'bg-red-500/20 text-red-400'
                          : 'text-slate-400'
                      }`}>
                        {val !== 0 ? `${val > 0 ? '+' : ''}${val}%` : '-'}
                      </span>
                    </td>
                  ))}
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">
                    +{row.total}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
