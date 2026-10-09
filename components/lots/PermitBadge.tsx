import { PermitType } from '@/types';

const styles: Record<PermitType, { classes: string; label: string }> = {
  general: { classes: 'bg-surface-tertiary text-ink-secondary', label: 'General' },
  reserved: { classes: 'bg-rose-500/10 text-rose-300', label: 'Reserved' },
  facstaff: { classes: 'bg-violet-500/10 text-violet-300', label: 'Faculty/Staff' },
};

export default function PermitBadge({ type }: { type: PermitType }) {
  const s = styles[type];
  return (
    <span className={`whitespace-nowrap rounded-md px-1.5 py-0.5 text-[11px] font-medium ${s.classes}`}>
      {s.label}
    </span>
  );
}
