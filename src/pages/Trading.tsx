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
            <span className="type-caption font-mono">Zero-Latency Execution</span>
          </div>
          <h1 className="type-display-l text-slate-100">Enterprise Trading Desk</h1>
          <p className="type-body-l text-slate-300 mt-1">
            Direct market access with AI slippage protection and automated liquidity routing.
          </p>
        </div>

        <div className="text-right">
          <span className="type-caption font-semibold block text-slate-300">Available Cash Reserve</span>
          <span className="text-xl font-bold font-mono font-mono-nums text-emerald-400">{formatCurrency(user.cashBalance)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Order Entry & Configuration</CardTitle>
              <CardDescription>Configure position sizing and order routing parameters</CardDescription>
            </div>
          </CardHeader>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-2 p-1 bg-dark-surface1 rounded-xl border border-white/10" role="tablist" aria-label="Order Mode">
              {(['BUY', 'SELL', 'SWAP'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSide(mode)}
                  className={`py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    side === mode
                      ? mode === 'BUY'
                        ? 'bg-emerald-500 text-slate-950 shadow-emerald-glow font-extrabold'
                        : mode === 'SELL'
                        ? 'bg-red-600 text-white font-extrabold'
                        : 'bg-purple-600 text-white font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  role="tab"
                  aria-selected={side === mode}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="ticker-select" className="type-overline block text-slate-300 mb-1.5">
                Select Asset Ticker
              </label>
              <select
                id="ticker-select"
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="glass-input w-full px-4 py-2.5 text-sm font-bold font-mono"
              >
                {assets.map((a) => (
                  <option key={a.symbol} value={a.symbol} className="bg-dark-surface1 text-slate-100">
                    {a.symbol} — {a.name} (${a.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="type-overline block text-slate-300 mb-1.5">
                Execution Routing Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['MARKET', 'LIMIT', 'STOP_LOSS'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      orderType === type
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-extrabold'
                        : 'bg-dark-surface1 text-slate-300 border-white/10 hover:text-white'
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

            <div className="flex items-center gap-2">
              <span className="type-caption text-slate-300">Position Preset:</span>
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
                  className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-dark-surface2 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 cursor-pointer"
                  aria-label={`Set position size to ${pct}%`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-dark-surface2 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Estimated Market Price:</span>
                <span className="font-mono font-bold text-slate-100">{formatCurrency(executionPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Total:</span>
                <span className="font-mono font-bold text-emerald-400">{formatCurrency(estimatedTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Exchange Fee:</span>
                <span className="font-mono">${estimatedFee.toFixed(2)}</span>
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

        <Card variant="glass">
          <CardHeader>
            <div>
              <CardTitle>Live Order Book</CardTitle>
              <CardDescription>Simulated Level II market depth</CardDescription>
            </div>
          </CardHeader>

          <div className="p-6 space-y-4 text-xs font-mono font-mono-nums">
            <div className="space-y-1" role="region" aria-label="Asks Sell Orders">
              <span className="type-overline text-red-400 font-bold block">Asks (Sell Orders)</span>
              {mockAsks.map((ask, i) => (
                <div key={i} className="flex justify-between py-1 px-2 rounded bg-red-500/10 text-red-300">
                  <span>${ask.price}</span>
                  <span>{ask.qty} shares</span>
                </div>
              ))}
            </div>

            <div className="py-2 border-y border-white/10 flex justify-between items-center font-bold text-slate-100">
              <span>Spread / Mid:</span>
              <span className="text-emerald-400">${selectedAsset.price.toFixed(2)}</span>
            </div>

            <div className="space-y-1" role="region" aria-label="Bids Buy Orders">
              <span className="type-overline text-emerald-400 font-bold block">Bids (Buy Orders)</span>
              {mockBids.map((bid, i) => (
                <div key={i} className="flex justify-between py-1 px-2 rounded bg-emerald-500/10 text-emerald-300">
                  <span>${bid.price}</span>
                  <span>{bid.qty} shares</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Order Execution"
        description="Verify transaction parameters before submitting to router"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-dark-surface2 border border-white/10 space-y-3 text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Action & Asset:</span>
              <span className="font-bold text-slate-100">{side} {selectedAsset.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Quantity:</span>
              <span className="font-mono font-bold text-slate-100">{numQty} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Price per Unit:</span>
              <span className="font-mono text-slate-100">${executionPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 font-bold">
              <span className="text-slate-200">Total Settlement:</span>
              <span className="font-mono text-emerald-400">{formatCurrency(estimatedTotal)}</span>
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
