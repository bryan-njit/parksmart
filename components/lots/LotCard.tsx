import Link from 'next/link';
import { Lot } from '@/types';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusLabels, statusPillClass, statusTextClass } from '@/lib/status';
import StatusDot from './StatusDot';
import FillBar from './FillBar';
import PermitBadge from './PermitBadge';
import { Footprints, MapPin, WifiOff } from 'lucide-react';

interface LotCardProps {
  lot: Lot;
  size?: 'sm' | 'lg';
  label?: string;
  walkMinutes?: number;
}

const cardClass =
  'rounded-2xl border bg-surface shadow-card transition hover:border-njit-red/30 active:scale-[0.98]';

export default function LotCard({ lot, size = 'sm', label = 'Recommended', walkMinutes }: LotCardProps) {
  const isUnknown = lot.status === 'unknown';

  if (size === 'lg') {
    // just the street part, e.g. "154 Summit Street"
    const street = lot.address.split(',')[0];

    return (
      <Link href={`/lot/${lot.slug}`} className={`relative block overflow-hidden p-5 ${cardClass}`}>
        {/* thin red line across the top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-njit-red to-transparent" />

        <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-njit-red">
          <span className="h-1.5 w-1.5 rounded-full bg-njit-red" />
          {label}
        </p>

        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-snug text-ink">{lot.name}</h2>
            <p className="mt-1 flex items-center gap-1 text-xs text-ink-tertiary">
              <MapPin size={12} />
              {street}
            </p>
            {walkMinutes !== undefined && (
              <p className="mt-1 flex items-center gap-1 text-xs text-ink-secondary">
                <Footprints size={12} />
                {walkMinutes} min walk
              </p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p
              className={`font-mono text-4xl font-bold leading-none tabular-nums ${statusTextClass[lot.status]}`}
            >
              {formatAvailable(lot.available)}
            </p>
            <p className="mt-1.5 text-[11px] uppercase tracking-wider text-ink-tertiary">
              spots open
            </p>
          </div>
        </div>

        <FillBar available={lot.available} total={lot.total} status={lot.status} size="lg" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <StatusDot status={lot.status} />
            <span className={`font-semibold ${statusTextClass[lot.status]}`}>
              {statusLabels[lot.status]}
            </span>
            <span className="text-ink-tertiary">· {formatPct(lot.available, lot.total)} available</span>
          </div>
          <PermitBadge type={lot.type} />
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/lot/${lot.slug}`} className={`flex flex-col p-4 ${cardClass}`}>
      <p
        className={`line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight ${
          isUnknown ? 'text-ink-tertiary' : 'text-ink'
        }`}
      >
        {lot.name}
      </p>

      {isUnknown ? (
        <div className="my-3 flex h-8 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tertiary">
            <WifiOff size={14} className="text-ink-tertiary" />
          </div>
          <span className="text-sm font-medium text-ink-secondary">Offline</span>
        </div>
      ) : (
        <div className="my-3 flex h-8 items-center gap-2">
          <StatusDot status={lot.status} />
          <span
            className={`font-mono text-2xl font-bold leading-none tabular-nums ${statusTextClass[lot.status]}`}
          >
            {formatAvailable(lot.available)}
          </span>
          <span
            className={`ml-auto whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusPillClass[lot.status]}`}
          >
            {statusLabels[lot.status]}
          </span>
        </div>
      )}

      <FillBar available={lot.available} total={lot.total} status={lot.status} />

      <div className="mt-2.5 flex items-center justify-between gap-2">
        {walkMinutes !== undefined ? (
          <span className="flex items-center gap-1 whitespace-nowrap text-xs text-ink-secondary">
            <Footprints size={12} />
            {walkMinutes} min
          </span>
        ) : (
          <span className="text-xs text-ink-tertiary">
            {isUnknown ? 'No data' : `${formatPct(lot.available, lot.total)} open`}
          </span>
        )}
        <PermitBadge type={lot.type} />
      </div>
    </Link>
  );
}
