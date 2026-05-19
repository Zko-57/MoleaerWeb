'use client';

import { m } from 'framer-motion';
import { KPI_SNAPSHOT } from '@/lib/dashboard-mock';

const CARDS = [
  {
    key: 'do',
    label: 'Nivel de Oxígeno Disuelto (DO)',
    value: KPI_SNAPSHOT.dissolvedOxygen.value,
    unit: KPI_SNAPSHOT.dissolvedOxygen.unit,
    delta: KPI_SNAPSHOT.dissolvedOxygen.delta,
    accent: 'emerald' as const,
    pulse: 'bg-emerald-400',
    glow: 'shadow-[0_0_32px_rgba(52,211,153,0.18)]',
    border: 'border-emerald-500/25',
    valueClass: 'text-emerald-300',
  },
  {
    key: 'energy',
    label: 'Ahorro Energético Acumulado',
    value: KPI_SNAPSHOT.energySavings.value,
    unit: KPI_SNAPSHOT.energySavings.unit,
    delta: KPI_SNAPSHOT.energySavings.delta,
    accent: 'cyan' as const,
    pulse: 'bg-cyan-light',
    glow: 'shadow-[0_0_32px_rgba(0,224,255,0.15)]',
    border: 'border-cyan/25',
    valueClass: 'text-cyan-light',
  },
  {
    key: 'flow',
    label: 'Caudal Procesado',
    value: KPI_SNAPSHOT.flowProcessed.value,
    unit: KPI_SNAPSHOT.flowProcessed.unit,
    delta: KPI_SNAPSHOT.flowProcessed.delta,
    accent: 'cyan' as const,
    pulse: 'bg-cyan/60',
    glow: 'shadow-[0_0_24px_rgba(0,180,216,0.12)]',
    border: 'border-white/10',
    valueClass: 'text-white',
  },
  {
    key: 'status',
    label: 'Estado General',
    value: KPI_SNAPSHOT.systemStatus.value,
    unit: '',
    delta: KPI_SNAPSHOT.systemStatus.delta,
    accent: 'emerald' as const,
    pulse: 'bg-emerald-400',
    glow: 'shadow-[0_0_28px_rgba(52,211,153,0.14)]',
    border: 'border-emerald-500/20',
    valueClass: 'text-emerald-300',
    icon: true,
  },
] as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function DashboardKpiCards() {
  return (
    <m.div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
      }}
    >
      {CARDS.map((card) => (
        <m.article
          key={card.key}
          variants={item}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`dashboard-glass relative overflow-hidden rounded-2xl p-5 ${card.glow} ${card.border}`}
        >
          <span
            className={`absolute right-4 top-4 h-2 w-2 rounded-full ${card.pulse} animate-pulse shadow-[0_0_12px_currentColor]`}
            aria-hidden
          />
          <p className="pr-6 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {card.label}
          </p>
          <div className="mt-3 flex items-end gap-1.5">
            {card.key === 'status' ? (
              <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                  <path d="M5 12.5 10 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : null}
            <p className={`font-display text-3xl font-bold tabular-nums tracking-tight ${card.valueClass}`}>
              {card.value}
              {card.unit ? (
                <span className="ml-1 text-lg font-semibold text-zinc-400">{card.unit}</span>
              ) : null}
            </p>
          </div>
          <p className="mt-2 text-xs text-zinc-500">{card.delta}</p>
        </m.article>
      ))}
    </m.div>
  );
}
