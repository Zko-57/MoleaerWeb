'use client';

import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { DashboardPageShell } from '@/components/dashboard/dashboard-page-shell';
import { FLEET_DEVICES, type DeviceStatus } from '@/lib/dashboard-mock';

const FILTERS: { id: 'all' | DeviceStatus; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'online', label: 'En línea' },
  { id: 'maintenance', label: 'Mantenimiento' },
  { id: 'offline', label: 'Desconectados' },
];

const STATUS_STYLES: Record<DeviceStatus, { label: string; dot: string; badge: string }> = {
  online: {
    label: 'En línea',
    dot: 'bg-emerald-400',
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  },
  maintenance: {
    label: 'Mantenimiento',
    dot: 'bg-amber-400',
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  },
  offline: {
    label: 'Desconectado',
    dot: 'bg-zinc-500',
    badge: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400',
  },
};

export function DashboardDevicesView() {
  const [filter, setFilter] = useState<'all' | DeviceStatus>('all');
  const [query, setQuery] = useState('');

  const devices = useMemo(() => {
    return FLEET_DEVICES.filter((d) => {
      if (filter !== 'all' && d.status !== filter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.zone.toLowerCase().includes(q) ||
        d.serial.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <DashboardPageShell
      pageKey="devices"
      eyebrow="Parque de generadores"
      title="Dispositivos e inventario"
      subtitle={`${FLEET_DEVICES.length} equipos registrados · ${FLEET_DEVICES.filter((d) => d.status === 'online').length} en línea`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.id
                  ? 'border-cyan/40 bg-cyan/15 text-cyan-light'
                  : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Buscar dispositivo</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, zona o serie…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-2.5 pl-4 pr-3 text-sm text-zinc-200 outline-none ring-cyan/40 placeholder:text-zinc-600 focus:ring-2"
          />
        </label>
      </div>

      <m.div
        className="dashboard-glass overflow-hidden rounded-2xl border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-[0.65rem] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-5 py-4">Equipo</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4">Caudal</th>
                <th className="px-5 py-4">DO</th>
                <th className="px-5 py-4">Potencia</th>
                <th className="px-5 py-4">Firmware</th>
                <th className="px-5 py-4">Último servicio</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => {
                const st = STATUS_STYLES[d.status];
                return (
                  <tr
                    key={d.id}
                    className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{d.name}</p>
                      <p className="text-xs text-zinc-500">{d.zone}</p>
                      <p className="mt-0.5 font-mono text-[0.65rem] text-zinc-600">{d.serial}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${st.badge}`}
                      >
                        {d.status === 'online' ? (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                            <span className={`relative h-2 w-2 rounded-full ${st.dot}`} />
                          </span>
                        ) : (
                          <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                        )}
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 tabular-nums text-zinc-300">{d.flow}</td>
                    <td className="px-5 py-4 tabular-nums text-emerald-300/90">{d.doLevel}</td>
                    <td className="px-5 py-4 tabular-nums text-zinc-300">{d.powerDraw}</td>
                    <td className="px-5 py-4 text-zinc-400">{d.firmware}</td>
                    <td className="px-5 py-4 text-zinc-400">{d.lastService}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {devices.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-zinc-500">No hay equipos con ese criterio.</p>
        ) : null}
      </m.div>
    </DashboardPageShell>
  );
}
