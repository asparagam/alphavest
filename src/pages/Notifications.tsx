import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { useNotifications } from '../context/NotificationContext';
import { Bell, Trash2, CheckCheck } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [filter, setFilter] = useState('ALL');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'ALL') return true;
    return n.type === filter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 border-brand-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">Notification Center</Badge>
            {unreadCount > 0 && <Badge variant="ai" size="sm">{unreadCount} Unread</Badge>}
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-100">Alerts & System Communications</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time trade executions, security updates, and AI neural strategy signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={markAllAsRead} leftIcon={<CheckCheck className="w-4 h-4" />}>
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm" onClick={clearNotifications} leftIcon={<Trash2 className="w-4 h-4 text-red-400" />}>
            Clear All
          </Button>
        </div>
      </div>

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

      <Card variant="glass" className="p-6 space-y-4">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No notifications matching your filter.
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !n.read
                  ? 'bg-brand-500/10 border-brand-500/30'
                  : 'bg-dark-card/60 border-dark-border/60 hover:bg-dark-card'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center text-brand-400 flex-shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-100">{n.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>

              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </Card>
    </div>
  );
};
