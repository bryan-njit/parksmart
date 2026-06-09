import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import { SIMULATED_ALERTS } from '@/data/simulated';
import { CheckCircle } from 'lucide-react';

const severityOrder = { danger: 0, warning: 1, info: 2 } as const;

const severityStyles = {
  danger: { border: '#DC2626', bg: '#FEF2F2', dot: '#DC2626' },
  warning: { border: '#CA8A04', bg: '#FEFCE8', dot: '#CA8A04' },
  info: { border: '#2563EB', bg: '#EFF6FF', dot: '#2563EB' },
};

export default function AlertsPage() {
  const alerts = [...SIMULATED_ALERTS].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <AppShell>
      <Header title="Alerts" />

      <div className="px-4 pt-4 space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <CheckCircle size={36} style={{ color: '#16A34A' }} />
            <p className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>
              All clear
            </p>
            <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
              No active parking alerts right now.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
              Active Now
            </p>
            {alerts.map((alert) => {
              const s = severityStyles[alert.severity];
              return (
                <div
                  key={alert.id}
                  className="rounded-xl border-l-4 px-4 py-3"
                  style={{ backgroundColor: s.bg, borderLeftColor: s.border }}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1.5 shrink-0 rounded-full"
                      style={{ width: 8, height: 8, backgroundColor: s.dot, display: 'inline-block' }}
                    />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {alert.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {alert.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </AppShell>
  );
}
