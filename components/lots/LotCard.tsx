import Link from 'next/link';
import { Lot } from '@/types';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusTextClass } from '@/lib/status';
import StatusDot from './StatusDot';
import FillBar from './FillBar';
import PermitBadge from './PermitBadge';
import { AlertTriangle } from 'lucide-react';

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
        className="block rounded-xl border bg-surface p-4 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-njit-red">
              ★ Best Lot Right Now
            </p>
            <h2 className="text-base font-semibold text-ink">{lot.name}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <StatusDot status={lot.status} />
            <span className={`font-mono text-2xl font-bold leading-none ${statusTextClass[lot.status]}`}>
              {formatAvailable(lot.available)}
            </span>
          </div>
        </div>
        <FillBar available={lot.available} total={lot.total} status={lot.status} size="lg" />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-ink-secondary">
            {formatPct(lot.available, lot.total)} open
          </span>
          <PermitBadge type={lot.type} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/lot/${lot.slug}`}
      className="block rounded-xl border bg-surface p-3.5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <p className="mb-2 line-clamp-2 text-sm font-medium leading-tight text-ink">
        {lot.name}
      </p>

      {isUnknown ? (
        <div className="mb-2 flex items-center gap-1.5">
          <AlertTriangle size={14} className="text-ink-tertiary" />
          <span className="text-sm text-ink-tertiary">No Data</span>
        </div>
      ) : (
        <div className="mb-2 flex items-center gap-1.5">
          <StatusDot status={lot.status} />
          <span className={`font-mono text-lg font-bold leading-none ${statusTextClass[lot.status]}`}>
            {formatAvailable(lot.available)}
          </span>
        </div>
      )}

      <FillBar available={lot.available} total={lot.total} status={lot.status} />

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-ink-secondary">
          {isUnknown ? 'Unavailable' : `${formatPct(lot.available, lot.total)} open`}
        </span>
        <PermitBadge type={lot.type} />
      </div>
    </Link>
  );
}
