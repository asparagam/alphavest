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
  const baseStyles = 'rounded-2xl transition-all duration-200 overflow-hidden';

  const variants = {
    glass: 'bg-dark-card border border-dark-border/80 shadow-card-elevated hover:border-slate-700/80 dark:bg-dark-card dark:border-dark-border/80 light:bg-white light:border-light-border light:shadow-card-light light:hover:border-slate-300',
    solid: 'bg-dark-surface border border-dark-border dark:bg-dark-surface dark:border-dark-border light:bg-slate-50 light:border-slate-200',
    gradient: 'bg-gradient-to-br from-dark-card via-dark-surface to-dark-card border border-dark-border/80 dark:border-dark-border/80 light:from-white light:to-slate-50 light:border-slate-200',
    ai: 'bg-gradient-to-br from-ai-950/40 via-dark-card to-dark-surface border border-ai-500/30 shadow-purple-glow light:from-purple-50/60 light:to-white light:border-purple-200',
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
    className={twMerge('px-6 pt-6 pb-4 flex items-center justify-between border-b border-dark-border/40 dark:border-dark-border/40 light:border-slate-100', className)}
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
    className={twMerge('type-heading-m font-bold text-slate-100 dark:text-slate-100 light:text-slate-900', className)}
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
    className={twMerge('type-caption text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1', className)}
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
  <div className={twMerge('p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={twMerge('px-6 py-4 bg-dark-surface/50 border-t border-dark-border/40 flex items-center justify-between text-xs dark:bg-dark-surface/50 dark:border-dark-border/40 light:bg-slate-50 light:border-slate-100', className)}
    {...props}
  >
    {children}
  </div>
);
