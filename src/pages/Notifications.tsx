import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { useNotifications } from '../context/NotificationContext';
import { Bell, Trash2, CheckCheck, Sparkles, ShieldCheck, ArrowLeftRight, TrendingUp } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [filter, setFilter] = useState('ALL');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'ALL') return true;
    return n.type === filter;
  });

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'AI_INSIGHT':
        return <Sparkles className="w-4 h-4 text-purple-700 dark:text-purple-400" aria-hidden="true" />;
      case 'TRADE':
        return <ArrowLeftRight className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />;
      case 'SECURITY':
        return <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />;
      case 'MARKET_ALERT':
        return <TrendingUp className="w-4 h-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />;
      default:
        return <Bell className="w-4 h-4 text-slate-700 dark:text-slate-300" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-8" role="region" aria-label="Notification Center">
      {/* Hero Panel Header */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">Notification Center</Badge>
            {unreadCount > 0 && <Badge variant="danger" size="sm">{unreadCount} Unread</Badge>}
          </div>
          <h1 className="type-display-l text-slate-900 dark:text-white">Alerts & System Communications</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Real-time trade executions, security updates, and AI neural strategy signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            leftIcon={<CheckCheck className="w-4 h-4" aria-hidden="true" />}
            aria-label="Mark all notifications as read"
          >
            Mark All Read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearNotifications}
            leftIcon={<Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" aria-hidden="true" />}
            aria-label="Clear all notifications"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <Tabs
        activeTab={filter}
        onChange={setFilter}
        tabs={[
          { id: 'ALL', label: 'All Alerts', count: notifications.length },
          { id: 'AI_INSIGHT', label: 'AI Insights', count: notifications.filter((n) => n.type === 'AI_INSIGHT').length },
          { id: 'TRADE', label: 'Trades', count: notifications.filter((n) => n.type === 'TRADE').length },
          { id: 'SECURITY', label: 'Security', count: notifications.filter((n) => n.type === 'SECURITY').length },
          { id: 'MARKET_ALERT', label: 'Market', count: notifications.filter((n) => n.type === 'MARKET_ALERT').length },
        ]}
      />

      {/* Notifications List */}
      <Card variant="glass" className="p-4 sm:p-6 space-y-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-12 text-slate-700 dark:text-slate-400 text-xs space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-dark-surface1 border border-slate-300 dark:border-white/10 text-slate-500 flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="font-extrabold text-sm text-slate-900 dark:text-white">No active notifications</p>
            <p className="type-caption text-slate-600 dark:text-slate-400">Your feed is completely up to date.</p>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 min-h-[44px] ${
                !n.read
                  ? 'bg-emerald-50/80 border-l-4 border-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30'
                  : 'bg-white border-slate-200 hover:bg-slate-50 dark:bg-dark-surface2/60 dark:border-white/10 dark:hover:bg-dark-surface2'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Notification: ${n.title}`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-300 dark:bg-dark-surface1 dark:border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getCategoryIcon(n.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`text-xs ${!n.read ? 'font-extrabold text-slate-950 dark:text-white' : 'font-bold text-slate-900 dark:text-slate-200'}`}>
                      {n.title}
                    </h4>
                    {!n.read && (
                      <Badge variant="success" size="sm">NEW</Badge>
                    )}
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                    {n.message}
                  </p>
                </div>
              </div>

              {!n.read && (
                <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-brand-500" aria-label="Unread indicator" />
                </div>
              )}
            </div>
          ))
        )}
      </Card>
    </div>
  );
};
