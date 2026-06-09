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

      <div className="px-4 pt-4 space-y-6">
        {/* Permit selector */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-3"
            style={{ color: 'var(--text-tertiary)' }}
          >
            My Permit
          </p>
          <div className="flex flex-wrap gap-2">
            {PERMITS.map((p) => (
              <button
                key={p}
                onClick={() => setPermit(p)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  background: permit === p ? 'var(--njit-red)' : 'var(--surface-tertiary)',
                  color: permit === p ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div
          className="border-t"
          style={{ borderColor: 'var(--border-default)' }}
        />

        {/* Data info */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-3"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Data
          </p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Polling interval
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Every 30s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Data source
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                NJIT Facilities
              </span>
            </div>
          </div>
        </div>

        <div
          className="border-t"
          style={{ borderColor: 'var(--border-default)' }}
        />

        {/* About */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-3"
            style={{ color: 'var(--text-tertiary)' }}
          >
            About
          </p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Version</span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Built by</span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>bryan-njit</span>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--text-tertiary)' }}>
            Not an official NJIT application. Data sourced from NJIT Facilities APIs.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
