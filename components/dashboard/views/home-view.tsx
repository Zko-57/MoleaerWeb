'use client';

import { DashboardPageShell } from '@/components/dashboard/dashboard-page-shell';
import { DashboardKpiCards } from '@/components/dashboard/kpi-cards';
import { TelemetryChart } from '@/components/dashboard/telemetry-chart';
import { EquipmentList } from '@/components/dashboard/equipment-list';

export function DashboardHomeView() {
  return (
    <DashboardPageShell
      pageKey="home"
      eyebrow="Telemetría en vivo"
      title="Instalación: Planta de Tratamiento Sur"
      subtitle={
        <>
          4 generadores activos · Última sincronización{' '}
          <span className="tabular-nums text-zinc-400">hace 12 s</span>
        </>
      }
    >
      <DashboardKpiCards />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-stretch">
        <TelemetryChart />
        <EquipmentList compact />
      </div>
    </DashboardPageShell>
  );
}
