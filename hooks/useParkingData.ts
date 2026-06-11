'use client';

import { useEffect, useState } from 'react';
import { Lot } from '@/types';
import { getStatus } from '@/lib/status';

const TICK_MS = 30 * 1000;

// nudge occupancy up or down a little, scaled to lot size
function drift(lot: Lot): Lot {
  if (lot.available === null || lot.occupied === null) return lot;

  const maxChange = Math.max(2, Math.round(lot.total * 0.01));
  const delta = Math.round((Math.random() * 2 - 1) * maxChange);
  if (delta === 0) return lot;

  const occupied = Math.min(lot.total, Math.max(0, lot.occupied + delta));
  const available = lot.total - occupied;

  return { ...lot, occupied, available, status: getStatus(available, lot.total) };
}

export function useParkingData(initial: Lot[]) {
  const [lots, setLots] = useState(initial);
  const [lastUpdated, setLastUpdated] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setLots((prev) => prev.map(drift));
      setLastUpdated(Date.now());
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  return { lots, lastUpdated };
}
