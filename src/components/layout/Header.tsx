import React from 'react';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Sparkles,
  Command,
  ArrowUpRight,
  Menu,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {
  onOpenSidebar?: () => void;
  onOpenCommandMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar, onOpenCommandMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/90 border-b border-slate-200 dark:bg-[#101827]/90 dark:border-white/10 sticky top-0 z-20 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="relative w-full cursor-pointer" onClick={onOpenCommandMenu}>
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none" aria-hidden="true" />
          <input
            type="text"
            readOnly
            placeholder="Search commands or tickers..."
            className="w-full pl-10 pr-12 py-2 text-xs bg-slate-100 dark:bg-dark-surface2 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white cursor-pointer select-none"
            aria-label="Open command search modal"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 bg-slate-200 dark:bg-dark-elevated text-[10px] font-mono text-slate-600 dark:text-slate-400">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ai"
          size="sm"
          onClick={() => navigate('/copilot')}
          leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          className="hidden sm:inline-flex"
          aria-label="Open AI Copilot chat workspace"
        >
          AI Copilot
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/trading')}
          leftIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          className="hidden sm:inline-flex"
          aria-label="Navigate to Trading Desk"
        >
          Trade
        </Button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          aria-label={theme === 'dark' ? 'Switch to Crisp Slate Light Theme' : 'Switch to Deep Midnight Dark Theme'}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          aria-label="Open Notifications Center"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-dark-base animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
};
