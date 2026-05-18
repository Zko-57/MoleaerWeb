'use client';

import { useEffect, useState, useCallback, type MouseEvent } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';
import { m, useReducedMotion } from 'framer-motion';
import { useMounted } from '@/hooks/use-mounted';

const NAV = [
  { href: '#tecnologia', label: 'Tecnología' },
  { href: '#nanoburbujas', label: 'Nanoburbujas' },
  { href: '#impacto', label: 'Impacto' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('#tecnologia');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 48);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    let suppressUntil = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (performance.now() < suppressUntil) return;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          setActive(`#${id}`);
        }
      },
      { rootMargin: '-42% 0px -48% 0px', threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));

    const links = document.querySelectorAll<HTMLAnchorElement>('.js-nav-main a[href^="#"]');
    const cleanups: Array<() => void> = [];
    links.forEach((a) => {
      const handler = () => {
        suppressUntil = performance.now() + 1100;
        const h = a.getAttribute('href');
        if (h) setActive(h);
      };
      a.addEventListener('click', handler);
      cleanups.push(() => a.removeEventListener('click', handler));
    });
    return () => {
      obs.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const barAnimation = reduceMotion ? undefined : { scaleX: 1, opacity: 1 };

  return (
    <m.header
      initial={false}
      animate={{
        backgroundColor: mounted && scrolled ? 'rgba(5, 24, 54, 0.72)' : 'rgba(5, 24, 54, 0.35)',
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass fixed left-1/2 top-4 z-[1000] flex h-[4.25rem] w-[calc(100%-1.5rem)] max-w-[1320px] -translate-x-1/2 flex-col rounded-full px-2 sm:top-5 sm:w-[calc(100%-2.5rem)]"
    >
      <div className="flex h-full w-full items-center justify-between gap-3 px-3 pl-4 sm:px-5">
        <Link href="#top" className="nav-logo shrink-0" aria-label="Moleaer — Inicio">
          <BrandLogo variant="nav" compact={mounted && scrolled} priority alt="Moleaer" />
        </Link>

        <nav
          className={`js-nav-main absolute left-0 right-0 top-[4.5rem] mx-2 hidden flex-col gap-3 rounded-2xl border border-white/10 bg-deep/95 p-5 backdrop-blur-md sm:static sm:mx-0 sm:flex sm:flex-row sm:items-center sm:gap-7 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none ${
            open ? '!flex' : ''
          }`}
        >
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="group relative py-1 text-[0.92rem] font-medium text-white/85 transition-colors hover:text-white"
            >
              {label}
              <m.span
                className="absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 origin-center rounded-full bg-gradient-to-r from-transparent via-cyan-light to-transparent shadow-[0_0_10px_rgba(0,224,255,0.55)]"
                initial={false}
                animate={active === href ? barAnimation : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="#"
            className="hidden rounded-full border border-white/18 px-4 py-2 text-sm font-semibold text-white/90 transition-[transform,background-color] hover:bg-white/10 sm:inline-flex"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="inline-flex rounded-full bg-gradient-to-b from-cyan-light to-[#0077b6] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_6px_22px_rgba(0,180,216,0.38)] sm:hidden"
          >
            Experto
          </Link>
          <MagneticCta href="#contacto" onNavigate={() => setOpen(false)}>
            Hablar con un Experto
          </MagneticCta>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border border-white/15 sm:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-0.5 w-5 bg-white transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
    </m.header>
  );
}

function MagneticCta({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const move = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (reduce) return;
      const r = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
      setOffset({ x, y });
    },
    [reduce],
  );

  const leave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{
        transform: reduce ? undefined : `translate3d(${offset.x}px,${offset.y}px,0)`,
      }}
      className="hidden rounded-full bg-gradient-to-b from-cyan-light to-[#0077b6] px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_22px_rgba(0,180,216,0.38)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,180,216,0.5)] sm:inline-flex"
    >
      {children}
    </Link>
  );
}
