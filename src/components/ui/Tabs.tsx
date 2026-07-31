import React from 'react';
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
        'bg-slate-100 border border-slate-300 dark:bg-[#1B2436] dark:border-white/10 p-2 rounded-[18px] flex items-center gap-2 overflow-x-auto scroll-hide',
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
              'h-10 min-h-[40px] px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer select-none border',
              isActive
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-extrabold shadow-xs dark:bg-emerald-500/20 dark:border-emerald-500/35 dark:text-[#34D399]'
                : 'bg-transparent border-transparent text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] dark:hover:bg-white/5'
            )}
            role="tab"
            aria-selected={isActive}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'px-2 py-0.5 text-[10px] font-mono font-bold rounded-full transition-colors',
                  isActive
                    ? 'bg-emerald-700 text-white dark:bg-[#10B981] dark:text-white'
                    : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
