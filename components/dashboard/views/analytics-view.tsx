'use client';

import { m } from 'framer-motion';
import { DashboardPageShell } from '@/components/dashboard/dashboard-page-shell';
import { TelemetryChart } from '@/components/dashboard/telemetry-chart';
import { ANALYTICS_SUMMARY, ZONE_PERFORMANCE } from '@/lib/dashboard-mock';

const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export function DashboardAnalyticsView() {
  return (
    <DashboardPageShell
      pageKey="analytics"
      eyebrow="Analíticas avanzadas"
      title="Rendimiento operativo"
      subtitle="Comparativas por zona, tendencias y eficiencia energética · datos de demostración"
    >
      <m.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {ANALYTICS_SUMMARY.map((s) => (
          <m.article
            key={s.label}
            variants={item}
            className="dashboard-glass rounded-2xl border border-white/10 p-5"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-zinc-500">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="mt-1 text-xs text-cyan-light">{s.trend} vs periodo anterior</p>
          </m.article>
        ))}
      </m.div>

      <TelemetryChart />

      <section className="dashboard-glass rounded-2xl border border-white/10 p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold text-white">Ahorro energético por zona</h2>
        <p className="mt-1 text-sm text-zinc-500">DO medio y % de reducción vs línea base aeróbica</p>
        <ul className="mt-6 space-y-4">
          {ZONE_PERFORMANCE.map((z) => (
            <li key={z.zone}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-zinc-300">{z.zone}</span>
                <span className="tabular-nums text-zinc-500">
                  DO {z.doAvg} mg/L · <span className="text-cyan-light">{z.savings}%</span>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan/80 to-emerald-400/90"
                  style={{ width: `${z.savings}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </DashboardPageShell>
  );
}
