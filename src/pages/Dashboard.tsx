import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MetricCard } from '../components/ui/MetricCard';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CustomChartTooltip } from '../components/ui/CustomChartTooltip';
import { formatCurrency } from '../utils/formatters';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  Award,
  Bot,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const {
    user,
    totalPortfolioValue,
    todaysReturn,
    todaysReturnPercent,
    totalReturn,
    totalReturnPercent,
    aiInsights,
    executeRebalance,
    dismissInsight,
  } = usePortfolio();

  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | 'YTD' | '1Y' | 'ALL'>('1Y');
  const [showBenchmark, setShowBenchmark] = useState(true);
  const navigate = useNavigate();

  const performanceData = [
    { date: 'Jan 23', AlphaVest: 920000, Benchmark: 900000 },
    { date: 'Mar 23', AlphaVest: 975000, Benchmark: 930000 },
    { date: 'Jun 23', AlphaVest: 1040000, Benchmark: 980000 },
    { date: 'Sep 23', AlphaVest: 1010000, Benchmark: 960000 },
    { date: 'Dec 23', AlphaVest: 1120000, Benchmark: 1020000 },
    { date: 'Mar 24', AlphaVest: 1190000, Benchmark: 1070000 },
    { date: 'Jun 24', AlphaVest: 1248590, Benchmark: 1110000 },
  ];

  const allocationData = [
    { name: 'Tech Equities', value: 598820, color: '#10b981' },
    { name: 'Digital Assets', value: 278300, color: '#3b82f6' },
    { name: 'Broad Market ETFs', value: 124500, color: '#8b5cf6' },
    { name: 'Government Bonds', value: 124500, color: '#f59e0b' },
    { name: 'Cash Reserves', value: 122470, color: '#64748b' },
  ];

  const monthlyHeatmap = [
    { month: 'Jan', returnVal: 4.2 },
    { month: 'Feb', returnVal: 2.8 },
    { month: 'Mar', returnVal: -1.4 },
    { month: 'Apr', returnVal: 5.1 },
    { month: 'May', returnVal: 3.6 },
    { month: 'Jun', returnVal: 1.9 },
  ];

  return (
    <div className="space-y-8">
      {/* Executive Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 border-brand-500/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">UHNW Wealth Engine</Badge>
            <span className="type-caption font-mono">Live Session • 256-bit Hardware Encrypted</span>
          </div>
          <h1 className="type-heading-xl text-slate-100 dark:text-slate-100 light:text-slate-900">
            Executive Wealth Overview
          </h1>
          <p className="type-body text-slate-400 dark:text-slate-400 light:text-slate-600">
            Welcome back, {user.name}. Your total net worth is performing <span className="font-bold text-emerald-400">+4.4% ahead</span> of S&P 500 benchmark.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ai"
            size="md"
            onClick={executeRebalance}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            One-Click Rebalance
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/trading')}
            leftIcon={<ArrowUpRight className="w-4 h-4" />}
          >
            Execute Order
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid — Dominant Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Net Worth"
          value={formatCurrency(totalPortfolioValue)}
          changePercent={todaysReturnPercent}
          subtext="vs yesterday"
          icon={<Wallet className="w-5 h-5 text-emerald-400" />}
          sparkline={[1180000, 1195000, 1210000, 1205000, 1230000, 1248590]}
          glowing
        />

        <MetricCard
          title="Today's Return"
          value={formatCurrency(todaysReturn)}
          changePercent={todaysReturnPercent}
          subtext="24h PnL"
          icon={<TrendingUp className="w-5 h-5 text-brand-400" />}
          sparkline={[12000, 14500, 9800, 11200, 14320]}
        />

        <MetricCard
          title="Unrealized Total Profit"
          value={formatCurrency(totalReturn)}
          changePercent={totalReturnPercent}
          subtext="All-time Cost Basis"
          icon={<Award className="w-5 h-5 text-purple-400" />}
          sparkline={[290000, 310000, 325000, 340000, 348590]}
        />

        <MetricCard
          title="Available Cash Reserve"
          value={formatCurrency(user.cashBalance)}
          subtext="Yielding 4.95% APY"
          icon={<Wallet className="w-5 h-5 text-amber-400" />}
          variant="solid"
        />
      </div>

      {/* Main Interactive Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Portfolio Performance Dynamics</CardTitle>
              <CardDescription>Historical Valuation vs S&P 500 Institutional Benchmark</CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowBenchmark(!showBenchmark)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  showBenchmark
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-dark-surface text-slate-400 border-dark-border hover:text-white'
                }`}
              >
                Benchmark
              </button>

              <div className="flex bg-dark-surface p-1 rounded-xl border border-dark-border/80">
                {(['1D', '1W', '1M', 'YTD', '1Y', 'ALL'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-2.5 py-1 text-xs font-bold font-mono rounded-lg transition-colors cursor-pointer ${
                      timeframe === t
                        ? 'bg-brand-500 text-white shadow-emerald-glow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>

          <div className="p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBench" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  className="font-mono"
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  className="font-mono"
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="AlphaVest"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorAlpha)"
                  name="AlphaVest Net Worth"
                />
                {showBenchmark && (
                  <Area
                    type="monotone"
                    dataKey="Benchmark"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#colorBench)"
                    name="S&P 500 Benchmark"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Allocation Pie Chart */}
        <Card variant="glass">
          <CardHeader>
            <div>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Multi-Asset Portfolio Spread</CardDescription>
            </div>
          </CardHeader>

          <div className="p-6 flex flex-col items-center justify-center">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full space-y-2 mt-4 pt-4 border-t border-dark-border/40">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs font-mono-nums">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="type-caption text-slate-300 dark:text-slate-300 light:text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* AI Strategy Alerts & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="ai" className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-ai-400 animate-pulse" />
              <CardTitle>Neural Strategy Stream</CardTitle>
            </div>
            <Badge variant="ai" size="sm">Real-Time Diagnostics</Badge>
          </CardHeader>

          <div className="p-6 space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-xl bg-dark-card/90 border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-100">{insight.title}</span>
                    <Badge variant={insight.impactScore === 'HIGH' ? 'danger' : 'brand'} size="sm">
                      {insight.impactScore} Impact
                    </Badge>
                  </div>
                  <p className="type-caption text-slate-300 leading-relaxed">{insight.summary}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ai"
                    size="sm"
                    onClick={executeRebalance}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Apply Action
                  </Button>
                  <button
                    onClick={() => dismissInsight(insight.id)}
                    className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Performance Return Heatmap */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Monthly Return Matrix</CardTitle>
            <CardDescription>2024 Yield Performance</CardDescription>
          </CardHeader>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-3">
              {monthlyHeatmap.map((item) => (
                <div
                  key={item.month}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 ${
                    item.returnVal >= 0
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  <span className="type-overline text-slate-400 font-bold">{item.month}</span>
                  <span className="font-mono font-bold text-xs font-mono-nums">
                    {item.returnVal >= 0 ? '+' : ''}{item.returnVal}%
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/40 flex items-center justify-between text-xs text-slate-400">
              <span>Avg Monthly Alpha:</span>
              <span className="font-mono font-bold text-emerald-400">+2.70%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Mandatory Portfolio FinTech Legal Disclaimer */}
      <div className="p-4 rounded-xl bg-dark-card/60 border border-dark-border/60 flex items-center gap-3 text-xs text-slate-400">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <p className="type-caption leading-relaxed">
          AlphaVest is a conceptual enterprise FinTech product created for UX/UI portfolio purposes. It does not provide financial services, execute live trades, or offer investment advice.
        </p>
      </div>
    </div>
  );
};
