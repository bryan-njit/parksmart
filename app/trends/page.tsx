'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import OccupancyChart from '@/components/charts/OccupancyChart';
import { SIMULATED_LOTS, SIMULATED_HISTORY } from '@/data/simulated';
import { statusColors } from '@/lib/status';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const lotsWithHistory = SIMULATED_LOTS.filter((l) =>
  SIMULATED_HISTORY.some((h) => h.lotId === l.slug)
);

export default function TrendsPage() {
  const [selectedLotSlug, setSelectedLotSlug] = useState(lotsWithHistory[0]?.slug ?? '');
  const [selectedDay, setSelectedDay] = useState('Tue');

  const lot = lotsWithHistory.find((l) => l.slug === selectedLotSlug);
  const history = SIMULATED_HISTORY.find((h) => h.lotId === selectedLotSlug);

  const peak = history?.data.reduce((max, d) => (d.occupied > max.occupied ? d : max));
  const emptiest = history?.data.reduce((min, d) => (d.occupied < min.occupied ? d : min));

  return (
    <AppShell>
      <Header title="Trends" />

      <div className="space-y-4 px-4 pt-4">
        {/* Lot selector */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {lotsWithHistory.map((l) => (
            <button
              key={l.slug}
              onClick={() => setSelectedLotSlug(l.slug)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedLotSlug === l.slug
                  ? 'bg-njit-red text-white'
                  : 'bg-surface-tertiary text-ink-secondary'
              }`}
            >
              {l.name.replace('Parking ', '').replace(' Garage', '')}
            </button>
          ))}
        </div>

        {/* Day selector */}
        <div className="flex gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 rounded-lg py-1.5 text-sm transition-colors ${
                selectedDay === day
                  ? 'bg-surface-tertiary font-semibold text-ink'
                  : 'font-normal text-ink-tertiary'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Chart */}
        {lot && history ? (
          <>
            <div className="rounded-xl border bg-surface p-4">
              <p className="mb-1 text-sm font-semibold text-ink">
                {lot.name} · {selectedDay}
              </p>
              <p className="mb-4 text-xs text-ink-tertiary">
                Average occupied vehicles by time of day
              </p>
              <OccupancyChart
                data={history.data}
                total={lot.total}
                color={statusColors[lot.status]}
                height={280}
              />
            </div>

            {/* Insights */}
            <div className="space-y-3 rounded-xl border bg-surface-secondary p-4">
              <p className="text-sm font-semibold text-ink">Insights</p>
              {peak && (
                <div className="flex items-start gap-2.5">
                  <TrendingUp size={15} className="mt-0.5 text-status-filling" />
                  <p className="text-sm text-ink-secondary">
                    Peak at <strong>{peak.time}</strong> — {peak.occupied} avg occupied
                  </p>
                </div>
              )}
              {emptiest && (
                <div className="flex items-start gap-2.5">
                  <TrendingDown size={15} className="mt-0.5 text-status-open" />
                  <p className="text-sm text-ink-secondary">
                    Emptiest at <strong>{emptiest.time}</strong> — {emptiest.occupied} avg occupied
                  </p>
                </div>
              )}
              {peak && (
                <div className="flex items-start gap-2.5">
                  <Clock size={15} className="mt-0.5 text-blue-600" />
                  <p className="text-sm text-ink-secondary">
                    Arrive before <strong>8:30 am</strong> for a guaranteed spot
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-12 text-center text-ink-tertiary">
            <p className="text-sm">No historical data for this lot yet.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
