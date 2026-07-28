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
    <div className="space-y-8">
      <div className="glass-panel p-6 border-brand-500/30">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">Military-Grade Security</Badge>
          <span className="text-xs text-slate-400 font-mono">256-bit Hardware Encryption</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-slate-100">Security & Authentication Center</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage hardware security keys, active sessions, 2FA settings, and emergency lock controls.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
              <CardTitle>Multi-Factor Security (2FA)</CardTitle>
            </div>
          </CardHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-dark-card border border-dark-border">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-slate-300" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Authenticator App (TOTP)</h4>
                  <p className="text-[11px] text-slate-400">Yubikey / Google Authenticator requirement</p>
                </div>
              </div>
              <button
                onClick={toggle2FA}
                className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                  user.twoFactorEnabled ? 'bg-brand-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  user.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-dark-card border border-dark-border">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-300" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Biometric Touch / Face ID</h4>
                  <p className="text-[11px] text-slate-400">Hardware enclave authentication</p>
                </div>
              </div>
              <Badge variant="brand" size="sm">Active</Badge>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-blue-400" />
              <CardTitle>Active Authorized Sessions</CardTitle>
            </div>
          </CardHeader>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-100">MacBook Pro 16" (Current)</h4>
                <p className="text-[10px] text-slate-400 font-mono">San Francisco, CA • IP: 192.168.1.4</p>
              </div>
              <Badge variant="brand" size="sm">Current Device</Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-100">iPhone 15 Pro Max</h4>
                <p className="text-[10px] text-slate-400 font-mono">Mobile App • 2 hours ago</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRevokeSession('iPhone 15 Pro Max')}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Revoke
              </Button>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-400" />
              <CardTitle>Programmatic Telemetry API Keys</CardTitle>
            </div>
          </CardHeader>

          <div className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate read-only API tokens for institutional reporting, Python algorithmic feeds, or custom portfolio dashboards.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateApiKey}
              leftIcon={<Key className="w-4 h-4" />}
            >
              Generate New API Key
            </Button>
          </div>
        </Card>

        <Card variant="glass" className="border-red-500/30">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-400">
              <AlertOctagon className="w-5 h-5" />
              <CardTitle className="text-red-400">Emergency Account Lock Switch</CardTitle>
            </div>
          </CardHeader>

          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Immediately freezes all outgoing asset transfers, API key access, and trade executions. Requires secondary phone verification to unlock.
            </p>
            <Button
              variant="danger"
              size="md"
              onClick={() => addToast('Emergency Lock Triggered', 'All trade executions locked.', 'warning')}
            >
              Activate Emergency Lock
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
