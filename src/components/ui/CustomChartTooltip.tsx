import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export interface CustomChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valuePrefix?: string;
  valueFormatter?: (val: number) => string;
}

export const CustomChartTooltip: React.FC<CustomChartTooltipProps> = ({
  active,
  payload,
  label,
  valueFormatter = formatCurrency,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white border border-slate-300 rounded-xl shadow-lg dark:bg-dark-surface1 dark:border-white/10 dark:shadow-card-elevated space-y-1.5 min-w-[160px] backdrop-blur-md">
        {label && (
          <p className="type-caption font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-white/10 pb-1 font-mono">
            {label}
          </p>
        )}
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="type-caption text-slate-700 dark:text-slate-300 truncate max-w-[110px]">
                {entry.name || entry.dataKey}
              </span>
            </div>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 font-mono-nums">
              {typeof entry.value === 'number' ? valueFormatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
