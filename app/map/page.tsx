'use client';

import dynamic from 'next/dynamic';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import { useParkingData } from '@/hooks/useParkingData';

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
  const { lots } = useParkingData();

  return (
    <AppShell>
      <Header title="Campus Map" />
      {/* dvh instead of vh so the map doesn't hide under the browser bar on iPhones */}
      <div className="h-[calc(100dvh-3.5rem-5rem-env(safe-area-inset-bottom))]">
        <ParkingMap lots={lots} />
      </div>
    </AppShell>
  );
}
