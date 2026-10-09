import { LotStatus } from '@/types';

export function getStatus(available: number | null, total: number): LotStatus {
  if (available === null || isNaN(available) || available < 0 || available > total) {
    return 'unknown';
  }
  const pct = available / total;
  if (pct <= 0.10) return 'full';
  if (pct <= 0.25) return 'busy';
  if (pct <= 0.50) return 'filling';
  return 'open';
}

// hex values for things that can't use Tailwind classes (charts, map markers)
export const statusColors: Record<LotStatus, string> = {
  open: '#34D399',
  filling: '#FBBF24',
  busy: '#FB923C',
  full: '#F87171',
  unknown: '#71717A',
};

export const statusTextClass: Record<LotStatus, string> = {
  open: 'text-status-open',
  filling: 'text-status-filling',
  busy: 'text-status-busy',
  full: 'text-status-full',
  unknown: 'text-ink-tertiary',
};

export const statusBgClass: Record<LotStatus, string> = {
  open: 'bg-status-open',
  filling: 'bg-status-filling',
  busy: 'bg-status-busy',
  full: 'bg-status-full',
  unknown: 'bg-status-unknown',
};

// small rounded label next to the spot count
export const statusPillClass: Record<LotStatus, string> = {
  open: 'bg-status-open-bg text-status-open',
  filling: 'bg-status-filling-bg text-status-filling',
  busy: 'bg-status-busy-bg text-status-busy',
  full: 'bg-status-full-bg text-status-full',
  unknown: 'bg-status-unknown-bg text-ink-tertiary',
};

export const statusLabels: Record<LotStatus, string> = {
  open: 'Open',
  filling: 'Filling Up',
  busy: 'Almost Full',
  full: 'Full',
  unknown: 'Offline',
};
