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

      <div className="px-4 pt-4 space-y-4">
        {/* Lot selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {lotsWithHistory.map((l) => (
            <button
              key={l.slug}
              onClick={() => setSelectedLotSlug(l.slug)}
              className="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
              style={{
                background: selectedLotSlug === l.slug ? 'var(--njit-red)' : 'var(--surface-tertiary)',
                color: selectedLotSlug === l.slug ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {l.name.replace('Parking ', '').replace(' Garage', '').replace(' Deck', ' Deck')}
            </button>
          ))}
        </div>

        {/* Day selector */}
        <div className="flex gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: selectedDay === day ? 'var(--surface-tertiary)' : 'transparent',
                color: selectedDay === day ? 'var(--text-primary)' : 'var(--text-tertiary)',
                fontWeight: selectedDay === day ? 600 : 400,
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Chart */}
        {lot && history ? (
          <>
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: 'var(--border-default)', background: 'var(--surface-primary)' }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {lot.name} · {selectedDay}
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
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
            <div
              className="rounded-xl border p-4 space-y-3"
              style={{ borderColor: 'var(--border-default)', background: 'var(--surface-secondary)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Insights
              </p>
              {peak && (
                <div className="flex items-start gap-2.5">
                  <TrendingUp size={15} style={{ color: '#CA8A04', marginTop: 1 }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Peak at <strong>{peak.time}</strong> — {peak.occupied} avg occupied
                  </p>
                </div>
              )}
              {emptiest && (
                <div className="flex items-start gap-2.5">
                  <TrendingDown size={15} style={{ color: '#16A34A', marginTop: 1 }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Emptiest at <strong>{emptiest.time}</strong> — {emptiest.occupied} avg occupied
                  </p>
                </div>
              )}
              {peak && (
                <div className="flex items-start gap-2.5">
                  <Clock size={15} style={{ color: '#2563EB', marginTop: 1 }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Arrive before <strong>8:30 am</strong> for a guaranteed spot
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
            <p className="text-sm">No historical data for this lot yet.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
