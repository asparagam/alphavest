import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'gradient' | 'ai';
  glowing?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  glowing = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    glass: 'glass-panel',
    solid: 'bg-dark-surface border border-dark-border rounded-2xl light:bg-white light:border-slate-200',
    gradient: 'bg-gradient-to-br from-dark-card via-dark-surface to-dark-card border border-dark-border/80 rounded-2xl',
    ai: 'bg-gradient-to-br from-ai-900/30 via-dark-card to-accent-900/20 border border-ai-500/30 rounded-2xl shadow-purple-glow',
  };

  return (
    <div
      className={twMerge(
        clsx(
          variants[variant],
          glowing && 'border-brand-500/40 shadow-emerald-glow',
          'p-6 relative overflow-hidden',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={twMerge('flex items-center justify-between mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={twMerge('text-lg font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={twMerge('text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-0.5', className)} {...props}>
    {children}
  </p>
);
