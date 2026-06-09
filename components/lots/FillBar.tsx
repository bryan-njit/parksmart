import { LotStatus } from '@/types';
import { statusBgClass } from '@/lib/status';

interface FillBarProps {
  available: number | null;
  total: number;
  status: LotStatus;
  size?: 'sm' | 'lg';
}

export default function FillBar({ available, total, status, size = 'sm' }: FillBarProps) {
  const pct = available !== null && total > 0 ? Math.min((available / total) * 100, 100) : 0;

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-surface-tertiary ${
        size === 'sm' ? 'h-1.5' : 'h-2.5'
      }`}
    >
      {status === 'unknown' ? (
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'repeating-linear-gradient(90deg, #e2e8f0 0px, #e2e8f0 6px, transparent 6px, transparent 12px)',
          }}
        />
      ) : (
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${statusBgClass[status]}`}
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  );
}
