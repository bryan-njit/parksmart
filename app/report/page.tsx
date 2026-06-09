'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import { SIMULATED_LOTS, SIMULATED_REPORTS } from '@/data/simulated';
import { timeAgo } from '@/lib/format';
import { XCircle, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';

const REPORT_TYPES = [
  { key: 'full', label: 'Full', sublabel: 'No spots', icon: XCircle, color: '#DC2626' },
  { key: 'open', label: 'Open', sublabel: 'Found one', icon: CheckCircle, color: '#16A34A' },
  { key: 'event', label: 'Event', sublabel: 'Blocked', icon: AlertTriangle, color: '#CA8A04' },
  { key: 'other', label: 'Other', sublabel: 'Note…', icon: MessageCircle, color: '#475569' },
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

      <div className="px-4 pt-4 space-y-5">
        {submitted && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: 'var(--status-open-bg)', color: '#15803D' }}
          >
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Thanks! Report visible for 30 min.</span>
          </div>
        )}

        {/* Lot selector */}
        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Select Lot
          </p>
          <select
            value={selectedLot}
            onChange={(e) => setSelectedLot(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border text-sm font-medium appearance-none"
            style={{
              borderColor: 'var(--border-default)',
              background: 'var(--surface-primary)',
              color: 'var(--text-primary)',
            }}
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
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            What&apos;s the situation?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {REPORT_TYPES.map(({ key, label, sublabel, icon: Icon, color }) => {
              const active = selectedType === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border transition-all min-h-[72px]"
                  style={{
                    borderColor: active ? color : 'var(--border-default)',
                    background: active ? '#fff' : 'var(--surface-primary)',
                    boxShadow: active ? `0 0 0 2px ${color}` : 'var(--shadow-sm)',
                  }}
                >
                  <Icon size={20} style={{ color }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {label}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
          style={{
            background: 'var(--njit-red)',
            opacity: selectedType ? 1 : 0.4,
          }}
        >
          Submit Report
        </button>

        {/* Recent reports */}
        {SIMULATED_REPORTS.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Recent Reports
            </p>
            <div
              className="rounded-xl border divide-y overflow-hidden"
              style={{ borderColor: 'var(--border-default)' }}
            >
              {SIMULATED_REPORTS.map((r) => {
                const msLeft = r.expiresAt - Date.now();
                const minLeft = Math.max(0, Math.round(msLeft / 60000));
                const pct = Math.max(0, Math.min(100, (msLeft / (30 * 60 * 1000)) * 100));
                return (
                  <div key={r.id} className="px-4 py-3 bg-white">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {r.lotName}
                        <span
                          className="ml-2 font-normal text-xs"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          &quot;{r.type === 'open' ? 'Open spots' : r.type === 'full' ? 'Actually full' : r.type}&quot;
                        </span>
                      </p>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {timeAgo(r.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex-1 rounded-full overflow-hidden"
                        style={{ height: 4, background: 'var(--surface-tertiary)' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: pct > 30 ? '#16A34A' : '#CA8A04' }}
                        />
                      </div>
                      <span className="text-xs shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                        {minLeft}m left
                      </span>
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
