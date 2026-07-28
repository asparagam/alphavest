import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface BadgeProps {
  variant?: 'brand' | 'accent' | 'ai' | 'neutral' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-bold rounded-lg transition-colors select-none';

  const variants = {
    brand: 'bg-brand-500/15 text-brand-400 border border-brand-500/30 dark:bg-brand-500/15 dark:text-brand-400 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200',
    accent: 'bg-accent-500/15 text-accent-400 border border-accent-500/30 dark:bg-accent-500/15 dark:text-accent-400 light:bg-blue-50 light:text-blue-700 light:border-blue-200',
    ai: 'bg-ai-500/20 text-ai-400 border border-ai-500/40 shadow-purple-glow dark:bg-ai-500/20 dark:text-ai-400 light:bg-purple-50 light:text-purple-700 light:border-purple-200',
    neutral: 'bg-dark-surface text-slate-300 border border-dark-border dark:bg-dark-surface dark:text-slate-300 light:bg-slate-100 light:text-slate-700 light:border-slate-200',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200',
    danger: 'bg-red-500/15 text-red-400 border border-red-500/30 dark:bg-red-500/15 dark:text-red-400 light:bg-red-50 light:text-red-700 light:border-red-200',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-400 light:bg-amber-50 light:text-amber-700 light:border-amber-200',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}>
      {children}
    </span>
  );
};

export interface ReturnBadgeProps {
  value: number;
  suffix?: string;
  className?: string;
}

export const ReturnBadge: React.FC<ReturnBadgeProps> = ({
  value,
  suffix = '%',
  className,
}) => {
  const isPositive = value > 0;
  const isZero = value === 0;

  const Icon = isPositive ? TrendingUp : isZero ? Minus : TrendingDown;
  const variant = isPositive ? 'success' : isZero ? 'neutral' : 'danger';

  return (
    <Badge variant={variant} size="sm" className={twMerge('font-mono font-mono-nums', className)}>
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span>{isPositive ? '+' : ''}{value.toFixed(2)}{suffix}</span>
    </Badge>
  );
};
