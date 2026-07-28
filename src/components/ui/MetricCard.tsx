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

  // Sparkline path generator
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
      <svg className="w-24 h-8 overflow-visible opacity-90" viewBox={`0 0 ${width} ${height}`}>
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
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Card variant={variant} glowing={glowing} className="p-6 relative group border border-dark-border/80 dark:border-dark-border/80 light:border-slate-200 hover:border-brand-500/40">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <span className="type-overline block font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 truncate">
              {title}
            </span>

            {/* Dominant Numeric Value */}
            <div className="text-2xl sm:text-3xl font-extrabold font-mono font-mono-nums tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 mt-1.5">
              {value}
            </div>
          </div>

          {icon && (
            <div className="w-10 h-10 rounded-xl bg-dark-surface border border-dark-border/80 flex items-center justify-center text-slate-300 dark:bg-dark-surface dark:border-dark-border/80 dark:text-slate-300 light:bg-slate-100 light:border-slate-200 light:text-slate-700 flex-shrink-0">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-dark-border/40 dark:border-dark-border/40 light:border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {(changePercent !== undefined || change !== undefined) && (
              <ReturnBadge value={changePercent ?? change ?? 0} />
            )}
            {subtext && (
              <span className="type-caption text-slate-400 dark:text-slate-400 light:text-slate-500 truncate">
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
