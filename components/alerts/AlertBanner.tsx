import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { Alert } from '@/types';

const config = {
  danger: {
    bg: 'var(--njit-red-subtle)',
    border: 'var(--njit-red)',
    icon: XCircle,
    iconColor: 'var(--njit-red)',
  },
  warning: {
    bg: '#FEFCE8',
    border: '#CA8A04',
    icon: AlertTriangle,
    iconColor: '#CA8A04',
  },
  info: {
    bg: '#EFF6FF',
    border: '#2563EB',
    icon: Info,
    iconColor: '#2563EB',
  },
};

export default function AlertBanner({ alert }: { alert: Alert }) {
  const { bg, border, icon: Icon, iconColor } = config[alert.severity];
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 border-l-4"
      style={{ backgroundColor: bg, borderLeftColor: border }}
    >
      <Icon size={16} style={{ color: iconColor, marginTop: 1 }} className="shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {alert.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {alert.subtitle}
        </p>
      </div>
    </div>
  );
}
