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
    glass: 'bg-dark-surface2 border border-white/10 shadow-card-elevated hover:border-white/20 dark:bg-dark-surface2 dark:border-white/10 light:bg-white light:border-light-border light:shadow-card-light light:hover:border-slate-300',
    solid: 'bg-dark-surface1 border border-white/10 dark:bg-dark-surface1 dark:border-white/10 light:bg-slate-50 light:border-slate-200',
    gradient: 'bg-gradient-to-br from-dark-surface2 via-dark-surface1 to-dark-surface2 border border-white/10 light:from-white light:to-slate-50 light:border-slate-200',
    ai: 'bg-gradient-to-br from-purple-950/40 via-dark-surface2 to-dark-surface1 border border-purple-500/30 shadow-purple-glow light:from-purple-50/60 light:to-white light:border-purple-200',
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
    className={twMerge('p-4 sm:p-6 pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 dark:border-white/10 light:border-slate-100', className)}
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
    className={twMerge('type-caption text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1', className)}
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
    className={twMerge('px-4 sm:px-6 py-3 sm:py-4 bg-dark-surface1/50 border-t border-white/10 flex items-center justify-between text-xs dark:bg-dark-surface1/50 dark:border-white/10 light:bg-slate-50 light:border-slate-100', className)}
    {...props}
  >
    {children}
  </div>
);
