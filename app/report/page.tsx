'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import { SIMULATED_LOTS, SIMULATED_REPORTS } from '@/data/simulated';
import { timeAgo } from '@/lib/format';
import { XCircle, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';

const REPORT_TYPES = [
  { key: 'full', label: 'Full', sublabel: 'No spots', icon: XCircle, color: 'text-status-full', ring: 'ring-status-full' },
  { key: 'open', label: 'Open', sublabel: 'Found one', icon: CheckCircle, color: 'text-status-open', ring: 'ring-status-open' },
  { key: 'event', label: 'Event', sublabel: 'Blocked', icon: AlertTriangle, color: 'text-status-filling', ring: 'ring-status-filling' },
  { key: 'other', label: 'Other', sublabel: 'Note…', icon: MessageCircle, color: 'text-ink-secondary', ring: 'ring-ink-secondary' },
] as const;

export default function ReportPage() {
  const [selectedLot, setSelectedLot] = useState(SIMULATED_LOTS[0].slug);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!selectedType) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedType(null);
    }, 3000);
  }

  return (
    <AppShell>
      <Header title="Report" />

      <div className="space-y-5 px-4 pt-4">
        {submitted && (
          <div className="flex items-center gap-2 rounded-xl bg-status-open-bg px-4 py-3 text-green-700">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Thanks! Report visible for 30 min.</span>
          </div>
        )}

        {/* Lot selector */}
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">Select Lot</p>
          <select
            value={selectedLot}
            onChange={(e) => setSelectedLot(e.target.value)}
            className="w-full appearance-none rounded-xl border bg-surface px-3 py-2.5 text-sm font-medium text-ink"
          >
            {SIMULATED_LOTS.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* Report type grid */}
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">What&apos;s the situation?</p>
          <div className="grid grid-cols-2 gap-3">
            {REPORT_TYPES.map(({ key, label, sublabel, icon: Icon, color, ring }) => {
              const active = selectedType === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl border bg-surface py-4 shadow-card transition-all ${
                    active ? `ring-2 ${ring}` : ''
                  }`}
                >
                  <Icon size={20} className={color} />
                  <span className="text-sm font-semibold text-ink">{label}</span>
                  <span className="text-xs text-ink-tertiary">{sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="w-full rounded-xl bg-njit-red py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
        >
          Submit Report
        </button>

        {/* Recent reports */}
        {SIMULATED_REPORTS.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Recent Reports</p>
            <div className="divide-y overflow-hidden rounded-xl border">
              {SIMULATED_REPORTS.map((r) => {
                const msLeft = r.expiresAt - Date.now();
                const minLeft = Math.max(0, Math.round(msLeft / 60000));
                const pct = Math.max(0, Math.min(100, (msLeft / (30 * 60 * 1000)) * 100));
                return (
                  <div key={r.id} className="bg-surface px-4 py-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-medium text-ink">
                        {r.lotName}
                        <span className="ml-2 text-xs font-normal text-ink-tertiary">
                          &quot;{r.type === 'open' ? 'Open spots' : r.type === 'full' ? 'Actually full' : r.type}&quot;
                        </span>
                      </p>
                      <span className="text-xs text-ink-tertiary">{timeAgo(r.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-tertiary">
                        <div
                          className={`h-full rounded-full ${pct > 30 ? 'bg-status-open' : 'bg-status-filling'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="shrink-0 text-xs text-ink-tertiary">{minLeft}m left</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
