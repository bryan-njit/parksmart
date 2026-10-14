import Link from 'next/link';
import { Lot } from '@/types';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusLabels, statusPillClass, statusTextClass } from '@/lib/status';
import StatusDot from './StatusDot';
import FillBar from './FillBar';
import PermitBadge from './PermitBadge';
import { Footprints, WifiOff } from 'lucide-react';

interface LotCardProps {
  lot: Lot;
  walkMinutes?: number;
}

// shared with RecommendedCard so both cards look the same
export const cardClass =
  'rounded-2xl border bg-surface shadow-card transition hover:border-njit-red/30 active:scale-[0.98]';

export default function LotCard({ lot, walkMinutes }: LotCardProps) {
  const isUnknown = lot.status === 'unknown';

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
