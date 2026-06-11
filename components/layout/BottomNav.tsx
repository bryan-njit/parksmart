'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Map, TrendingUp, MessageCircle, Bell } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Dashboard', icon: Car },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/trends', label: 'Trends', icon: TrendingUp },
  { href: '/report', label: 'Report', icon: MessageCircle },
  { href: '/alerts', label: 'Alerts', icon: Bell },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-surface shadow-nav">
      <div className="mx-auto flex max-w-lg">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex min-h-[64px] flex-1 flex-col items-center justify-center gap-1 py-3"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.8}
                className={active ? 'text-njit-red' : 'text-ink-tertiary'}
              />
              <span
                className={`text-xs font-medium ${active ? 'text-njit-red' : 'text-ink-tertiary'}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
