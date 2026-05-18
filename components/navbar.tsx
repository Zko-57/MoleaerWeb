'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';
import { m, useReducedMotion } from 'framer-motion';
import { useMounted } from '@/hooks/use-mounted';
import { scrollToHash } from '@/lib/scroll-to-hash';

const navCtaClass =
  'inline-flex origin-center items-center justify-center rounded-full text-sm font-semibold transition-[transform,background-color,box-shadow,filter] duration-300 ease-soft hover:scale-105 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100';

const NAV = [
  { href: '#tecnologia', label: 'Tecnología' },
  { href: '#nanoburbujas', label: 'Nanoburbujas' },
  { href: '#impacto', label: 'Impacto' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#faq', label: 'FAQ' },
] as const;

const NavbarNavLink = memo(function NavbarNavLink({
  href,
  label,
  isActive,
  isShrunk,
  onActivate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  isShrunk: boolean;
  onActivate: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onActivate(e, href)}
      className={`nav-link group relative inline-block origin-center font-medium text-white/85 transition-[padding,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        isShrunk ? 'px-2 py-2 text-base' : 'px-2.5 py-2 text-[1rem]'
      }`}
    >
      <span
        className={`relative z-[1] block transition-[transform,text-shadow,color] duration-300 ease-soft will-change-transform group-hover:scale-110 group-hover:text-white group-hover:[text-shadow:0_0_18px_rgba(96,224,255,0.45)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:[text-shadow:none] ${
          isActive
            ? 'scale-110 text-white [text-shadow:0_0_18px_rgba(96,224,255,0.45)] motion-reduce:scale-100 motion-reduce:[text-shadow:none]'
            : ''
        }`}
      >
        {label}
      </span>
      <span
        aria-hidden
        className={`absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 origin-center rounded-full bg-gradient-to-r from-transparent via-cyan-light to-transparent shadow-[0_0_10px_rgba(0,224,255,0.55)] transition-[transform,opacity] duration-300 ease-soft ${
          isActive
            ? 'scale-x-100 opacity-100'
            : 'scale-x-0 opacity-0 group-hover:scale-x-[0.55] group-hover:opacity-70'
        }`}
      />
    </Link>
  );
});

export function Navbar() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const reduceMotion = useReducedMotion();
  const suppressActiveUntil = useRef(0);

  /** Un solo listener + rAF: menos trabajo por evento de scroll y setState solo si cambia el umbral. */
  useEffect(() => {
    let rafId = 0;
    let prevScrolled: boolean | null = null;
    const tick = () => {
      rafId = 0;
      const y = window.scrollY;
      const nextScrolled = y > 48;
      if (nextScrolled !== prevScrolled) {
        prevScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (performance.now() >= suppressActiveUntil.current && y < 120) {
        setActive((a) => (a ? '' : a));
      }
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const hash = window.location.hash;
    if (hash && NAV.some((n) => n.href === hash)) {
      setActive(hash);
      requestAnimationFrame(() => scrollToHash(hash, false));
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (performance.now() < suppressActiveUntil.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id;
        const next = `#${id}`;
        setActive((prev) => (prev === next ? prev : next));
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: [0, 0.12, 0.35] },
    );
    els.forEach((el) => obs.observe(el));

    return () => {
      obs.disconnect();
    };
  }, []);

  const onNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      suppressActiveUntil.current = performance.now() + 2000;
      setOpen(false);
      setActive(href === '#top' ? '' : href);
      scrollToHash(href, !reduceMotion);
    },
    [reduceMotion],
  );

  const headerAnimate = useMemo(
    () => ({
      backgroundColor: mounted && scrolled ? 'rgba(5, 24, 54, 0.72)' : 'rgba(5, 24, 54, 0.35)',
    }),
    [mounted, scrolled],
  );

  /** Barra alta en el hero; al hacer scroll vuelve al tamaño “clásico” más bajo. */
  const isShrunk = mounted && scrolled;

  return (
    <m.header
      initial={false}
      animate={headerAnimate}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`glass fixed left-1/2 z-[1000] flex -translate-x-1/2 flex-col rounded-full transition-[height,max-width,width,top,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        isShrunk
          ? 'top-3 h-16 w-[calc(100%-1.5rem)] max-w-[1200px] px-2 sm:top-4 sm:w-[calc(100%-2rem)]'
          : 'top-4 h-[4.75rem] w-[calc(100%-1.25rem)] max-w-[1320px] px-3 sm:top-5 sm:w-[calc(100%-2rem)]'
      }`}
    >
      <div
        className={`flex h-full w-full items-center justify-between transition-[gap,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isShrunk ? 'gap-3 px-3 sm:gap-4 sm:px-5' : 'gap-3.5 px-3.5 pl-4.5 sm:gap-4 sm:px-6'
        }`}
      >
        <Link
          href="#top"
          className="nav-logo shrink-0"
          aria-label="Moleaer — Inicio"
          onClick={(e) => onNavClick(e, '#top')}
        >
          <BrandLogo variant="nav" compact={isShrunk} priority alt="Moleaer" />
        </Link>

        <nav
          className={`js-nav-main absolute left-0 right-0 top-[calc(100%+0.5rem)] mx-2 hidden flex-col gap-3 rounded-2xl border border-white/10 bg-deep/95 p-5 backdrop-blur-md sm:static sm:mx-0 sm:mt-0 sm:flex sm:flex-row sm:items-center sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none ${
            isShrunk ? 'sm:gap-6' : 'sm:gap-7'
          } ${open ? '!flex' : ''}`}
        >
          {NAV.map(({ href, label }) => (
            <NavbarNavLink
              key={href}
              href={href}
              label={label}
              isActive={active === href}
              isShrunk={isShrunk}
              onActivate={onNavClick}
            />
          ))}
        </nav>

        <div
          className={`flex items-center transition-[gap] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            isShrunk ? 'gap-2 sm:gap-2.5' : 'gap-2 sm:gap-3'
          }`}
        >
          <Link
            href="#"
            className={`${navCtaClass} hidden border border-white/18 text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] sm:inline-flex ${
              isShrunk ? 'px-4 py-2' : 'px-5 py-2.5'
            }`}
          >
            Iniciar Sesión
          </Link>
          <Link
            href="#contacto"
            onClick={(e) => onNavClick(e, '#contacto')}
            className={`${navCtaClass} bg-gradient-to-b from-cyan-light to-[#0077b6] text-white shadow-[0_6px_22px_rgba(0,180,216,0.38)] hover:shadow-[0_8px_26px_rgba(0,180,216,0.45)] sm:hidden ${
              isShrunk ? 'px-3 py-1.5 text-xs' : 'px-3 py-1.5 text-sm'
            }`}
          >
            Experto
          </Link>
          <Link
            href="#contacto"
            onClick={(e) => onNavClick(e, '#contacto')}
            className={`${navCtaClass} hidden bg-gradient-to-b from-cyan-light to-[#0077b6] text-white shadow-[0_6px_22px_rgba(0,180,216,0.38)] hover:shadow-[0_8px_26px_rgba(0,180,216,0.45)] sm:inline-flex ${
              isShrunk ? 'px-4 py-2' : 'px-5 py-2.5'
            }`}
          >
            Hablar con un Experto
          </Link>
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
