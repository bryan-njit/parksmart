'use client';

import dynamic from 'next/dynamic';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import { SIMULATED_LOTS } from '@/data/simulated';

// leaflet touches window, so it can't render on the server
const ParkingMap = dynamic(() => import('@/components/map/ParkingMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-surface-tertiary">
      <p className="text-sm text-ink-tertiary">Loading map…</p>
    </div>
  ),
});

export default function MapPage() {
  return (
    <AppShell>
      <Header title="Campus Map" />
      <div className="h-[calc(100vh-3.5rem-5rem)]">
        <ParkingMap lots={SIMULATED_LOTS} />
      </div>
    </AppShell>
  );
}
