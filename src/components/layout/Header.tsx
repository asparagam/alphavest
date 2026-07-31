import React, { useState } from 'react';
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
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="h-16 bg-white/90 border-b border-slate-200 dark:bg-dark-surface1/80 dark:border-white/10 sticky top-0 z-20 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
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
            placeholder="Search assets, tools, AI insights... (Cmd+K)"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl pl-10 pr-12 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-100 dark:placeholder-slate-400 min-h-[44px] sm:min-h-[38px]"
            aria-label="Search assets, tools, and command menu"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 border border-slate-300 text-[10px] font-mono text-slate-700 dark:bg-dark-elevated dark:border-white/10 dark:text-slate-400">
            <Command className="w-3 h-3" aria-hidden="true" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="ai"
          size="sm"
          onClick={() => navigate('/copilot')}
          leftIcon={<Sparkles className="w-3.5 h-3.5" aria-hidden="true" />}
          className="hidden sm:inline-flex"
          aria-label="Open AI Copilot"
        >
          Copilot
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/trading')}
          leftIcon={<ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />}
          className="hidden md:inline-flex"
          aria-label="Navigate to Trading Desk"
        >
          Trade
        </Button>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:border-white/10 dark:bg-dark-surface2 dark:hover:bg-white/5 dark:text-slate-300 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
          )}
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2.5 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:border-white/10 dark:bg-dark-surface2 dark:hover:bg-white/5 dark:text-slate-300 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={`View notifications (${unreadCount} unread)`}
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
