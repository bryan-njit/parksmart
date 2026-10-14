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

  // grey normally, yellow after 2 minutes, red after 5
  let colorClass = 'text-ink-tertiary';
  if (minutes >= 5) colorClass = 'text-status-full';
  else if (isStale) colorClass = 'text-status-filling';

  let label = `Updated ${seconds} sec ago`;
  if (minutes >= 1) label = `Updated ${minutes} min ago`;
  if (isStale) label += ' — data may be outdated';

  const Icon = isStale ? AlertTriangle : RefreshCw;

  return (
    <div className={`flex items-center gap-1.5 px-4 py-2 ${colorClass}`}>
      <Icon size={12} />
      <span className="text-xs">{label}</span>
    </div>
  );
}
