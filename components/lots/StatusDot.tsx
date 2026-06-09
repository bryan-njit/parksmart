import { LotStatus } from '@/types';
import { statusBgClass } from '@/lib/status';

export default function StatusDot({ status }: { status: LotStatus }) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${statusBgClass[status]} ${
        status === 'open' ? 'pulse-dot' : ''
      }`}
    />
  );
}
