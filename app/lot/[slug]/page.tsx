import { notFound } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import FillBar from '@/components/lots/FillBar';
import PermitBadge from '@/components/lots/PermitBadge';
import OccupancyChart from '@/components/charts/OccupancyChart';
import { SIMULATED_LOTS, SIMULATED_HISTORY } from '@/data/simulated';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusColors } from '@/lib/status';
import { Shield, Clock, MapPin } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export default function LotDetailPage({ params }: Props) {
  const lot = SIMULATED_LOTS.find((l) => l.slug === params.slug);
  if (!lot) notFound();

  const history = SIMULATED_HISTORY.find((h) => h.lotId === lot.slug);
  const peakPoint = history?.data.reduce((max, d) => (d.occupied > max.occupied ? d : max));
  const availColor = lot.status === 'unknown' ? 'var(--text-tertiary)' : statusColors[lot.status];

  return (
    <AppShell>
      <Header
        title={lot.name}
        showBack
        showDirections
        directionsURL={lot.addressURL}
      />

      <div className="px-4 pt-6 pb-2 space-y-6">
        {/* Hero number */}
        <div className="text-center">
          <p
            className="font-mono font-bold leading-none"
            style={{ fontSize: 48, color: availColor }}
          >
            {formatAvailable(lot.available)}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            spots available
          </p>
          <div className="mt-4 px-4">
            <FillBar available={lot.available} total={lot.total} status={lot.status} size="lg" />
            <p className="text-sm mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
              {lot.available !== null ? lot.available.toLocaleString() : '—'} of{' '}
              {lot.total.toLocaleString()} · {formatPct(lot.available, lot.total)} open
            </p>
          </div>
        </div>

        {/* Permit info */}
        <div
          className="rounded-xl border p-4 space-y-2"
          style={{ borderColor: 'var(--border-default)', background: 'var(--surface-secondary)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} style={{ color: 'var(--njit-red)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Permit Info
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lot.permits.map((p) => (
              <span
                key={p}
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: 'var(--surface-tertiary)', color: 'var(--text-secondary)' }}
              >
                {p}
              </span>
            ))}
            <PermitBadge type={lot.type} />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Clock size={14} style={{ color: 'var(--text-tertiary)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {lot.enforcementHours}
            </span>
          </div>
          {lot.freeAfter && (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {lot.freeAfter}
            </p>
          )}
        </div>

        {/* Historical chart */}
        {history && (
          <div
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--border-default)', background: 'var(--surface-primary)' }}
          >
            <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Today&apos;s Typical Pattern
            </p>
            <OccupancyChart data={history.data} total={lot.total} color={statusColors[lot.status]} />
            {peakPoint && (
              <div
                className="mt-3 px-3 py-2 rounded-lg flex items-center gap-2"
                style={{ background: 'var(--status-filling-bg)' }}
              >
                <Clock size={14} style={{ color: '#CA8A04' }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Peak at <strong>{peakPoint.time}</strong> — {peakPoint.occupied} cars avg
                </span>
              </div>
            )}
          </div>
        )}

        {/* Walking distances */}
        {Object.keys(lot.walkingDistances).length > 0 && (
          <div
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--border-default)', background: 'var(--surface-secondary)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} style={{ color: 'var(--text-secondary)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Walking Distances
              </span>
            </div>
            <div className="space-y-1.5">
              {Object.entries(lot.walkingDistances).map(([building, time]) => (
                <div key={building} className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {building}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Address */}
        <div className="pb-4">
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {lot.address}
          </p>
          <a
            href={lot.addressURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium mt-1 inline-block"
            style={{ color: 'var(--njit-red)' }}
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </AppShell>
  );
}
