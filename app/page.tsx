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

  return (
    <AppShell>
      <Header title="ParkSmart" showSettings showRefresh />

      {dangerAlerts.map((alert) => (
        <AlertBanner key={alert.id} alert={alert} />
      ))}

      <div className="space-y-4 px-4 pb-2 pt-4">
        {bestLot && <LotCard lot={bestLot} size="lg" />}

        {otherAlerts.length > 0 && (
          <div className="overflow-hidden rounded-xl border">
            {otherAlerts.map((alert) => (
              <AlertBanner key={alert.id} alert={alert} />
            ))}
          </div>
        )}

        <div>
          <p className="mb-3 text-sm font-semibold text-ink-secondary">All Lots</p>
          <div className="grid grid-cols-2 gap-3">
            {SIMULATED_LOTS.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        </div>
      </div>

      <PollIndicator lastUpdated={Date.now() - 12000} />
    </AppShell>
  );
}
