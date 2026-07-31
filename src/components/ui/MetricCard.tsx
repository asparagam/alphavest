import React from 'react';
import { Card } from './Card';
import { ReturnBadge } from './Badge';
import { motion } from 'framer-motion';

export interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changePercent?: number;
  subtext?: string;
  icon?: React.ReactNode;
  sparkline?: number[];
  variant?: 'glass' | 'solid' | 'gradient' | 'ai';
  glowing?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changePercent,
  subtext,
  icon,
  sparkline,
  variant = 'glass',
  glowing = false,
}) => {
  const isPositive = changePercent !== undefined ? changePercent >= 0 : (change !== undefined ? change >= 0 : true);

  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null;
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    const width = 100;
    const height = 32;

    const points = sparkline
      .map((val, idx) => {
        const x = (idx / (sparkline.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
      })
      .join(' ');

    const color = isPositive ? '#10b981' : '#ef4444';

    return (
      <svg className="w-16 sm:w-24 h-6 sm:h-8 overflow-visible opacity-90 flex-shrink-0" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={`sparkline-grad-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d={`M 0,${height} L ${points} L ${width},${height} Z`}
          fill={`url(#sparkline-grad-${title.replace(/\s+/g, '-')})`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="w-full">
      <Card variant={variant} glowing={glowing} className="p-4 sm:p-6 relative group border border-slate-200 dark:border-white/10 hover:border-emerald-500/40">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <span className="type-overline block font-semibold text-slate-700 dark:text-slate-400 truncate">
              {title}
            </span>

            {/* Dominant Responsive Numeric Value */}
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono font-mono-nums tracking-tight text-slate-900 dark:text-slate-100 mt-1 truncate">
              {value}
            </div>
          </div>

          {icon && (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 dark:bg-dark-surface1 dark:border-white/10 dark:text-slate-300 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 truncate">
            {(changePercent !== undefined || change !== undefined) && (
              <ReturnBadge value={changePercent ?? change ?? 0} />
            )}
            {subtext && (
              <span className="type-caption text-slate-600 dark:text-slate-400 truncate hidden xs:inline">
                {subtext}
              </span>
            )}
          </div>

          {sparkline && renderSparkline()}
        </div>
      </Card>
    </motion.div>
  );
};
