import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/formatters';
import type { OrderSide, OrderType } from '../types';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export const Trading: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSymbol = searchParams.get('symbol') || 'NVDA';

  const { assets, user, executeTrade } = usePortfolio();

  const [selectedSymbol, setSelectedSymbol] = useState<string>(initialSymbol);
  const [side, setSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState<string>('10');
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const selectedAsset = assets.find(a => a.symbol === selectedSymbol) || assets[0];
  const executionPrice = orderType === 'LIMIT' && limitPrice ? parseFloat(limitPrice) : selectedAsset.price;
  const numQty = parseFloat(quantity) || 0;
  const estimatedTotal = numQty * executionPrice;
  const estimatedFee = side === 'BUY' ? 0.00 : 2.50;

  const handleOrderSubmit = () => {
    if (numQty <= 0) return;
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOrder = () => {
    const success = executeTrade({
      symbol: selectedAsset.symbol,
      type: side,
      quantity: numQty,
      price: executionPrice,
      orderType,
    });
    if (success) {
      setIsConfirmModalOpen(false);
    }
  };

  const mockAsks = [
    { price: (selectedAsset.price * 1.004).toFixed(2), qty: 450, total: 57800 },
    { price: (selectedAsset.price * 1.002).toFixed(2), qty: 1200, total: 154000 },
    { price: (selectedAsset.price * 1.001).toFixed(2), qty: 850, total: 109000 },
  ];
  const mockBids = [
    { price: (selectedAsset.price * 0.999).toFixed(2), qty: 920, total: 118000 },
    { price: (selectedAsset.price * 0.998).toFixed(2), qty: 1450, total: 186000 },
    { price: (selectedAsset.price * 0.995).toFixed(2), qty: 2100, total: 269000 },
  ];

  return (
    <div className="space-y-8" role="region" aria-label="Enterprise Trading Desk">
      {/* Hero Banner Panel */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">Smart Router Engine</Badge>
            <span className="type-caption font-mono font-medium">Zero-Latency Execution</span>
          </div>
          <h1 className="type-display-l text-slate-900 dark:text-white">Enterprise Trading Desk</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Direct market access with AI slippage protection and automated liquidity routing.
          </p>
        </div>

        <div className="text-right">
          <span className="type-caption font-semibold block text-slate-700 dark:text-slate-300">Available Cash Reserve</span>
          {/* Deep Enterprise Green (#166534) for available cash metric in Light Mode */}
          <span className="text-xl sm:text-2xl font-extrabold font-mono font-mono-nums text-emerald-800 dark:text-emerald-400">
            {formatCurrency(user.cashBalance)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Entry Card */}
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Order Entry & Configuration</CardTitle>
              <CardDescription>Configure position sizing and order routing parameters</CardDescription>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Order Side Action Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 border border-slate-300 dark:bg-dark-surface1 dark:border-white/10 rounded-xl" role="tablist" aria-label="Order Mode">
              {(['BUY', 'SELL', 'SWAP'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSide(mode)}
                  className={`py-2.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer min-h-[44px] sm:min-h-[36px] ${
                    side === mode
                      ? mode === 'BUY'
                        ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                        : mode === 'SELL'
                        ? 'bg-red-600 text-white shadow-sm font-extrabold'
                        : 'bg-blue-600 text-white shadow-sm font-extrabold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                  role="tab"
                  aria-selected={side === mode}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="ticker-select" className="type-overline block text-slate-800 dark:text-slate-300 mb-1.5 font-bold">
                Select Asset Ticker
              </label>
              <select
                id="ticker-select"
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="glass-input w-full px-4 py-2.5 text-sm font-extrabold font-mono text-slate-900 dark:text-slate-100"
              >
                {assets.map((a) => (
                  <option key={a.symbol} value={a.symbol} className="bg-white dark:bg-dark-surface1 text-slate-900 dark:text-slate-100">
                    {a.symbol} — {a.name} (${a.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="type-overline block text-slate-800 dark:text-slate-300 mb-1.5 font-bold">
                Execution Routing Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['MARKET', 'LIMIT', 'STOP_LOSS'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`py-2 px-3 text-xs font-extrabold rounded-xl border transition-colors cursor-pointer min-h-[44px] sm:min-h-[36px] ${
                      orderType === type
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-500 font-extrabold dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40'
                        : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-slate-950 dark:bg-dark-surface1 dark:border-white/10 dark:text-slate-300 dark:hover:text-white'
                    }`}
                    aria-selected={orderType === type}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Quantity (Units)"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter units..."
              />

              {orderType === 'LIMIT' && (
                <Input
                  label="Limit Price ($)"
                  type="number"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  placeholder={`Default: $${selectedAsset.price.toFixed(2)}`}
                />
              )}
            </div>

            {/* Percentage Sizing Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="type-caption text-slate-700 dark:text-slate-300 font-bold">Position Preset:</span>
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => {
                    if (side === 'BUY') {
                      const maxAmount = (user.cashBalance * (pct / 100)) / executionPrice;
                      setQuantity(maxAmount.toFixed(2));
                    } else {
                      const maxHolding = selectedAsset.holdingsQty * (pct / 100);
                      setQuantity(maxHolding.toFixed(2));
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-slate-100 border border-slate-300 text-slate-800 hover:text-slate-950 hover:border-emerald-500 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-300 dark:hover:text-white cursor-pointer min-h-[44px] sm:min-h-[36px] flex items-center justify-center"
                  aria-label={`Set position size to ${pct}%`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>Estimated Market Price:</span>
                <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(executionPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>Estimated Total Settlement:</span>
                <span className="font-mono font-extrabold text-emerald-800 dark:text-emerald-400">{formatCurrency(estimatedTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 text-[11px] font-medium">
                <span>Exchange Execution Fee:</span>
                <span className="font-mono font-bold">${estimatedFee.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant={side === 'BUY' ? 'primary' : side === 'SELL' ? 'danger' : 'ai'}
              size="lg"
              fullWidth
              onClick={handleOrderSubmit}
              disabled={numQty <= 0}
              leftIcon={<ArrowLeftRight className="w-4 h-4" aria-hidden="true" />}
              aria-label={`Review ${side} order for ${selectedAsset.symbol}`}
            >
              Review {side} Order for {selectedAsset.symbol}
            </Button>
          </div>
        </Card>

        {/* Live Order Book Level II Depth */}
        <Card variant="glass">
          <CardHeader>
            <div>
              <CardTitle>Live Order Book</CardTitle>
              <CardDescription>Simulated Level II market depth</CardDescription>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-4 text-xs font-mono font-mono-nums">
            {/* Asks (Sell Orders) */}
            <div className="space-y-1" role="region" aria-label="Asks Sell Orders">
              <span className="type-overline text-red-700 dark:text-red-400 font-extrabold block">Asks (Sell Orders)</span>
              {mockAsks.map((ask, i) => (
                <div key={i} className="flex justify-between py-1.5 px-2.5 rounded border bg-red-100/80 text-red-900 border-red-300 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20 font-bold">
                  <span>${ask.price}</span>
                  <span>{ask.qty} shares</span>
                </div>
              ))}
            </div>

            <div className="py-2.5 border-y border-slate-200 dark:border-white/10 flex justify-between items-center font-extrabold text-slate-900 dark:text-slate-100">
              <span>Spread / Mid:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono">${selectedAsset.price.toFixed(2)}</span>
            </div>

            {/* Bids (Buy Orders) */}
            <div className="space-y-1" role="region" aria-label="Bids Buy Orders">
              <span className="type-overline text-emerald-800 dark:text-emerald-400 font-extrabold block">Bids (Buy Orders)</span>
              {mockBids.map((bid, i) => (
                <div key={i} className="flex justify-between py-1.5 px-2.5 rounded border bg-emerald-100/80 text-emerald-900 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20 font-bold">
                  <span>${bid.price}</span>
                  <span>{bid.qty} shares</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Confirm Order Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Order Execution"
        description="Verify transaction parameters before submitting to router"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10 space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Action & Asset:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{side} {selectedAsset.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Quantity:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{numQty} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Price per Unit:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${executionPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-white/10 pt-2 font-bold">
              <span className="text-slate-900 dark:text-slate-200">Total Settlement:</span>
              <span className="font-mono text-emerald-800 dark:text-emerald-400">{formatCurrency(estimatedTotal)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleConfirmOrder}
              leftIcon={<CheckCircle2 className="w-4 h-4" aria-hidden="true" />}
            >
              Authorize & Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
