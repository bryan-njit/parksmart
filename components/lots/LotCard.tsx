import Link from 'next/link';
import { Lot } from '@/types';
import { formatAvailable, formatPct } from '@/lib/format';
import { statusColors } from '@/lib/status';
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
  const availColor = isUnknown ? 'var(--text-tertiary)' : statusColors[lot.status];

  if (size === 'lg') {
    return (
      <Link
        href={`/lot/${lot.slug}`}
        className="block bg-white rounded-xl border p-4 transition-shadow hover:shadow-md"
        style={{ borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'var(--njit-red)' }}>
              ★ Best Lot Right Now
            </p>
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
              {lot.name}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <StatusDot status={lot.status} />
            <span
              className="font-mono font-bold text-2xl leading-none"
              style={{ color: availColor }}
            >
              {formatAvailable(lot.available)}
            </span>
          </div>
        </div>
        <FillBar available={lot.available} total={lot.total} status={lot.status} size="lg" />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
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
      className="block bg-white rounded-xl border p-3.5 transition-shadow hover:shadow-md"
      style={{ borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
    >
      <p className="font-medium text-sm leading-tight mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
        {lot.name}
      </p>

      {isUnknown ? (
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle size={14} style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No Data</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 mb-2">
          <StatusDot status={lot.status} />
          <span
            className="font-mono font-bold text-lg leading-none"
            style={{ color: availColor }}
          >
            {formatAvailable(lot.available)}
          </span>
        </div>
      )}

      <FillBar available={lot.available} total={lot.total} status={lot.status} />

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {isUnknown ? 'Unavailable' : `${formatPct(lot.available, lot.total)} open`}
        </span>
        <PermitBadge type={lot.type} />
      </div>
    </Link>
  );
}
