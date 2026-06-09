import Link from 'next/link';
import { Lot } from '@/types';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusTextClass } from '@/lib/status';
import StatusDot from './StatusDot';
import FillBar from './FillBar';
import PermitBadge from './PermitBadge';
import { AlertTriangle, Star } from 'lucide-react';

interface LotCardProps {
  lot: Lot;
  size?: 'sm' | 'lg';
}

export default function LotCard({ lot, size = 'sm' }: LotCardProps) {
  const isUnknown = lot.status === 'unknown';

  if (size === 'lg') {
    return (
      <Link
        href={`/lot/${lot.slug}`}
        className="block rounded-xl border bg-surface p-5 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <div className="mb-1 flex items-center gap-1.5">
          <Star size={12} className="fill-njit-red text-njit-red" />
          <p className="text-xs font-semibold uppercase tracking-wide text-njit-red">
            Best lot right now
          </p>
        </div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold leading-tight text-ink">{lot.name}</h2>
          <div className="flex shrink-0 items-center gap-2">
            <StatusDot status={lot.status} />
            <span
              className={`font-mono text-3xl font-bold leading-none tabular-nums ${statusTextClass[lot.status]}`}
            >
              {formatAvailable(lot.available)}
            </span>
          </div>
        </div>
        <FillBar available={lot.available} total={lot.total} status={lot.status} size="lg" />
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-sm text-ink-secondary">
            {formatPct(lot.available, lot.total)} open · {lot.total.toLocaleString()} total spots
          </span>
          <PermitBadge type={lot.type} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/lot/${lot.slug}`}
      className="flex min-h-[124px] flex-col rounded-xl border bg-surface p-3.5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <p className="line-clamp-1 text-sm font-medium leading-tight text-ink">{lot.name}</p>

      <div className="mt-2.5 flex flex-1 items-center gap-1.5">
        {isUnknown ? (
          <>
            <AlertTriangle size={15} className="text-ink-tertiary" />
            <span className="text-sm font-medium text-ink-tertiary">No data</span>
          </>
        ) : (
          <>
            <StatusDot status={lot.status} />
            <span
              className={`font-mono text-xl font-bold leading-none tabular-nums ${statusTextClass[lot.status]}`}
            >
              {formatAvailable(lot.available)}
            </span>
          </>
        )}
      </div>

      <div className="mt-2.5">
        <FillBar available={lot.available} total={lot.total} status={lot.status} />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-ink-secondary">
            {isUnknown ? 'Unavailable' : `${formatPct(lot.available, lot.total)} open`}
          </span>
          <PermitBadge type={lot.type} />
        </div>
      </div>
    </Link>
  );
}
