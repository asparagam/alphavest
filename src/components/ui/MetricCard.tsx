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
    const width = 96;
    const height = 32;

    const points = sparkline
      .map((val, idx) => {
        const x = (idx / (sparkline.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#16c784' : '#ef4444';
    const gradId = `sparkline-grad-${title.replace(/[^a-zA-Z0-9]/g, '-')}`;

    return (
      <svg
        className="w-20 sm:w-24 h-8 overflow-visible flex-shrink-0 bg-transparent"
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isPositive ? '#16c784' : '#ef4444'} stopOpacity="0.15" />
            <stop offset="100%" stopColor={isPositive ? '#16c784' : '#ef4444'} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d={`M 0,${height} L ${points} L ${width},${height} Z`}
          fill={`url(#${gradId})`}
        />
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="w-full h-full">
      <Card
        variant={variant}
        glowing={glowing}
        className="p-4 sm:p-6 min-h-[160px] h-full flex flex-col justify-between border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card shadow-card-light dark:shadow-card-elevated hover:border-emerald-500/40"
      >
        {/* Upper Header Row (Title Label & Icon) */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="space-y-1 min-w-0 flex-1">
            <span className="type-caption block font-bold text-slate-700 dark:text-slate-400 truncate">
              {title}
            </span>

            {/* Dominant Numeric Metric Value */}
            <div className="text-2xl sm:text-3xl font-extrabold font-mono font-mono-nums tracking-tight text-slate-900 dark:text-white mt-1 truncate">
              {value}
            </div>
          </div>

          {icon && (
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 dark:bg-dark-surface1 dark:border-white/10 dark:text-slate-300 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
        </div>

        {/* Lower Telemetry Row (Status Badge, Subtext & Sparkline) */}
        <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2 min-w-0 truncate">
            {(changePercent !== undefined || change !== undefined) && (
              <ReturnBadge value={changePercent ?? change ?? 0} />
            )}
            {subtext && (
              <span className="type-caption text-slate-700 dark:text-slate-400 truncate font-semibold">
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
