import { notFound } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import FillBar from '@/components/lots/FillBar';
import PermitBadge from '@/components/lots/PermitBadge';
import OccupancyChart from '@/components/charts/OccupancyChart';
import { SIMULATED_LOTS, SIMULATED_HISTORY } from '@/data/simulated';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusColors, statusTextClass } from '@/lib/status';
import { Shield, Clock, MapPin } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export default function LotDetailPage({ params }: Props) {
  const lot = SIMULATED_LOTS.find((l) => l.slug === params.slug);
  if (!lot) notFound();

  const history = SIMULATED_HISTORY.find((h) => h.lotId === lot.slug);
  const peakPoint = history?.data.reduce((max, d) => (d.occupied > max.occupied ? d : max));

  return (
    <AppShell>
      <Header title={lot.name} showBack showDirections directionsURL={lot.addressURL} />

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
          </div>
        </div>

        {/* Permit info */}
        <div className="space-y-2 rounded-xl border bg-surface-secondary p-4">
          <div className="mb-3 flex items-center gap-2">
            <Shield size={16} className="text-njit-red" />
            <span className="text-sm font-semibold text-ink">Permit Info</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lot.permits.map((p) => (
              <span
                key={p}
                className="rounded-full bg-surface-tertiary px-2 py-1 text-xs text-ink-secondary"
              >
                {p}
              </span>
            ))}
            <PermitBadge type={lot.type} />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Clock size={14} className="text-ink-tertiary" />
            <span className="text-xs text-ink-secondary">{lot.enforcementHours}</span>
          </div>
          {lot.freeAfter && <p className="text-xs text-ink-secondary">{lot.freeAfter}</p>}
        </div>

        {/* Historical chart */}
        {history && (
          <div className="rounded-xl border bg-surface p-4">
            <p className="mb-4 text-sm font-semibold text-ink">Today&apos;s Typical Pattern</p>
            <OccupancyChart data={history.data} total={lot.total} color={statusColors[lot.status]} />
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
        {Object.keys(lot.walkingDistances).length > 0 && (
          <div className="rounded-xl border bg-surface-secondary p-4">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-ink-secondary" />
              <span className="text-sm font-semibold text-ink">Walking Distances</span>
            </div>
            <div className="space-y-1.5">
              {Object.entries(lot.walkingDistances).map(([building, time]) => (
                <div key={building} className="flex justify-between">
                  <span className="text-sm text-ink-secondary">{building}</span>
                  <span className="text-sm font-medium text-ink">{time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
