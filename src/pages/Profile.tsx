import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { usePortfolio } from '../context/PortfolioContext';
import { formatCurrency } from '../utils/formatters';
import { Zap, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, totalPortfolioValue } = usePortfolio();

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 border-brand-500/30">
        <h1 className="text-2xl font-bold font-display text-slate-100">Investor Profile & Membership</h1>
        <p className="text-xs text-slate-400 mt-1">
          Private wealth tier accreditation, dedicated advisor contacts, and connected liquidity sources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-brand-500/30 border-2 border-white/20 shadow-2xl"
            />
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold font-display text-slate-100">{user.name}</h2>
                <Badge variant="brand" size="sm">
                  <Zap className="w-3 h-3 mr-1" /> {user.tier}
                </Badge>
              </div>

              <p className="text-xs text-slate-400 font-mono">{user.email}</p>

              <div className="pt-3 grid grid-cols-2 gap-4 border-t border-dark-border/60">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Verified Net Worth</span>
                  <div className="text-lg font-bold font-mono text-emerald-400">
                    {formatCurrency(totalPortfolioValue)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Investor Status</span>
                  <div className="text-xs font-bold text-slate-100 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Accredited Institutional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Dedicated Private Wealth Advisor</CardTitle>
          </CardHeader>

          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                VC
              </div>
              <div>
                <h4 className="font-bold text-slate-100">Victoria Chen, CFA</h4>
                <p className="text-slate-400 text-[11px]">Senior Managing Director</p>
              </div>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>v.chen@alphavest.private</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>+1 (800) 555-ALPHA</span>
              </div>
            </div>

            <Button variant="outline" size="sm" fullWidth>
              Schedule Advisory Call
            </Button>
          </div>
        </Card>

        <Card variant="glass" className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Connected Financial Custodians (Plaid Verified)</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-brand-400" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Morgan Stanley Private Wealth</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Account ending in ****9012 • Sweep Enabled</p>
                </div>
              </div>
              <Badge variant="brand" size="sm">Connected</Badge>
            </div>

            <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-400" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">JPMorgan Chase High-Yield Cash</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Account ending in ****4418 • 4.95% APY</p>
                </div>
              </div>
              <Badge variant="brand" size="sm">Connected</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
