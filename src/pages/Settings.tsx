import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, DollarSign, Sliders, Bot } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, updateUserProfile } = usePortfolio();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 border-brand-500/30">
        <h1 className="text-2xl font-bold font-display text-slate-100">Application & AI Preferences</h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize UI aesthetics, risk parameters, AI model behaviors, and currency display.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              <CardTitle>Appearance & Theme</CardTitle>
            </div>
          </CardHeader>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-brand-500/20 border-brand-500 text-white shadow-emerald-glow'
                  : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-6 h-6 text-indigo-400" />
              <span className="text-xs font-bold">Deep Midnight (Dark)</span>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-brand-500/20 border-brand-500 text-slate-900 font-bold'
                  : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-6 h-6 text-amber-400" />
              <span className="text-xs font-bold">Crisp Slate (Light)</span>
            </button>
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-400" />
              <CardTitle>Investor Risk Tolerance Profile</CardTitle>
            </div>
          </CardHeader>

          <div className="grid grid-cols-2 gap-3">
            {(['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE', 'HYPER_GROWTH'] as const).map((r) => (
              <button
                key={r}
                onClick={() => updateUserProfile({ riskTolerance: r })}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  user.riskTolerance === r
                    ? 'bg-brand-500 text-white border-brand-500 shadow-emerald-glow'
                    : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
                }`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </Card>

        <Card variant="ai">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-ai-400" />
              <CardTitle>AI Neural Strategy Behavior</CardTitle>
            </div>
          </CardHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {(['CONSERVATIVE', 'BALANCED', 'PROACTIVE'] as const).map((agg) => (
                <button
                  key={agg}
                  onClick={() => updateUserProfile({ aiAggressiveness: agg })}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    user.aiAggressiveness === agg
                      ? 'bg-ai-600 text-white border-ai-400 shadow-purple-glow'
                      : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
                  }`}
                >
                  {agg}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-card border border-dark-border">
              <span className="text-xs font-bold text-slate-200">Automated Rebalancing</span>
              <button
                onClick={() => updateUserProfile({ autoRebalance: !user.autoRebalance })}
                className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                  user.autoRebalance ? 'bg-brand-500' : 'bg-slate-700'
                }`}
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
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <CardTitle>Base Reporting Currency</CardTitle>
            </div>
          </CardHeader>

          <div className="grid grid-cols-4 gap-2">
            {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => updateUserProfile({ currency: curr })}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  user.currency === curr
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
                }`}
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
