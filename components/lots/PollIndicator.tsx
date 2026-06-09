'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface PollIndicatorProps {
  lastUpdated: number;
}

export default function PollIndicator({ lastUpdated }: PollIndicatorProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  const seconds = Math.floor((Date.now() - lastUpdated) / 1000);
  const minutes = Math.floor(seconds / 60);
  const isStale = minutes >= 2;
  const isVeryStale = minutes >= 5;

  const color = isVeryStale
    ? '#DC2626'
    : isStale
    ? '#CA8A04'
    : 'var(--text-tertiary)';

  const label = seconds < 60
    ? `Updated ${seconds} sec ago`
    : `Updated ${minutes} min ago${isStale ? ' — data may be outdated' : ''}`;

  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      {isStale ? (
        <AlertTriangle size={12} style={{ color }} />
      ) : (
        <RefreshCw size={12} style={{ color }} />
      )}
      <span className="text-xs" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
