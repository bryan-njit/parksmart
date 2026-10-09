import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';

export default function SettingsPage() {
  return (
    <AppShell>
      <Header title="Settings" showBack />

      <div className="space-y-1 px-4 pt-4">
        <div className="flex justify-between">
          <span className="text-sm text-ink-secondary">Data source</span>
          <span className="text-sm font-medium text-ink">Simulated demo data</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-ink-secondary">Version</span>
          <span className="text-sm font-medium text-ink">0.1.0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-ink-secondary">Built by</span>
          <span className="text-sm font-medium text-ink">bryan-njit</span>
        </div>
        <p className="pt-4 text-xs text-ink-tertiary">
          Not an official NJIT app. Demo data only — parking numbers are simulated.
        </p>
      </div>
    </AppShell>
  );
}
