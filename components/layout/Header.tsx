import Link from 'next/link';
import { Settings, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  brand?: boolean;
  showBack?: boolean;
  showSettings?: boolean;
}

export default function Header({
  title,
  brand = false,
  showBack = false,
  showSettings = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-surface px-4 shadow-card">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {showBack && (
          <Link
            href="/"
            aria-label="Back"
            className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface-tertiary"
          >
            <ChevronLeft size={20} className="text-ink-secondary" />
          </Link>
        )}
        {brand ? (
          <>
            <h1 className="truncate text-lg font-bold tracking-tight text-ink">
              Park<span className="text-njit-red">Smart</span>
            </h1>
            {/* all numbers are simulated until NJIT shares real data */}
            <span className="rounded-md bg-surface-tertiary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              Demo data
            </span>
          </>
        ) : (
          <h1 className="truncate text-base font-semibold text-ink">{title}</h1>
        )}
      </div>

      {showSettings && (
        <Link
          href="/settings"
          aria-label="Settings"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface-tertiary"
        >
          <Settings size={18} className="text-ink-secondary" />
        </Link>
      )}
    </header>
  );
}
