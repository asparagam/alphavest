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
    brand: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200',
    accent: 'bg-blue-500/15 text-blue-400 border border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-400 light:bg-blue-50 light:text-blue-700 light:border-blue-200',
    ai: 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-purple-glow dark:bg-purple-500/20 dark:text-purple-300 light:bg-purple-50 light:text-purple-700 light:border-purple-200',
    neutral: 'bg-dark-elevated text-slate-300 border border-white/10 dark:bg-dark-elevated dark:text-slate-300 light:bg-slate-100 light:text-slate-700 light:border-slate-200',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200',
    danger: 'bg-red-500/15 text-red-400 border border-red-500/30 dark:bg-red-500/15 dark:text-red-400 light:bg-red-50 light:text-red-700 light:border-red-200',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-400 light:bg-amber-50 light:text-amber-700 light:border-amber-200',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-400 light:bg-blue-50 light:text-blue-700 light:border-blue-200',
  };

  const defaultIcons = {
    brand: <Shield className="w-3 h-3 flex-shrink-0" />,
    accent: <Info className="w-3 h-3 flex-shrink-0" />,
    ai: <Info className="w-3 h-3 flex-shrink-0" />,
    neutral: null,
    success: <CheckCircle className="w-3 h-3 flex-shrink-0 text-emerald-400" />,
    danger: <AlertCircle className="w-3 h-3 flex-shrink-0 text-red-400" />,
    warning: <AlertTriangle className="w-3 h-3 flex-shrink-0 text-amber-400" />,
    info: <Info className="w-3 h-3 flex-shrink-0 text-blue-400" />,
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
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
