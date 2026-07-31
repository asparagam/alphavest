import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-1 bg-slate-100 border border-slate-300 dark:bg-dark-surface/80 dark:border-white/10 p-1 rounded-xl overflow-x-auto scroll-hide',
        className
      )}
      role="tablist"
      aria-label="Category Filters"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'relative px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer min-h-[44px] sm:min-h-[36px]',
              isActive
                ? 'text-emerald-950 font-extrabold dark:text-white'
                : 'text-slate-800 hover:text-slate-950 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
            )}
            role="tab"
            aria-selected={isActive}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-emerald-100 border border-emerald-300 shadow-sm dark:bg-brand-500/20 dark:border-brand-500/40 rounded-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={clsx(
                    'px-2 py-0.5 text-[10px] font-mono font-bold rounded-full',
                    isActive
                      ? 'bg-emerald-700 text-white dark:bg-brand-500 dark:text-slate-950'
                      : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
