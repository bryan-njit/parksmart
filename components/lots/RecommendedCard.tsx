import Link from 'next/link';
import { Lot } from '@/types';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusLabels, statusTextClass } from '@/lib/status';
import { cardClass } from './LotCard';
import StatusDot from './StatusDot';
import FillBar from './FillBar';
import PermitBadge from './PermitBadge';
import { Footprints, MapPin } from 'lucide-react';

interface RecommendedCardProps {
  lot: Lot;
  label: string;
  walkMinutes?: number;
}

// the big card at the top of the dashboard
export default function RecommendedCard({ lot, label, walkMinutes }: RecommendedCardProps) {
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
