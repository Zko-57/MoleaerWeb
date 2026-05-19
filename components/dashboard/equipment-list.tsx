'use client';

import { m } from 'framer-motion';
import { ACTIVE_GENERATORS } from '@/lib/dashboard-mock';

const item = {
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0 },
};

export function EquipmentList({ compact = false }: { compact?: boolean }) {
  return (
    <m.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.32 } },
      }}
      className="dashboard-glass flex h-full flex-col rounded-2xl border border-white/10 p-5 sm:p-6"
      aria-labelledby="equipment-list-title"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 id="equipment-list-title" className="font-display text-lg font-bold text-white">
            Generadores activos
          </h2>
          <p className="mt-1 text-sm text-zinc-500">Estado en tiempo real</p>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-300">
          {ACTIVE_GENERATORS.length} online
        </span>
      </div>

      <ul className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {ACTIVE_GENERATORS.map((gen) => (
          <m.li
            key={gen.id}
            variants={item}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-cyan/20 hover:bg-white/[0.05]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display font-semibold text-white">
                  {gen.name}
                  <span className="ml-2 text-sm font-normal text-zinc-500">· {gen.zone}</span>
                </p>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <dt className="text-zinc-600">Caudal</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-zinc-300">{gen.flow}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-600">DO</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-emerald-300">{gen.doLevel}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-600">Uptime</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-zinc-300">{gen.uptime}</dd>
                  </div>
                </dl>
              </div>
              <span className="relative mt-1 flex h-3 w-3 shrink-0" title="En línea">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </span>
            </div>
          </m.li>
        ))}
      </ul>

      {!compact ? (
        <p className="mt-4 border-t border-white/[0.08] pt-4 text-center text-xs text-zinc-600">
          Sin alertas críticas en las últimas 24 h
        </p>
      ) : null}
    </m.section>
  );
}
