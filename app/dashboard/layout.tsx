import type { Metadata, Viewport } from 'next';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export const metadata: Metadata = {
  title: 'Moleaer Nexus | Telemetría IoT',
  description: 'Panel de control y telemetría de generadores de nanoburbujas Moleaer.',
};

export const viewport: Viewport = {
  themeColor: '#000a14',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
