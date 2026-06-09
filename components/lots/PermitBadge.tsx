import { PermitType } from '@/types';

const styles: Record<PermitType, { classes: string; label: string }> = {
  general: { classes: 'bg-slate-100 text-slate-600', label: 'General' },
  reserved: { classes: 'bg-red-50 text-red-700', label: 'Reserved' },
  facstaff: { classes: 'bg-violet-50 text-violet-700', label: 'Faculty/Staff' },
};

export default function PermitBadge({ type }: { type: PermitType }) {
  const s = styles[type];
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${s.classes}`}>
      {s.label}
    </span>
  );
}
