import Link from 'next/link';
import { Settings, RefreshCw, ChevronLeft, MapPin } from 'lucide-react';

interface HeaderProps {
  title: string;
  brand?: boolean;
  showBack?: boolean;
  showRefresh?: boolean;
  showSettings?: boolean;
  showDirections?: boolean;
  directionsURL?: string;
}

export default function Header({
  title,
  brand = false,
  showBack = false,
  showRefresh = false,
  showSettings = false,
  showDirections = false,
  directionsURL,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-surface px-4 shadow-card">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {showBack && (
          <Link
            href="/"
            className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
          >
            <ChevronLeft size={20} className="text-ink-secondary" />
          </Link>
        )}
        {brand ? (
          <h1 className="truncate text-lg font-bold tracking-tight text-ink">
            Park<span className="text-njit-red">Smart</span>
          </h1>
        ) : (
          <h1 className="truncate text-base font-semibold text-ink">{title}</h1>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {showDirections && directionsURL && (
          <a
            href={directionsURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
          >
            <MapPin size={18} className="text-ink-secondary" />
          </a>
        )}
        {showRefresh && (
          <button className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-slate-100">
            <RefreshCw size={18} className="text-ink-secondary" />
          </button>
        )}
        {showSettings && (
          <Link
            href="/settings"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
          >
            <Settings size={18} className="text-ink-secondary" />
          </Link>
        )}
      </div>
    </header>
  );
}
