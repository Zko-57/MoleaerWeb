'use client';

import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { DashboardPageShell } from '@/components/dashboard/dashboard-page-shell';
import { DASHBOARD_ALERTS, type AlertSeverity } from '@/lib/dashboard-mock';

const TABS: { id: 'all' | AlertSeverity; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'critical', label: 'Críticas' },
  { id: 'warning', label: 'Advertencias' },
  { id: 'info', label: 'Info' },
];

const SEVERITY: Record<
  AlertSeverity,
  { label: string; border: string; icon: string }
> = {
  critical: {
    label: 'Crítica',
    border: 'border-red-500/30 bg-red-950/20',
    icon: 'text-red-400',
  },
  warning: {
    label: 'Advertencia',
    border: 'border-amber-500/30 bg-amber-950/15',
    icon: 'text-amber-300',
  },
  info: {
    label: 'Info',
    border: 'border-cyan/25 bg-cyan/5',
    icon: 'text-cyan-light',
  },
};

export function DashboardAlertsView() {
  const [tab, setTab] = useState<'all' | AlertSeverity>('all');
  const [acked, setAcked] = useState<Set<string>>(
    () => new Set(DASHBOARD_ALERTS.filter((a) => a.acknowledged).map((a) => a.id)),
  );

  const alerts = useMemo(() => {
    return DASHBOARD_ALERTS.filter((a) => tab === 'all' || a.severity === tab);
  }, [tab]);

  const pending = DASHBOARD_ALERTS.filter((a) => !acked.has(a.id)).length;

  return (
    <DashboardPageShell
      pageKey="alerts"
      eyebrow="Centro de alertas"
      title="Eventos y notificaciones"
      subtitle={`${pending} pendientes de revisión · ${DASHBOARD_ALERTS.length} eventos en las últimas 24 h`}
    >
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              tab === t.id
                ? 'border-cyan/40 bg-cyan/15 text-cyan-light'
                : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {alerts.map((alert, i) => {
          const sev = SEVERITY[alert.severity];
          const isAcked = acked.has(alert.id);
          return (
            <m.li
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className={`dashboard-glass rounded-2xl border p-5 ${sev.border} ${isAcked ? 'opacity-60' : ''}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[0.65rem] font-bold uppercase tracking-wider ${sev.icon}`}>
                      {sev.label}
                    </span>
                    <span className="text-xs text-zinc-600">·</span>
                    <span className="text-xs text-zinc-500">{alert.time}</span>
                    {isAcked ? (
                      <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[0.65rem] text-zinc-500">
                        Revisada
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold text-white">{alert.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{alert.detail}</p>
                  <p className="mt-2 text-xs text-zinc-500">{alert.device}</p>
                </div>
                {!isAcked ? (
                  <button
                    type="button"
                    onClick={() => setAcked((prev) => new Set(prev).add(alert.id))}
                    className="shrink-0 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-cyan/30 hover:bg-cyan/10 hover:text-cyan-light"
                  >
                    Marcar como revisada
                  </button>
                ) : null}
              </div>
            </m.li>
          );
        })}
      </ul>
    </DashboardPageShell>
  );
}
