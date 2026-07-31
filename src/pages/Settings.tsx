import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Toggle } from '../components/ui/Toggle';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, DollarSign, Sliders, Bot } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, updateUserProfile } = usePortfolio();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8" role="region" aria-label="Application and AI Preferences">
      {/* Hero Panel Header */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="type-display-l text-slate-900 dark:text-white">Application & AI Preferences</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Customize UI aesthetics, risk parameters, AI model behaviors, and currency display.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance & Theme Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <Sun className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle>Appearance & Theme</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-500 ${
                theme === 'dark'
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-sm font-extrabold'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-300 dark:hover:text-white'
              }`}
              aria-pressed={theme === 'dark'}
              aria-label="Switch to Deep Midnight Dark Theme"
            >
              <Moon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
              <span className="text-xs font-bold">Deep Midnight (Dark)</span>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-500 ${
                theme === 'light'
                  ? 'bg-emerald-100 border-2 border-emerald-600 text-emerald-950 font-extrabold shadow-sm'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-300 dark:hover:text-white'
              }`}
              aria-pressed={theme === 'light'}
              aria-label="Switch to Crisp Slate Light Theme"
            >
              <Sun className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span className="text-xs font-bold">Crisp Slate (Light)</span>
            </button>
          </div>
        </Card>

        {/* Investor Risk Tolerance Profile Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Sliders className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle>Investor Risk Tolerance Profile</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 grid grid-cols-2 gap-3">
            {(['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE', 'HYPER_GROWTH'] as const).map((r) => (
              <button
                key={r}
                onClick={() => updateUserProfile({ riskTolerance: r })}
                className={`py-3 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  user.riskTolerance === r
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-emerald-500 dark:text-slate-950 dark:border-emerald-500'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-slate-950 hover:bg-slate-200 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-300 dark:hover:text-white'
                }`}
                aria-pressed={user.riskTolerance === r}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </Card>

        {/* AI Neural Strategy Behavior Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle>AI Neural Strategy Behavior</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {(['CONSERVATIVE', 'BALANCED', 'PROACTIVE'] as const).map((agg) => (
                <button
                  key={agg}
                  onClick={() => updateUserProfile({ aiAggressiveness: agg })}
                  className={`py-2.5 px-3 text-xs font-extrabold rounded-xl border transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    user.aiAggressiveness === agg
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm font-extrabold'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-slate-950 hover:bg-slate-200 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-300 dark:hover:text-white'
                  }`}
                  aria-pressed={user.aiAggressiveness === agg}
                >
                  {agg}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10">
              <span className="text-xs font-extrabold text-slate-900 dark:text-slate-200">Automated Rebalancing</span>
              <Toggle
                checked={user.autoRebalance}
                onChange={(checked) => updateUserProfile({ autoRebalance: checked })}
                label="Toggle Automated Rebalancing"
              />
            </div>
          </div>
        </Card>

        {/* Base Reporting Currency Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle>Base Reporting Currency</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 grid grid-cols-4 gap-2">
            {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => updateUserProfile({ currency: curr })}
                className={`py-2.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  user.currency === curr
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-emerald-500 dark:text-slate-950 dark:border-emerald-500'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-slate-950 hover:bg-slate-200 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-300 dark:hover:text-white'
                }`}
                aria-pressed={user.currency === curr}
              >
                {curr}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
