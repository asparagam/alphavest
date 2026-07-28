import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  PieChart,
  ArrowLeftRight,
  BarChart3,
  FileText,
  Bot,
  Bell,
  ShieldCheck,
  Settings,
  User,
  Sun,
  Moon,
  Sparkles,
  X,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';

export interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { assets, executeRebalance } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navCommands = [
    { label: 'Go to Dashboard', icon: LayoutDashboard, action: () => navigate('/') },
    { label: 'Go to Portfolio Holdings', icon: PieChart, action: () => navigate('/portfolio') },
    { label: 'Go to Trading Desk', icon: ArrowLeftRight, action: () => navigate('/trading') },
    { label: 'Go to Risk Analytics', icon: BarChart3, action: () => navigate('/analytics') },
    { label: 'Go to Financial Reports', icon: FileText, action: () => navigate('/reports') },
    { label: 'Open AI Copilot Workspace', icon: Bot, action: () => navigate('/copilot') },
    { label: 'Go to Notifications', icon: Bell, action: () => navigate('/notifications') },
    { label: 'Go to Security & 2FA', icon: ShieldCheck, action: () => navigate('/security') },
    { label: 'Go to Settings', icon: Settings, action: () => navigate('/settings') },
    { label: 'Go to Investor Profile', icon: User, action: () => navigate('/profile') },
  ];

  const quickActions = [
    { label: 'Execute One-Click AI Rebalance', icon: Sparkles, action: () => executeRebalance() },
    { label: `Switch Theme (${theme === 'dark' ? 'Light Mode' : 'Dark Mode'})`, icon: theme === 'dark' ? Sun : Moon, action: () => toggleTheme() },
  ];

  const filteredAssets = assets.filter(
    (a) =>
      a.symbol.toLowerCase().includes(query.toLowerCase()) ||
      a.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNav = navCommands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: () => void) => {
    action();
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl glass-panel border border-dark-border/90 shadow-2xl overflow-hidden z-10 p-0 rounded-2xl"
          >
            <div className="flex items-center px-4 border-b border-dark-border/60">
              <Search className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command, search ticker, or jump to page..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent py-4 text-sm text-slate-100 placeholder-slate-400 outline-none font-sans"
              />
              <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2 space-y-3">
              {filteredAssets.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Assets & Tickers
                  </div>
                  {filteredAssets.map((asset) => (
                    <button
                      key={asset.symbol}
                      onClick={() => handleSelect(() => navigate(`/asset/${asset.symbol}`))}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/5 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-dark-card border border-dark-border font-mono font-bold text-brand-400 flex items-center justify-center text-[11px]">
                          {asset.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-100">{asset.symbol}</span>
                          <span className="text-slate-400 ml-2">{asset.name}</span>
                        </div>
                      </div>
                      <span className="font-mono text-slate-300">${asset.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredNav.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Navigation
                  </div>
                  {filteredNav.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.label}
                        onClick={() => handleSelect(cmd.action)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-brand-400" />
                        <span>{cmd.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div>
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick System Actions
                </div>
                {quickActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.label}
                      onClick={() => handleSelect(act.action)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-ai-400" />
                      <span>{act.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-4 py-2 bg-dark-surface/90 border-t border-dark-border/60 flex items-center justify-between text-[10px] text-slate-400">
              <span>Press <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono">↵</kbd> to select</span>
              <span>Press <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono">ESC</kbd> to exit</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
