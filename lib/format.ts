export function formatAvailable(value: number | null): string {
  if (value === null) return '—';
  return value.toLocaleString();
}

export function formatPct(available: number | null, total: number): string {
  if (available === null || available < 0 || available > total) return '—';
  return `${Math.round((available / total) * 100)}%`;
}

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)} hr ago`;
}

export function parseAvailable(raw: string): number | null {
  const n = parseInt(raw, 10);
  return isNaN(n) ? null : n;
}
