import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PieChart,
  LineChart,
  ArrowLeftRight,
  BarChart3,
  FileText,
  Bot,
  Bell,
  ShieldCheck,
  Settings,
  User,
  Zap,
  Lock,
  X,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
}

export const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/portfolio', label: 'Portfolio', icon: PieChart },
  { path: '/asset/NVDA', label: 'Asset Details', icon: LineChart },
  { path: '/trading', label: 'Trading', icon: ArrowLeftRight },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/copilot', label: 'AI Copilot', icon: Bot, badge: 'AI', isAi: true },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/security', label: 'Security', icon: ShieldCheck },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/profile', label: 'Profile', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ onClose, isCollapsed = false }) => {
  const { user } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-white border-r border-slate-200 dark:bg-dark-surface1/95 dark:border-white/10 flex flex-col h-screen sticky top-0 z-30 select-none backdrop-blur-xl transition-all duration-200`}
      role="navigation"
      aria-label="Main Navigation Sidebar"
    >
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
        <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-300 flex items-center justify-center text-slate-950 shadow-emerald-glow font-black text-lg flex-shrink-0">
            A
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight leading-none group-hover:text-emerald-500 transition-colors">
                Alpha<span className="text-emerald-500">Vest</span>
              </span>
              <span className="type-overline text-slate-500 dark:text-slate-400">Enterprise AI</span>
            </div>
          )}
        </NavLink>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!isCollapsed && (
          <div className="px-3 pb-2 type-overline text-slate-600 dark:text-slate-400">
            Platform Menu
          </div>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center ${
                  isCollapsed ? 'justify-center px-0' : 'justify-between px-3'
                } py-3 sm:py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 min-h-[44px] sm:min-h-[36px] ${
                  isActive
                    ? item.isAi
                      ? 'bg-purple-100 text-purple-900 border border-purple-300 dark:bg-gradient-to-r dark:from-purple-600/30 dark:to-blue-600/20 dark:text-white dark:border-purple-500/40'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold shadow-xs dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md bg-purple-600 text-white shadow-xs">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {!isCollapsed && (
        <div className="p-3 border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-dark-surface2/50">
          <div className="p-3 rounded-xl bg-white border border-slate-200 dark:bg-dark-surface1 dark:border-white/10 flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover border border-emerald-500/30"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</h4>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                <Zap className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                <span>Alpha Black</span>
              </div>
            </div>
            <Lock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
          </div>
        </div>
      )}
    </aside>
  );
};
