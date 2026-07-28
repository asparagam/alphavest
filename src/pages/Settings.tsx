import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, DollarSign, Sliders, Bot } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, updateUserProfile } = usePortfolio();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8" role="region" aria-label="Application and AI Preferences">
      {/* Hero Banner Panel */}
      <div className="hero-panel">
        <h1 className="type-display-l text-slate-100">Application & AI Preferences</h1>
        <p className="type-body-l text-slate-300 mt-1">
          Customize UI aesthetics, risk parameters, AI model behaviors, and currency display.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
              <CardTitle>Appearance & Theme</CardTitle>
            </div>
          </CardHeader>

          <div className="p-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
                theme === 'dark'
                  ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-emerald-glow'
                  : 'bg-dark-surface2 border-white/10 text-slate-400 hover:text-white'
              }`}
              aria-pressed={theme === 'dark'}
              aria-label="Switch to Deep Midnight Dark Theme"
            >
              <Moon className="w-6 h-6 text-indigo-400" aria-hidden="true" />
              <span className="text-xs font-bold">Deep Midnight (Dark)</span>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
                theme === 'light'
                  ? 'bg-emerald-500/20 border-emerald-500 text-slate-900 font-bold'
                  : 'bg-dark-surface2 border-white/10 text-slate-400 hover:text-white'
              }`}
              aria-pressed={theme === 'light'}
              aria-label="Switch to Crisp Slate Light Theme"
            >
              <Sun className="w-6 h-6 text-amber-400" aria-hidden="true" />
              <span className="text-xs font-bold">Crisp Slate (Light)</span>
            </button>
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <CardTitle>Investor Risk Tolerance Profile</CardTitle>
            </div>
          </CardHeader>

          <div className="p-6 grid grid-cols-2 gap-3">
            {(['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE', 'HYPER_GROWTH'] as const).map((r) => (
              <button
                key={r}
                onClick={() => updateUserProfile({ riskTolerance: r })}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  user.riskTolerance === r
                    ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-emerald-glow'
                    : 'bg-dark-surface2 border-white/10 text-slate-300 hover:text-white'
                }`}
                aria-pressed={user.riskTolerance === r}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </Card>

        <Card variant="ai">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" aria-hidden="true" />
              <CardTitle>AI Neural Strategy Behavior</CardTitle>
            </div>
          </CardHeader>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {(['CONSERVATIVE', 'BALANCED', 'PROACTIVE'] as const).map((agg) => (
                <button
                  key={agg}
                  onClick={() => updateUserProfile({ aiAggressiveness: agg })}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    user.aiAggressiveness === agg
                      ? 'bg-purple-600 text-white border-purple-400 shadow-purple-glow'
                      : 'bg-dark-surface2 border-white/10 text-slate-300 hover:text-white'
                  }`}
                  aria-pressed={user.aiAggressiveness === agg}
                >
                  {agg}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-surface2 border border-white/10">
              <span className="text-xs font-bold text-slate-200">Automated Rebalancing</span>
              <button
                onClick={() => updateUserProfile({ autoRebalance: !user.autoRebalance })}
                className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  user.autoRebalance ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
                aria-pressed={user.autoRebalance}
                aria-label="Toggle Automated Rebalancing"
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  user.autoRebalance ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <CardTitle>Base Reporting Currency</CardTitle>
            </div>
          </CardHeader>

          <div className="p-6 grid grid-cols-4 gap-2">
            {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => updateUserProfile({ currency: curr })}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  user.currency === curr
                    ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                    : 'bg-dark-surface2 border-white/10 text-slate-300 hover:text-white'
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
