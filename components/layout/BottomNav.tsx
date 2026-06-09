'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, TrendingUp, MessageCircle, Bell } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Dashboard', icon: Car },
  { href: '/trends', label: 'Trends', icon: TrendingUp },
  { href: '/report', label: 'Report', icon: MessageCircle },
  { href: '/alerts', label: 'Alerts', icon: Bell },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50"
      style={{ boxShadow: 'var(--shadow-nav)' }}
    >
      <div className="max-w-lg mx-auto flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[64px]"
            >
              <Icon
                size={22}
                style={{ color: active ? 'var(--njit-red)' : 'var(--text-tertiary)' }}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className="text-xs font-medium"
                style={{ color: active ? 'var(--njit-red)' : 'var(--text-tertiary)' }}
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
