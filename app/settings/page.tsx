'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import { UserPermit } from '@/types';

const PERMITS: UserPermit[] = [
  'Commuter (Red)',
  'Blue',
  'Green',
  'Faculty/Staff',
  'Visitor',
  'No Permit',
];

export default function SettingsPage() {
  const [permit, setPermit] = useState<UserPermit>('Commuter (Red)');

  return (
    <AppShell>
      <Header title="Settings" showBack />

      <div className="space-y-6 px-4 pt-4">
        {/* Permit selector */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            My Permit
          </p>
          <div className="flex flex-wrap gap-2">
            {PERMITS.map((p) => (
              <button
                key={p}
                onClick={() => setPermit(p)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  permit === p
                    ? 'bg-njit-red text-white'
                    : 'bg-surface-tertiary text-ink-secondary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t" />

        {/* Data info */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            Data
          </p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-ink-secondary">Polling interval</span>
              <span className="text-sm font-medium text-ink">Every 30s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-ink-secondary">Data source</span>
              <span className="text-sm font-medium text-ink">NJIT Facilities</span>
            </div>
          </div>
        </div>

        <div className="border-t" />

        {/* About */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            About
          </p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-ink-secondary">Version</span>
              <span className="text-sm font-medium text-ink">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-ink-secondary">Built by</span>
              <span className="text-sm font-medium text-ink">bryan-njit</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-tertiary">
            Not an official NJIT application. Data sourced from NJIT Facilities APIs.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
