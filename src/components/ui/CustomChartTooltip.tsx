import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export interface CustomChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (val: number) => string;
}

export const CustomChartTooltip: React.FC<CustomChartTooltipProps> = ({
  active,
  payload,
  label,
  valueFormatter = formatCurrency,
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="glass-panel p-3 border border-dark-border/90 shadow-2xl rounded-xl space-y-1.5 text-xs min-w-[160px] dark:bg-dark-surface/95 light:bg-white light:border-slate-200">
      {label && <p className="type-caption text-slate-400 font-bold border-b border-dark-border/40 pb-1 dark:border-dark-border/40 light:border-slate-100">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 font-mono-nums">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color || entry.stroke || '#10b981' }}
              />
              <span className="type-caption font-medium text-slate-300 dark:text-slate-300 light:text-slate-700">{entry.name}:</span>
            </div>
            <span className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
              {valueFormatter(Number(entry.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
