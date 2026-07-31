import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';

export interface BadgeProps {
  variant?: 'brand' | 'accent' | 'ai' | 'neutral' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-bold rounded-lg transition-colors select-none';

  const variants = {
    brand: 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
    accent: 'bg-blue-50 text-blue-800 border border-blue-300 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30',
    ai: 'bg-purple-50 text-purple-800 border border-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/40 shadow-purple-glow',
    neutral: 'bg-slate-100 text-slate-800 border border-slate-300 dark:bg-dark-elevated dark:text-slate-300 dark:border-white/10',
    success: 'bg-emerald-100/80 text-emerald-900 border border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30 font-extrabold',
    danger: 'bg-red-100/80 text-red-900 border border-red-300 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30 font-extrabold',
    warning: 'bg-amber-100/80 text-amber-900 border border-amber-300 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30 font-extrabold',
    info: 'bg-blue-100/80 text-blue-900 border border-blue-300 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30 font-extrabold',
  };

  const defaultIcons = {
    brand: <Shield className="w-3 h-3 flex-shrink-0 text-emerald-700 dark:text-emerald-400" />,
    accent: <Info className="w-3 h-3 flex-shrink-0 text-blue-700 dark:text-blue-400" />,
    ai: <Info className="w-3 h-3 flex-shrink-0 text-purple-700 dark:text-purple-300" />,
    neutral: null,
    success: <CheckCircle className="w-3 h-3 flex-shrink-0 text-emerald-700 dark:text-emerald-400" />,
    danger: <AlertCircle className="w-3 h-3 flex-shrink-0 text-red-700 dark:text-red-400" />,
    warning: <AlertTriangle className="w-3 h-3 flex-shrink-0 text-amber-700 dark:text-amber-400" />,
    info: <Info className="w-3 h-3 flex-shrink-0 text-blue-700 dark:text-blue-400" />,
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 uppercase tracking-wider font-extrabold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}>
      {icon || defaultIcons[variant]}
      <span>{children}</span>
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
    <Badge
      variant={variant}
      size="sm"
      icon={<Icon className="w-3 h-3 flex-shrink-0" />}
      className={twMerge('font-mono font-mono-nums', className)}
    >
      {isPositive ? '+' : ''}{value.toFixed(2)}{suffix}
    </Badge>
  );
};
