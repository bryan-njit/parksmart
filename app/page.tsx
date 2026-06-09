import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import LotCard from '@/components/lots/LotCard';
import PollIndicator from '@/components/lots/PollIndicator';
import AlertBanner from '@/components/alerts/AlertBanner';
import { SIMULATED_LOTS, SIMULATED_ALERTS } from '@/data/simulated';

export default function DashboardPage() {
  const bestLot = SIMULATED_LOTS.filter(
    (l) => l.status !== 'unknown' && l.status !== 'full'
  ).sort((a, b) => (b.available ?? 0) - (a.available ?? 0))[0];

  const dangerAlerts = SIMULATED_ALERTS.filter((a) => a.severity === 'danger');
  const otherAlerts = SIMULATED_ALERTS.filter((a) => a.severity !== 'danger');

  const openCount = SIMULATED_LOTS.filter(
    (l) => l.status !== 'unknown' && l.status !== 'full'
  ).length;

  return (
    <AppShell>
      <Header title="ParkSmart" brand showSettings showRefresh />

      {dangerAlerts.map((alert) => (
        <AlertBanner key={alert.id} alert={alert} />
      ))}

      <div className="space-y-6 px-4 pb-2 pt-5">
        {bestLot && <LotCard lot={bestLot} size="lg" />}

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
              All Lots
            </h2>
            <span className="text-xs text-ink-tertiary">
              {openCount} of {SIMULATED_LOTS.length} with spots
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SIMULATED_LOTS.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        </section>

        {otherAlerts.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
              Notices
            </h2>
            <div className="divide-y overflow-hidden rounded-xl border">
              {otherAlerts.map((alert) => (
                <AlertBanner key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="flex justify-center pb-2">
        <PollIndicator lastUpdated={Date.now() - 12000} />
      </div>
    </AppShell>
  );
}
