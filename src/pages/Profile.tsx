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
    <div className="space-y-8" role="region" aria-label="Investor Profile & Accreditation">
      {/* Hero Panel Header */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="type-display-l text-slate-900 dark:text-white">Investor Profile & Membership</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Private wealth tier accreditation, dedicated advisor contacts, and connected liquidity sources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Bio Card */}
        <Card variant="glass" className="lg:col-span-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-500/30 border-2 border-white/80 dark:border-white/20 shadow-lg"
            />
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{user.name}</h2>
                <Badge variant="brand" size="sm" icon={<Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}>
                  {user.tier}
                </Badge>
              </div>

              <p className="type-caption text-slate-600 dark:text-slate-400 font-mono font-medium">{user.email}</p>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-white/10 mt-3">
                <div>
                  <span className="type-overline text-slate-600 dark:text-slate-400 font-semibold block">Verified Net Worth</span>
                  <div className="text-lg font-extrabold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {formatCurrency(totalPortfolioValue)}
                  </div>
                </div>
                <div>
                  <span className="type-overline text-slate-600 dark:text-slate-400 font-semibold block">Investor Status</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-1 flex items-center justify-center sm:justify-start gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Accredited Institutional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Wealth Advisor Contact Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <CardTitle>Dedicated Private Wealth Advisor</CardTitle>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 flex items-center justify-center font-bold">
                VC
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white">Victoria Chen, CFA</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] font-medium">Senior Managing Director</p>
              </div>
            </div>

            <div className="space-y-2 text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>v.chen@alphavest.private</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>+1 (800) 555-ALPHA</span>
              </div>
            </div>

            <Button variant="outline" size="sm" fullWidth aria-label="Schedule Advisory Call">
              Schedule Advisory Call
            </Button>
          </div>
        </Card>

        {/* Connected Custodians Card */}
        <Card variant="glass" className="lg:col-span-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <CardTitle>Connected Financial Custodians (Plaid Verified)</CardTitle>
          </CardHeader>

          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Morgan Stanley Private Wealth</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium">Account ending in ****9012 • Sweep Enabled</p>
                </div>
              </div>
              <Badge variant="brand" size="sm">Connected</Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">JPMorgan Chase High-Yield Cash</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium">Account ending in ****4418 • 4.95% APY</p>
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
