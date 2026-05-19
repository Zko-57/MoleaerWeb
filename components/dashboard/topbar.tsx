'use client';

import type { ReactNode } from 'react';
import { DASHBOARD_USER } from '@/lib/dashboard-mock';

const DATE_RANGES = ['Últimas 24 h', 'Últimos 7 días', 'Últimos 30 días'] as const;

type Props = {
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
};

export function DashboardTopbar({ eyebrow, title, subtitle }: Props) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/[0.08] bg-[#000a14]/60 px-4 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="space-y-1">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cyan-light/80">{eyebrow}</p>
        <h1 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h1>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="dashboard-range">
          Rango de fechas
        </label>
        <select
          id="dashboard-range"
          defaultValue={DATE_RANGES[0]}
          className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-zinc-200 outline-none ring-cyan/40 transition-shadow focus:ring-2"
        >
          {DATE_RANGES.map((r) => (
            <option key={r} value={r} className="bg-[#051836]">
              {r}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{DASHBOARD_USER.name}</p>
            <p className="max-w-[11rem] text-xs leading-snug text-zinc-500 sm:max-w-none">
              {DASHBOARD_USER.department} · {DASHBOARD_USER.role}
            </p>
          </div>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-light to-[#0077b6] text-sm font-bold text-white shadow-[0_0_18px_rgba(0,224,255,0.35)]"
            aria-hidden
          >
            {DASHBOARD_USER.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
