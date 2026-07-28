import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'accent' | 'ai' | 'positive' | 'negative' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variants = {
    brand: 'bg-brand-500/15 text-brand-400 border border-brand-500/30',
    accent: 'bg-accent-500/15 text-accent-400 border border-accent-500/30',
    ai: 'bg-ai-500/15 text-ai-400 border border-ai-500/30 font-medium',
    positive: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    negative: 'bg-red-500/15 text-red-400 border border-red-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700 light:bg-slate-100 light:text-slate-700 light:border-slate-300',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-medium rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 font-medium rounded-lg gap-1.5',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center tracking-wide uppercase',
          variants[variant],
          sizes[size],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const ReturnBadge: React.FC<{ value: number; percent?: boolean }> = ({ value, percent = true }) => {
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const formatted = percent
    ? `${isPositive ? '+' : ''}${value.toFixed(2)}%`
    : `${isPositive ? '+' : ''}$${Math.abs(value).toLocaleString()}`;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-mono text-xs font-semibold px-2.5 py-1 rounded-lg border',
        isPositive
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-red-500/10 text-red-400 border-red-500/30'
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {formatted}
    </span>
  );
};
