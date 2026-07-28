import React from 'react';
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-slate-800/60 rounded-xl w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-32 bg-slate-800/40 rounded-2xl border border-slate-700/30"></div>
        ))}
      </div>
      <div className="h-64 bg-slate-800/30 rounded-2xl border border-slate-700/30"></div>
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = 'Failed to load financial data',
  message = 'An unexpected network issue occurred while connecting to AlphaVest telemetry servers.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-panel border-red-500/30 my-6">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-4 shadow-lg">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold font-display text-slate-100">{title}</h3>
      <p className="text-xs text-slate-400 max-w-md mt-1 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Retry Connection
        </Button>
      )}
    </div>
  );
};

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({
  title = 'No holdings recorded',
  description = 'Start building your automated AI portfolio by browsing available assets or depositing cash reserves.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-panel my-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold font-display text-slate-100">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
