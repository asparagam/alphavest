import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Bell, Bot, ArrowUpRight, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/Button';
import { CommandMenu } from '../ui/CommandMenu';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

export interface TopNavigationProps {
  onMobileMenuToggle?: () => void;
  onOpenAiCopilot?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  onMobileMenuToggle,
  onOpenAiCopilot,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { user, totalPortfolioValue, todaysReturnPercent } = usePortfolio();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="h-16 bg-white/90 border-b border-slate-200 dark:bg-dark-surface1/80 dark:border-white/10 sticky top-0 z-20 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Interactive Command Menu Trigger */}
          <button
            onClick={() => setIsCommandMenuOpen(true)}
            className="hidden sm:flex items-center relative w-64 lg:w-80 glass-input px-3.5 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors text-left cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-2.5 flex-shrink-0" />
            <span className="truncate">Search commands or tickers...</span>
            <kbd className="hidden lg:inline-block ml-auto text-[10px] font-mono text-slate-700 dark:text-slate-400 bg-slate-200 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          <div className="hidden md:flex flex-col text-right pr-2 border-r border-slate-200 dark:border-white/10">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Net Worth</span>
            <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
              {formatCurrency(totalPortfolioValue)}
              <span className={`ml-1.5 text-xs ${todaysReturnPercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {todaysReturnPercent >= 0 ? '+' : ''}{todaysReturnPercent.toFixed(2)}%
              </span>
            </span>
          </div>

          <Button
            variant="ai"
            size="sm"
            onClick={onOpenAiCopilot}
            leftIcon={<Bot className="w-4 h-4" />}
            className="hidden sm:inline-flex"
          >
            AI Copilot
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/trading')}
            leftIcon={<ArrowUpRight className="w-4 h-4" />}
          >
            Trade
          </Button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:border-white/10 dark:bg-dark-surface2 dark:hover:bg-white/5 dark:text-slate-300 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:border-white/10 dark:bg-dark-surface2 dark:hover:bg-white/5 dark:text-slate-300 transition-colors relative cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-dark-surface animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-dark-surface1 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-brand-500/20 dark:text-brand-400">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-emerald-600 dark:text-brand-400 hover:underline font-medium cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-white/10 max-h-80 overflow-y-auto my-2">
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={`py-3 px-1 text-xs ${!n.read ? 'bg-emerald-50/60 dark:bg-brand-500/5 -mx-1 px-2 rounded-lg' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/notifications');
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-emerald-600 dark:text-brand-400 hover:underline border-t border-slate-200 dark:border-white/10 block mt-2 cursor-pointer"
                >
                  View all notifications →
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10 hover:opacity-80 transition-opacity cursor-pointer min-h-[44px]"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-500/30"
            />
          </button>
        </div>
      </header>

      <CommandMenu isOpen={isCommandMenuOpen} onClose={() => setIsCommandMenuOpen(false)} />
    </>
  );
};
