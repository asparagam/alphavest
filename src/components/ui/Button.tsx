import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

    const variants = {
      primary: 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-slate-950 font-extrabold shadow-emerald-glow hover:shadow-lg',
      secondary: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 border border-slate-300 dark:bg-dark-elevated dark:text-slate-100 dark:border-white/10 dark:hover:bg-dark-interactive',
      outline: 'border border-slate-300 hover:border-brand-500 hover:bg-emerald-50/50 text-slate-900 dark:border-white/20 dark:text-slate-100 dark:hover:bg-brand-500/10',
      ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5',
      danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm font-extrabold',
      success: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm font-extrabold',
      ai: 'bg-gradient-to-r from-ai-500 to-accent-500 hover:from-ai-600 hover:to-accent-600 active:from-ai-700 text-white shadow-purple-glow font-extrabold border border-purple-400/30',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
      md: 'text-xs px-4 py-2.5 gap-2 min-h-[44px]',
      lg: 'text-sm px-6 py-3.5 gap-2.5 min-h-[48px]',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
        className={twMerge(
          clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
          )
        )}
        disabled={disabled || isLoading}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
