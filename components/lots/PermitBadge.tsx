import { PermitType } from '@/types';

const styles: Record<PermitType, { bg: string; text: string; label: string }> = {
  general: { bg: '#F1F5F9', text: '#475569', label: 'General' },
  reserved: { bg: '#FEF2F2', text: '#B91C1C', label: 'Reserved' },
  facstaff: { bg: '#F5F3FF', text: '#6D28D9', label: 'Faculty/Staff' },
};

export default function PermitBadge({ type }: { type: PermitType }) {
  const s = styles[type];
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}
