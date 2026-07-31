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
  Clock,
  Zap,
  AlertCircle,
  AlertTriangle,
  Info,
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
    { name: 'Tech Equities', value: 598820, color: '#16c784' },
    { name: 'Digital Assets', value: 278300, color: '#3b82f6' },
    { name: 'Broad Market ETFs', value: 124500, color: '#7c3aed' },
    { name: 'Government Bonds', value: 124500, color: '#f59e0b' },
    { name: 'Cash Reserves', value: 122470, color: '#6b7280' },
  ];

  const monthlyHeatmap = [
    { month: 'Jan', returnVal: 4.2 },
    { month: 'Feb', returnVal: 2.8 },
    { month: 'Mar', returnVal: -1.4 },
    { month: 'Apr', returnVal: 5.1 },
    { month: 'May', returnVal: 3.6 },
    { month: 'Jun', returnVal: 1.9 },
  ];

  const getImpactBadge = (score: string) => {
    switch (score) {
      case 'HIGH':
        return (
          <Badge variant="danger" size="sm" icon={<AlertCircle className="w-3 h-3 text-red-500 dark:text-red-400" aria-hidden="true" />}>
            HIGH IMPACT
          </Badge>
        );
      case 'MEDIUM':
        return (
          <Badge variant="warning" size="sm" icon={<AlertTriangle className="w-3 h-3 text-amber-500 dark:text-amber-400" aria-hidden="true" />}>
            MEDIUM IMPACT
          </Badge>
        );
      default:
        return (
          <Badge variant="brand" size="sm" icon={<Info className="w-3 h-3 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />}>
            LOW IMPACT
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-8" role="region" aria-label="Executive Wealth Overview Dashboard">
      {/* Redesigned Premium Hero Banner Header */}
      <div className="hero-panel flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" size="sm" icon={<Zap className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />}>
              {user.tier}
            </Badge>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 type-caption font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              <span>Last synced: Just now • SOC2 Type II</span>
            </div>
          </div>

          <h1 className="type-display-l text-slate-900 dark:text-slate-100">
            Executive Wealth Overview
          </h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300">
            Welcome back, {user.name}. Your portfolio is running <span className="font-bold text-emerald-600 dark:text-emerald-400">+4.4% ahead</span> of S&P 500 benchmark with $124.5k in active cash reserves.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
          <Button
            variant="ai"
            size="md"
            onClick={executeRebalance}
            leftIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
            aria-label="Trigger One-Click AI Rebalance"
          >
            One-Click Rebalance
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/trading')}
            leftIcon={<ArrowUpRight className="w-4 h-4" aria-hidden="true" />}
            aria-label="Execute Order"
          >
            Execute Order
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Net Worth"
          value={formatCurrency(totalPortfolioValue)}
          changePercent={todaysReturnPercent}
          subtext="vs yesterday"
          icon={<Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
          sparkline={[1180000, 1195000, 1210000, 1205000, 1230000, 1248590]}
          glowing
        />

        <MetricCard
          title="Today's Return"
          value={formatCurrency(todaysReturn)}
          changePercent={todaysReturnPercent}
          subtext="24h PnL"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
          sparkline={[12000, 14500, 9800, 11200, 14320]}
        />

        <MetricCard
          title="Unrealized Total Profit"
          value={formatCurrency(totalReturn)}
          changePercent={totalReturnPercent}
          subtext="All-time Cost Basis"
          icon={<Award className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />}
          sparkline={[290000, 310000, 325000, 340000, 348590]}
        />

        <MetricCard
          title="Available Cash Reserve"
          value={formatCurrency(user.cashBalance)}
          subtext="Yielding 4.95% APY"
          icon={<Wallet className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />}
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
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  showBenchmark
                    ? 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/40'
                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:text-slate-900 dark:bg-dark-surface1 dark:text-slate-300 dark:border-white/10 dark:hover:text-white'
                }`}
                aria-pressed={showBenchmark}
                aria-label="Toggle Benchmark display"
              >
                Benchmark
              </button>

              <div className="flex bg-slate-100 border border-slate-300 dark:bg-dark-surface1 dark:border-white/10 p-1 rounded-xl" role="toolbar" aria-label="Chart Timeframe Selectors">
                {(['1D', '1W', '1M', 'YTD', '1Y', 'ALL'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-2.5 py-1 text-xs font-bold font-mono rounded-lg transition-colors cursor-pointer ${
                      timeframe === t
                        ? 'bg-brand-500 text-slate-950 shadow-emerald-glow font-extrabold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    aria-selected={timeframe === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 h-80" role="img" aria-label="Line chart showing portfolio net worth over time compared against S&P 500 benchmark">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16c784" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16c784" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBench" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  className="font-mono"
                />
                <YAxis
                  stroke="#6b7280"
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
                  stroke="#16c784"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorAlpha)"
                  name="AlphaVest Net Worth"
                />
                {showBenchmark && (
                  <Area
                    type="monotone"
                    dataKey="Benchmark"
                    stroke="#7c3aed"
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

          <div className="p-4 sm:p-6 flex flex-col items-center justify-center">
            <div className="h-52 w-full" role="img" aria-label="Pie chart showing asset allocation across Tech, Crypto, ETFs, Bonds, and Cash">
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

            <div className="w-full space-y-2 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs font-mono-nums">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                    <span className="type-caption text-slate-700 dark:text-slate-300 font-semibold">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(item.value)}</span>
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
              <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" aria-hidden="true" />
              <CardTitle>Neural Strategy Stream</CardTitle>
            </div>
            <Badge variant="ai" size="sm">Real-Time Diagnostics</Badge>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-card-light dark:bg-dark-surface2 dark:border-white/10 dark:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-purple-300 dark:hover:border-purple-500/40"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white tracking-tight">
                      {insight.title}
                    </span>
                    {getImpactBadge(insight.impactScore)}
                  </div>
                  <p className="type-caption text-slate-600 dark:text-slate-300 leading-relaxed">
                    {insight.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ai"
                    size="sm"
                    onClick={executeRebalance}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />}
                    aria-label={`Apply action for ${insight.title}`}
                  >
                    Apply Action
                  </Button>
                  <button
                    onClick={() => dismissInsight(insight.id)}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2 py-1.5 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 min-h-[44px] sm:min-h-[36px] flex items-center justify-center font-medium"
                    aria-label={`Dismiss ${insight.title}`}
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

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-3" role="table" aria-label="Monthly Returns Table">
              {monthlyHeatmap.map((item) => (
                <div
                  key={item.month}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 ${
                    item.returnVal >= 0
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 font-bold'
                      : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400 font-bold'
                  }`}
                  role="cell"
                >
                  <span className="type-overline text-slate-600 dark:text-slate-400 font-bold">{item.month}</span>
                  <span className="font-mono font-bold text-xs font-mono-nums">
                    {item.returnVal >= 0 ? '+' : ''}{item.returnVal}%
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span>Avg Monthly Alpha:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+2.70%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Redesigned Light Theme Information / Disclaimer Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 dark:bg-dark-surface2 dark:border-white/10 shadow-xs flex items-start sm:items-center gap-3 text-xs text-amber-950 dark:text-slate-300">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <p className="type-caption leading-relaxed text-slate-800 dark:text-slate-300 font-medium">
          <strong className="text-slate-900 dark:text-white font-bold">Institutional Disclaimer:</strong> AlphaVest is a conceptual enterprise FinTech product created for UX/UI portfolio purposes. It does not provide financial services, execute live trades, or offer investment advice.
        </p>
      </div>
    </div>
  );
};
