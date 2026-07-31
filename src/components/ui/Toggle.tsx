import React from 'react';
import { clsx } from 'clsx';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange(!checked);
    }
  };

  return (
    <div className={clsx('inline-flex items-center justify-center min-h-[44px] min-w-[44px]', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={handleKeyDown}
        className={clsx(
          'w-[52px] h-[28px] rounded-full p-[2px] border transition-colors duration-200 flex items-center select-none active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-card',
          disabled
            ? 'opacity-60 cursor-not-allowed bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-700'
            : checked
            ? 'bg-emerald-500 border-emerald-600 hover:bg-emerald-600 dark:bg-emerald-500 dark:border-emerald-600 cursor-pointer'
            : 'bg-slate-300 border-slate-400 hover:bg-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 cursor-pointer'
        )}
      >
        <div
          className={clsx(
            'w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out transform flex-shrink-0',
            disabled ? 'bg-slate-300 dark:bg-slate-600' : '',
            checked ? 'translate-x-[24px]' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};
