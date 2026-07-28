import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-dark-border/60 py-8 px-6 text-xs text-slate-400 bg-dark-surface/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            A
          </div>
          <span className="font-display font-bold text-slate-300">AlphaVest Enterprise</span>
          <span className="text-slate-400 font-mono text-[10px]">v2.4.0-prod</span>
        </div>

        {/* Mandatory FinTech Disclaimer Notice */}
        <div className="flex items-start gap-2 max-w-2xl text-left bg-dark-card/60 p-3 rounded-xl border border-dark-border/60">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-snug">
            <strong className="text-slate-300">Disclaimer:</strong> AlphaVest is a conceptual enterprise FinTech product created for UX/UI portfolio purposes. It does not provide financial services, execute trades, or offer investment advice.
          </p>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-[11px]">
            <Shield className="w-3.5 h-3.5 text-brand-400" /> 256-bit AES
          </span>
          <span>© 2026 AlphaVest</span>
        </div>
      </div>
    </footer>
  );
};
