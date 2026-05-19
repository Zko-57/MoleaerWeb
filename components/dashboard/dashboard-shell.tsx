'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-app relative flex min-h-screen overflow-hidden bg-[#000a14] text-zinc-100">
      <div className="dashboard-app__grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="dashboard-app__glow pointer-events-none absolute inset-0" aria-hidden />
      <DashboardSidebar />
      <div className="relative z-10 flex min-h-screen min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
