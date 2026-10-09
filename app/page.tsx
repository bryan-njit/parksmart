'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import LotCard from '@/components/lots/LotCard';
import PollIndicator from '@/components/lots/PollIndicator';
import { SIMULATED_LOTS } from '@/data/simulated';
import { useParkingData } from '@/hooks/useParkingData';
import { BUILDINGS, CAMPUS_CENTER, Point, distanceMeters, walkMinutes } from '@/lib/buildings';
import { Lot } from '@/types';
import { LocateFixed } from 'lucide-react';

const SAVED_BUILDING_KEY = 'parksmart-building';

// about a mile. further than this and "closest to you" isn't useful
const MAX_DISTANCE_FROM_CAMPUS = 1600;

function hasSpots(lot: Lot) {
  return lot.status !== 'unknown' && lot.status !== 'full';
}

function chipClass(selected: boolean) {
  return `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
    selected ? 'bg-njit-red text-white' : 'bg-surface-tertiary text-ink-secondary'
  }`;
}

export default function DashboardPage() {
  const { lots, lastUpdated } = useParkingData(SIMULATED_LOTS);

  // a building id, 'me' for the user's location, or null for no destination
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [myLocation, setMyLocation] = useState<Point | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // bring back the building picked last time (localStorage only exists in the browser)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_BUILDING_KEY);
      if (saved && BUILDINGS.some((b) => b.id === saved)) setDestinationId(saved);
    } catch {
      // storage blocked, just start with nothing picked
    }
  }, []);

  function pickBuilding(id: string) {
    const next = destinationId === id ? null : id; // tapping it again clears it
    setDestinationId(next);
    setLocationError(null);
    try {
      if (next) localStorage.setItem(SAVED_BUILDING_KEY, next);
      else localStorage.removeItem(SAVED_BUILDING_KEY);
    } catch {}
  }

  function locateMe() {
    if (destinationId === 'me') {
      setDestinationId(null);
      return;
    }
    if (!navigator.geolocation) {
      setLocationError("This browser can't share your location. Pick a building instead.");
      return;
    }

    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        if (distanceMeters(here, CAMPUS_CENTER) > MAX_DISTANCE_FROM_CAMPUS) {
          setLocationError("You're not near campus right now. Pick a building instead.");
          return;
        }
        setMyLocation(here);
        setDestinationId('me');
      },
      () => {
        setLocating(false);
        setLocationError('Location is turned off. Pick a building instead.');
      },
      { timeout: 10000 }
    );
  }

  const building = BUILDINGS.find((b) => b.id === destinationId);
  const destination = destinationId === 'me' ? myLocation : building ?? null;

  const walkTo = (lot: Lot) => (destination ? walkMinutes(destination, lot) : undefined);

  // with a destination, closest lots come first
  const sortedLots = destination
    ? [...lots].sort((a, b) => (walkTo(a) ?? 0) - (walkTo(b) ?? 0))
    : lots;

  // only suggest general lots, since reserved and faculty lots aren't open to everyone
  const lotsWithSpots = sortedLots.filter(hasSpots);
  const generalLots = lotsWithSpots.filter((lot) => lot.type === 'general');

  // closest general lot with spots, or the one with the most spots if no destination
  const bestLot = destination
    ? generalLots[0]
    : [...generalLots].sort((a, b) => (b.available ?? 0) - (a.available ?? 0))[0];

  let bestLabel = 'Recommended';
  if (destinationId === 'me') bestLabel = 'Closest to you';
  else if (building) bestLabel = `Closest to ${building.name}`;

  return (
    <AppShell>
      <Header title="ParkSmart" brand showAbout />

      <div className="space-y-6 px-4 pb-2 pt-5">
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            Where are you headed?
          </h2>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            <button
              onClick={locateMe}
              aria-pressed={destinationId === 'me'}
              className={chipClass(destinationId === 'me')}
            >
              <LocateFixed size={14} />
              {locating ? 'Finding you…' : 'My location'}
            </button>
            {BUILDINGS.map((b) => (
              <button
                key={b.id}
                onClick={() => pickBuilding(b.id)}
                aria-pressed={destinationId === b.id}
                className={chipClass(destinationId === b.id)}
              >
                {b.name}
              </button>
            ))}
          </div>
          {locationError && <p className="mt-2 text-xs text-status-filling">{locationError}</p>}
        </section>

        {bestLot && (
          <LotCard lot={bestLot} size="lg" label={bestLabel} walkMinutes={walkTo(bestLot)} />
        )}

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
              {destination ? 'All lots · closest first' : 'All Lots'}
            </h2>
            <span className="text-xs text-ink-tertiary">
              {lotsWithSpots.length} of {lots.length} with spots
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sortedLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} walkMinutes={walkTo(lot)} />
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-center pb-2">
        <PollIndicator lastUpdated={lastUpdated} />
      </div>
    </AppShell>
  );
}
