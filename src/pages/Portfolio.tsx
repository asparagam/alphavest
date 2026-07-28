import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card } from '../components/ui/Card';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { ReturnBadge, Badge } from '../components/ui/Badge';
import type { Asset } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { assets, executeRebalance } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const filteredAssets = assets.filter((a) => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  const columns: Column<Asset>[] = [
    {
      key: 'symbol',
      header: 'Asset',
      sortable: true,
      render: (asset) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center font-bold font-mono text-brand-400">
            {asset.symbol.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-100">{asset.symbol}</span>
              <Badge variant="neutral" size="sm">{asset.category}</Badge>
            </div>
            <span className="text-xs text-slate-400">{asset.name}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      align: 'right',
      render: (asset) => (
        <div className="font-mono font-semibold text-slate-100">
          {formatCurrency(asset.price)}
        </div>
      ),
    },
    {
      key: 'change24hPercent',
      header: '24h Change',
      sortable: true,
      align: 'right',
      render: (asset) => <ReturnBadge value={asset.change24hPercent} percent={true} />,
    },
    {
      key: 'holdingsValue',
      header: 'Value / Holdings',
      sortable: true,
      align: 'right',
      render: (asset) => (
        <div className="text-right">
          <div className="font-mono font-bold text-slate-100">{formatCurrency(asset.holdingsValue)}</div>
          <div className="text-xs text-slate-400 font-mono">
            {asset.holdingsQty.toLocaleString()} {asset.symbol}
          </div>
        </div>
      ),
    },
    {
      key: 'totalReturnPercent',
      header: 'Total Return',
      sortable: true,
      align: 'right',
      render: (asset) => (
        <div className="text-right">
          <ReturnBadge value={asset.totalReturnPercent} percent={true} />
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
            {formatCurrency(asset.totalReturn)}
          </div>
        </div>
      ),
    },
    {
      key: 'riskScore',
      header: 'AI Risk Rating',
      sortable: true,
      align: 'center',
      render: (asset) => {
        const isHighRisk = asset.riskScore > 65;
        return (
          <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg ${
            isHighRisk ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
          }`}>
            Score: {asset.riskScore}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (asset) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/asset/${asset.symbol}`);
            }}
          >
            Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trading?symbol=${asset.symbol}`);
            }}
            leftIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Trade
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-100">Holdings & Portfolio Structure</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete list of active positions, cost basis, total returns, and risk metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ai"
            size="md"
            onClick={executeRebalance}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Auto-Rebalance Portfolio
          </Button>
        </div>
      </div>

      <Tabs
        activeTab={selectedCategory}
        onChange={setSelectedCategory}
        tabs={[
          { id: 'all', label: 'All Holdings', count: assets.length },
          { id: 'stock', label: 'Stocks', count: assets.filter(a => a.category === 'stock').length },
          { id: 'crypto', label: 'Crypto', count: assets.filter(a => a.category === 'crypto').length },
          { id: 'etf', label: 'ETFs', count: assets.filter(a => a.category === 'etf').length },
          { id: 'bond', label: 'Bonds', count: assets.filter(a => a.category === 'bond').length },
          { id: 'cash', label: 'Cash & Reserves', count: assets.filter(a => a.category === 'cash').length },
        ]}
      />

      <Card variant="glass">
        <DataTable
          data={filteredAssets}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Search holdings by name or ticker..."
          onRowClick={(asset) => navigate(`/asset/${asset.symbol}`)}
        />
      </Card>
    </div>
  );
};
