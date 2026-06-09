import Link from 'next/link';
import { Settings, RefreshCw, ChevronLeft, MapPin } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showRefresh?: boolean;
  showSettings?: boolean;
  showDirections?: boolean;
  directionsURL?: string;
}

export default function Header({
  title,
  showBack = false,
  showRefresh = false,
  showSettings = false,
  showDirections = false,
  directionsURL,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 bg-white z-40 flex items-center h-14 px-4 border-b border-slate-200"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {showBack && (
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 transition-colors -ml-1 shrink-0"
          >
            <ChevronLeft size={20} style={{ color: 'var(--text-secondary)' }} />
          </Link>
        )}
        <h1 className="text-base font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {showDirections && directionsURL && (
          <a
            href={directionsURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors"
          >
            <MapPin size={18} style={{ color: 'var(--text-secondary)' }} />
          </a>
        )}
        {showRefresh && (
          <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors">
            <RefreshCw size={18} style={{ color: 'var(--text-secondary)' }} />
          </button>
        )}
        {showSettings && (
          <Link
            href="/settings"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors"
          >
            <Settings size={18} style={{ color: 'var(--text-secondary)' }} />
          </Link>
        )}
      </div>
    </header>
  );
}
