'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  {
    href: '/dashboard',
    label: 'Inicio',
    exact: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
      </svg>
    ),
  },
  {
    href: '/dashboard/analytics',
    label: 'Analíticas',
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
        <path d="M4 19V5M10 19V9M16 19v-6M22 19V3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/dashboard/devices',
    label: 'Dispositivos',
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 20h8M12 18v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/dashboard/alerts',
    label: 'Alertas',
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
        <path d="M12 3a5 5 0 0 1 5 5v3l1.5 3H5.5L7 11V8a5 5 0 0 1 5-5Z" />
        <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar relative z-20 flex w-[4.25rem] shrink-0 flex-col border-r border-white/[0.08] bg-[#020f1c]/90 backdrop-blur-xl sm:w-[4.75rem]">
      <div className="flex flex-col items-center gap-1 border-b border-white/[0.08] px-2 py-5">
        <Link
          href="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-xs font-bold text-cyan-light shadow-[0_0_24px_rgba(0,180,216,0.25)]"
          aria-label="Moleaer Nexus"
        >
          M
        </Link>
        <span className="sr-only">Moleaer Nexus</span>
      </div>

      <nav className="flex flex-1 flex-col items-center gap-2 px-2 py-6" aria-label="Navegación del panel">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={`group flex h-11 w-11 items-center justify-center rounded-xl border transition-[background-color,border-color,box-shadow,color] duration-200 ${
                active
                  ? 'border-cyan/40 bg-cyan/15 text-cyan-light shadow-[0_0_20px_rgba(0,224,255,0.2)]'
                  : 'border-transparent text-zinc-500 hover:border-white/10 hover:bg-white/[0.06] hover:text-zinc-200'
              }`}
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <Link
          href="/"
          title="Volver a la Web"
          className="flex h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-cyan/30 hover:bg-cyan/10 hover:text-cyan-light"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
            <path d="M10 19 3 12m0 0 7-7M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">Volver a la Web</span>
        </Link>
      </div>
    </aside>
  );
}
