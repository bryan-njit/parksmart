export function formatAvailable(value: number | null): string {
  if (value === null) return '—';
  return value.toLocaleString();
}

export function formatPct(available: number | null, total: number): string {
  if (available === null || available < 0 || available > total) return '—';
  return `${Math.round((available / total) * 100)}%`;
}

export function parseAvailable(raw: string): number | null {
  const n = parseInt(raw, 10);
  return isNaN(n) ? null : n;
}
