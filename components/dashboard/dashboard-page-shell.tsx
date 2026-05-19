'use client';

import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { DashboardTopbar } from '@/components/dashboard/topbar';

type Props = {
  pageKey: string;
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
};

export function DashboardPageShell({ pageKey, eyebrow, title, subtitle, children }: Props) {
  return (
    <>
      <DashboardTopbar eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <m.main
        key={pageKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6">{children}</div>
      </m.main>
    </>
  );
}
