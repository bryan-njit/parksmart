import { LotStatus } from '@/types';
import { statusColors } from '@/lib/status';

export default function StatusDot({ status }: { status: LotStatus }) {
  return (
    <span
      className={`inline-block rounded-full shrink-0 ${status === 'open' ? 'pulse-dot' : ''}`}
      style={{
        width: 8,
        height: 8,
        backgroundColor: statusColors[status],
      }}
    />
  );
}
