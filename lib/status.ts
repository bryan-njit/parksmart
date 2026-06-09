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

export const statusColors: Record<LotStatus, string> = {
  open: '#16A34A',
  filling: '#CA8A04',
  busy: '#EA580C',
  full: '#DC2626',
  unknown: '#94A3B8',
};

export const statusBgColors: Record<LotStatus, string> = {
  open: '#F0FDF4',
  filling: '#FEFCE8',
  busy: '#FFF7ED',
  full: '#FEF2F2',
  unknown: '#F8FAFC',
};

export const statusLabels: Record<LotStatus, string> = {
  open: 'Open',
  filling: 'Filling',
  busy: 'Busy',
  full: 'Full',
  unknown: 'No Data',
};
