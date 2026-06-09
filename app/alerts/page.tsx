import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import { SIMULATED_ALERTS } from '@/data/simulated';
import { CheckCircle } from 'lucide-react';

const severityOrder = { danger: 0, warning: 1, info: 2 } as const;

const severityStyles = {
  danger: 'border-l-status-full bg-status-full-bg',
  warning: 'border-l-status-filling bg-status-filling-bg',
  info: 'border-l-blue-600 bg-blue-50',
};

const dotStyles = {
  danger: 'bg-status-full',
  warning: 'bg-status-filling',
  info: 'bg-blue-600',
};

export default function AlertsPage() {
  const alerts = [...SIMULATED_ALERTS].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <AppShell>
      <Header title="Alerts" />

      <div className="space-y-3 px-4 pt-4">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <CheckCircle size={36} className="text-status-open" />
            <p className="text-base font-medium text-ink">All clear</p>
            <p className="text-center text-sm text-ink-secondary">
              No active parking alerts right now.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
              Active Now
            </p>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl border-l-4 px-4 py-3 ${severityStyles[alert.severity]}`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${dotStyles[alert.severity]}`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{alert.title}</p>
                    <p className="mt-0.5 text-xs text-ink-secondary">{alert.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </AppShell>
  );
}
