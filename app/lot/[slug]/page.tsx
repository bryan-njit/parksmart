'use client';

import { notFound } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import FillBar from '@/components/lots/FillBar';
import PermitBadge from '@/components/lots/PermitBadge';
import OccupancyChart from '@/components/charts/OccupancyChart';
import { SIMULATED_HISTORY } from '@/data/simulated';
import { useParkingData } from '@/hooks/useParkingData';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusColors, statusTextClass } from '@/lib/status';
import { BUILDINGS, walkMinutes } from '@/lib/buildings';
import { Clock, MapPin } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export default function LotDetailPage({ params }: Props) {
  const { lots } = useParkingData();
  const lot = lots.find((l) => l.slug === params.slug);
  if (!lot) notFound();

  const history = SIMULATED_HISTORY.find((h) => h.lotId === lot.slug);
  const peakPoint = history?.data.reduce((max, d) => (d.occupied > max.occupied ? d : max));

  // the 4 closest buildings, same math as the dashboard
  const nearby = BUILDINGS.map((b) => ({ name: b.name, minutes: walkMinutes(lot, b) }))
    .sort((a, b) => a.minutes - b.minutes)
    .slice(0, 4);

  return (
    <AppShell>
      <Header title={lot.name} showBack />

      <div className="space-y-6 px-4 pb-2 pt-6">
        {/* Hero number */}
        <div className="text-center">
          <p className={`font-mono text-5xl font-bold leading-none ${statusTextClass[lot.status]}`}>
            {formatAvailable(lot.available)}
          </p>
          <p className="mt-1 text-sm text-ink-secondary">spots available</p>
          <div className="mt-4 px-4">
            <FillBar available={lot.available} total={lot.total} status={lot.status} size="lg" />
            <p className="mt-2 text-center text-sm text-ink-secondary">
              {lot.available !== null ? lot.available.toLocaleString() : '—'} of{' '}
              {lot.total.toLocaleString()} · {formatPct(lot.available, lot.total)} open
            </p>
            <div className="mt-3">
              <PermitBadge type={lot.type} />
            </div>
          </div>
        </div>

        {/* Historical chart */}
        {history && (
          <div className="rounded-xl border bg-surface p-4">
            <p className="mb-4 text-sm font-semibold text-ink">Typical Day</p>
            <OccupancyChart data={history.data} color={statusColors[lot.status]} />
            {peakPoint && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-status-filling-bg px-3 py-2">
                <Clock size={14} className="text-status-filling" />
                <span className="text-xs text-ink-secondary">
                  Peak at <strong>{peakPoint.time}</strong> — {peakPoint.occupied} cars avg
                </span>
              </div>
            )}
          </div>
        )}

        {/* Walking distances */}
        <div className="rounded-xl border bg-surface-secondary p-4">
          <div className="mb-3 flex items-center gap-2">
            <MapPin size={16} className="text-ink-secondary" />
            <span className="text-sm font-semibold text-ink">Nearby Buildings</span>
          </div>
          <div className="space-y-1.5">
            {nearby.map((b) => (
              <div key={b.name} className="flex justify-between">
                <span className="text-sm text-ink-secondary">{b.name}</span>
                <span className="text-sm font-medium text-ink">{b.minutes} min walk</span>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="pb-4">
          <p className="text-sm text-ink-tertiary">{lot.address}</p>
          <a
            href={lot.addressURL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm font-medium text-njit-red"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </AppShell>
  );
}
