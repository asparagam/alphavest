import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { usePortfolio } from '../context/PortfolioContext';
import { useNotifications } from '../context/NotificationContext';
import { ShieldCheck, Lock, Smartphone, Key, AlertOctagon, Laptop } from 'lucide-react';

export const Security: React.FC = () => {
  const { user, updateUserProfile } = usePortfolio();
  const { addToast } = useNotifications();

  const toggle2FA = () => {
    updateUserProfile({ twoFactorEnabled: !user.twoFactorEnabled });
  };

  const handleRevokeSession = (deviceName: string) => {
    addToast('Session Revoked', `Successfully revoked session for ${deviceName}`, 'success');
  };

  const handleGenerateApiKey = () => {
    addToast('API Key Created', 'New read-only telemetry API key generated: av_live_9041284712', 'success');
  };

  return (
    <div className="space-y-8" role="region" aria-label="Security and Authentication Center">
      {/* Hero Banner Panel */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">Military-Grade Security</Badge>
            <span className="type-caption font-mono font-medium">256-bit Hardware Encryption</span>
          </div>
          <h1 className="type-display-l text-slate-900 dark:text-white">Security & Authentication Center</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Manage hardware security keys, active sessions, 2FA settings, and emergency lock controls.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-Factor Security (2FA) Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle>Multi-Factor Security (2FA)</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-4">
            {/* TOTP Authenticator Card */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-slate-700 dark:text-slate-300 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Authenticator App (TOTP)</h4>
                  <p className="type-caption text-slate-700 dark:text-slate-400 font-medium">Yubikey / Google Authenticator requirement</p>
                </div>
              </div>
              <button
                onClick={toggle2FA}
                className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 min-h-[44px] min-w-[44px] flex items-center ${
                  user.twoFactorEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
                aria-pressed={user.twoFactorEnabled}
                aria-label="Toggle Authenticator App 2FA"
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  user.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Biometric Touch / Face ID Card */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-700 dark:text-slate-300 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Biometric Touch / Face ID</h4>
                  <p className="type-caption text-slate-700 dark:text-slate-400 font-medium">Hardware enclave authentication</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
          </div>
        </Card>

        {/* Active Authorized Sessions Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Laptop className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle>Active Authorized Sessions</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-3">
            {/* Current Active Session Row */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border-l-4 border-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-slate-950 dark:text-white">MacBook Pro 16" (Current)</h4>
                <p className="type-caption font-mono text-slate-700 dark:text-slate-400 font-medium">San Francisco, CA • IP: 192.168.1.4</p>
              </div>
              <Badge variant="success" size="sm">Current Device</Badge>
            </div>

            {/* Mobile Session Row */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-dark-surface2 dark:border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">iPhone 15 Pro Max</h4>
                <p className="type-caption font-mono text-slate-700 dark:text-slate-400 font-medium">Mobile App • 2 hours ago</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRevokeSession('iPhone 15 Pro Max')}
                className="text-xs text-red-700 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-bold"
                aria-label="Revoke session for iPhone 15 Pro Max"
              >
                Revoke
              </Button>
            </div>
          </div>
        </Card>

        {/* Telemetry API Keys Card */}
        <Card variant="glass" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <Key className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle>Programmatic Telemetry API Keys</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-4">
            <p className="type-body text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Generate read-only API tokens for institutional reporting, Python algorithmic feeds, or custom portfolio dashboards.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateApiKey}
              leftIcon={<Key className="w-4 h-4" aria-hidden="true" />}
              aria-label="Generate New Telemetry API Key"
            >
              Generate New API Key
            </Button>
          </div>
        </Card>

        {/* Emergency Account Lock Card */}
        <Card variant="glass" className="bg-amber-50/70 border border-amber-200/80 dark:bg-dark-card dark:border-red-500/30 shadow-card-light dark:shadow-card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2.5 text-amber-900 dark:text-red-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                <AlertOctagon className="w-5 h-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-amber-950 dark:text-red-400">Emergency Account Lock Switch</CardTitle>
            </div>
          </CardHeader>

          <div className="p-4 sm:p-6 space-y-4">
            <p className="type-body text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
              Immediately freezes all outgoing asset transfers, API key access, and trade executions. Requires secondary phone verification to unlock.
            </p>
            <Button
              variant="danger"
              size="md"
              onClick={() => addToast('Emergency Lock Triggered', 'All trade executions locked.', 'warning')}
              aria-label="Activate Emergency Lock Switch"
            >
              Activate Emergency Lock
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
