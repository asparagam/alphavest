import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'gradient' | 'ai';
  glowing?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  glowing = false,
  children,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200 overflow-hidden w-full max-w-full';

  const variants = {
    glass: 'bg-white border border-slate-200 shadow-card-light hover:border-slate-300 dark:bg-dark-surface2 dark:border-white/10 dark:shadow-card-elevated dark:hover:border-white/20 text-slate-900 dark:text-slate-100',
    solid: 'bg-slate-50 border border-slate-200 shadow-xs dark:bg-dark-surface1 dark:border-white/10 text-slate-900 dark:text-slate-100',
    gradient: 'bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 shadow-card-light dark:from-dark-surface2 dark:via-dark-surface1 dark:to-dark-surface2 dark:border-white/10 text-slate-900 dark:text-slate-100',
    ai: 'bg-gradient-to-br from-purple-50 via-white to-purple-50/50 border border-purple-200 shadow-sm dark:from-purple-950/40 dark:via-dark-surface2 dark:to-dark-surface1 dark:border-purple-500/30 dark:shadow-purple-glow text-slate-900 dark:text-slate-100',
  };

  const glows = glowing
    ? variant === 'ai'
      ? 'shadow-purple-glow'
      : 'shadow-emerald-glow'
    : '';

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], glows, className))}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={twMerge('p-4 sm:p-6 pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10', className)}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3
    className={twMerge('type-heading-m font-bold text-slate-900 dark:text-white', className)}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p
    className={twMerge('type-caption text-slate-600 dark:text-slate-400 mt-0.5 sm:mt-1', className)}
    {...props}
  >
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge('p-4 sm:p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={twMerge('px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-t border-slate-100 text-xs dark:bg-dark-surface1/50 dark:border-white/10 text-slate-700 dark:text-slate-300', className)}
    {...props}
  >
    {children}
  </div>
);
