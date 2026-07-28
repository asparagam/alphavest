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
  glowing = false,
}) => {
  return (
    <Card glowing={glowing} className="hover:scale-[1.01] transition-transform duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl lg:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
          {value}
        </div>
        {changePercent !== undefined && (
          <ReturnBadge value={changePercent} percent={true} />
        )}
      </div>

      {(subtext || change !== undefined) && (
        <div className="mt-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center justify-between">
          <span>{subtext || (change !== undefined ? `${change >= 0 ? '+' : ''}$${Math.abs(change).toLocaleString()} today` : '')}</span>
        </div>
      )}

      {sparkline && sparkline.length > 1 && (
        <div className="mt-4 h-9 w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
            {/* Draw Sparkline line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              d={createSparklineD(sparkline)}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </Card>
  );
};

function createSparklineD(points: number[]): string {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  return points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * 100;
      const y = 30 - ((val - min) / range) * 25 - 2;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}
