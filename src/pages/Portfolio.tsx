import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, ReturnBadge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/formatters';
import type { Asset } from '../types';
import { Sparkles, ArrowLeftRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Portfolio: React.FC = () => {
  const { assets, totalPortfolioValue, executeRebalance, toggleWatchlist, watchlist } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const navigate = useNavigate();

  const filteredAssets = assets.filter((a) => {
    if (selectedCategory === 'ALL') return true;
    return a.category.toUpperCase() === selectedCategory;
  });

  const columns: Column<Asset>[] = [
    {
      key: 'symbol',
      header: 'Asset / Ticker',
      sortable: true,
      accessor: (asset) => (
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(asset.symbol);
            }}
            className="text-slate-500 hover:text-amber-400 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 rounded p-0.5"
            aria-label={`Toggle ${asset.symbol} in watchlist`}
          >
            <Star
              className={`w-4 h-4 ${
                watchlist.includes(asset.symbol) ? 'fill-amber-400 text-amber-400' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">{asset.symbol}</span>
              <Badge variant="neutral" size="sm">{asset.category}</Badge>
            </div>
            <span className="type-caption text-slate-300 dark:text-slate-300 light:text-slate-500 block truncate">{asset.name}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price ($)',
      sortable: true,
      align: 'right',
      accessor: (asset) => (
        <span className="font-mono font-bold text-slate-100 font-mono-nums">
          {formatCurrency(asset.price)}
        </span>
      ),
    },
    {
      key: 'change24h',
      header: '24h Change',
      sortable: true,
      align: 'right',
      accessor: (asset) => <ReturnBadge value={asset.change24hPercent} />,
    },
    {
      key: 'holdingsValue',
      header: 'Holdings Valuation',
      sortable: true,
      align: 'right',
      accessor: (asset) => (
        <div>
          <span className="font-mono font-bold text-emerald-400 font-mono-nums block">
            {formatCurrency(asset.holdingsValue)}
          </span>
          <span className="type-caption text-slate-400 font-mono">
            {asset.holdingsQty.toLocaleString()} units
          </span>
        </div>
      ),
    },
    {
      key: 'allocation',
      header: 'Weight (%)',
      sortable: true,
      align: 'right',
      accessor: (asset) => (
        <span className="font-mono font-bold text-slate-300 font-mono-nums">
          {asset.allocationPercent.toFixed(1)}%
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Trade',
      align: 'right',
      accessor: (asset) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/trading?symbol=${asset.symbol}`);
          }}
          leftIcon={<ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />}
          aria-label={`Trade ${asset.symbol}`}
        >
          Trade
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8" role="region" aria-label="Portfolio Holdings">
      {/* Hero Banner Panel */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="type-display-l text-slate-100">Portfolio Holdings & Positions</h1>
          <p className="type-body-l text-slate-300 mt-1">
            Real-time asset telemetry across {assets.length} core institutional positions. Total Valuation: <span className="font-mono font-bold text-emerald-400">{formatCurrency(totalPortfolioValue)}</span>
          </p>
        </div>

        <Button
          variant="ai"
          size="md"
          onClick={executeRebalance}
          leftIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
          aria-label="Auto-rebalance portfolio"
        >
          Auto-Rebalance
        </Button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Asset Category Filter">
        {(['ALL', 'STOCKS', 'CRYPTO', 'ETFS', 'BONDS', 'CASH'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
              selectedCategory === cat
                ? 'bg-brand-500 text-slate-950 border-brand-500 shadow-emerald-glow'
                : 'bg-dark-surface2 border-white/10 text-slate-300 hover:text-white'
            }`}
            role="tab"
            aria-selected={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main DataTable */}
      <Card variant="glass" className="p-6">
        <DataTable
          data={filteredAssets}
          columns={columns}
          searchPlaceholder="Search asset symbol or name..."
          searchKey={(a) => `${a.symbol} ${a.name}`}
          pageSize={10}
          onRowClick={(asset) => navigate(`/asset/${asset.symbol}`)}
        />
      </Card>
    </div>
  );
};
