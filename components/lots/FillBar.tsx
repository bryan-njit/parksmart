import { LotStatus } from '@/types';
import { statusColors } from '@/lib/status';

interface FillBarProps {
  available: number | null;
  total: number;
  status: LotStatus;
  size?: 'sm' | 'lg';
}

export default function FillBar({ available, total, status, size = 'sm' }: FillBarProps) {
  const height = size === 'sm' ? 6 : 10;
  const pct = available !== null && total > 0 ? Math.min((available / total) * 100, 100) : 0;
  const color = statusColors[status];
  const unknown = status === 'unknown';

  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{
        height,
        backgroundColor: 'var(--surface-tertiary)',
      }}
    >
      {unknown ? (
        <div
          className="h-full w-full rounded-full"
          style={{
            background: 'repeating-linear-gradient(90deg, var(--border-default) 0px, var(--border-default) 6px, transparent 6px, transparent 12px)',
          }}
        />
      ) : (
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      )}
    </div>
  );
}
