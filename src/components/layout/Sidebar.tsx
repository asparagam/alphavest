import React from 'react';
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
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
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

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user } = usePortfolio();

  return (
    <aside className="w-64 bg-dark-surface/95 border-r border-dark-border/80 flex flex-col h-screen sticky top-0 z-30 select-none backdrop-blur-xl dark:bg-dark-surface/95 dark:border-dark-border/80 light:bg-white light:border-light-border">
      <div className="h-16 px-6 flex items-center justify-between border-b border-dark-border/60 dark:border-dark-border/60 light:border-slate-100">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-300 flex items-center justify-center text-slate-950 shadow-emerald-glow font-black text-lg">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight leading-none group-hover:text-brand-400 transition-colors">
              Alpha<span className="text-brand-400">Vest</span>
            </span>
            <span className="type-overline text-slate-400 dark:text-slate-400 light:text-slate-500">Enterprise AI</span>
          </div>
        </NavLink>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 type-overline text-slate-400 dark:text-slate-400 light:text-slate-500">
          Platform Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? item.isAi
                      ? 'bg-gradient-to-r from-ai-600/30 to-accent-600/20 text-white border border-ai-500/40 shadow-purple-glow'
                      : 'bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-sm dark:bg-brand-500/15 dark:text-brand-400 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md bg-ai-500 text-white shadow-xs">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-3 border-t border-dark-border/60 bg-dark-card/50 dark:border-dark-border/60 dark:bg-dark-card/50 light:border-slate-100 light:bg-slate-50">
        <div className="p-3 rounded-xl bg-gradient-to-br from-dark-surface to-dark-card border border-dark-border/80 flex items-center gap-3 dark:from-dark-surface dark:to-dark-card dark:border-dark-border/80 light:from-white light:to-slate-100 light:border-slate-200">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-xl object-cover border border-brand-500/30"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 truncate">{user.name}</h4>
            <div className="flex items-center gap-1 text-[10px] text-brand-400 font-medium truncate">
              <Zap className="w-3 h-3 flex-shrink-0" />
              <span>Alpha Black</span>
            </div>
          </div>
          <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
};
