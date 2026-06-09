import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { Alert } from '@/types';

const config = {
  danger: {
    classes: 'bg-njit-red-subtle border-njit-red',
    icon: XCircle,
    iconClass: 'text-njit-red',
  },
  warning: {
    classes: 'bg-status-filling-bg border-status-filling',
    icon: AlertTriangle,
    iconClass: 'text-status-filling',
  },
  info: {
    classes: 'bg-blue-50 border-blue-600',
    icon: Info,
    iconClass: 'text-blue-600',
  },
};

export default function AlertBanner({ alert }: { alert: Alert }) {
  const { classes, icon: Icon, iconClass } = config[alert.severity];
  return (
    <div className={`flex items-start gap-3 border-l-4 px-4 py-3 ${classes}`}>
      <Icon size={16} className={`mt-0.5 shrink-0 ${iconClass}`} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{alert.title}</p>
        <p className="mt-0.5 text-xs text-ink-secondary">{alert.subtitle}</p>
      </div>
    </div>
  );
}
