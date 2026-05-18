'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
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
];

export function Navbar() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const reduceMotion = useReducedMotion();
  const suppressActiveUntil = useRef(0);

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
        setActive(`#${id}`);
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: [0, 0.12, 0.35] },
    );
    els.forEach((el) => obs.observe(el));

    const onScrollTop = () => {
      if (performance.now() < suppressActiveUntil.current) return;
      if (window.scrollY < 120) setActive('');
    };
    window.addEventListener('scroll', onScrollTop, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScrollTop);
    };
  }, []);

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    suppressActiveUntil.current = performance.now() + 2000;
    setOpen(false);
    setActive(href === '#top' ? '' : href);
    scrollToHash(href, !reduceMotion);
  };

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
        <Link
          href="#top"
          className="nav-logo shrink-0"
          aria-label="Moleaer — Inicio"
          onClick={(e) => onNavClick(e, '#top')}
        >
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
              onClick={(e) => onNavClick(e, href)}
              className="nav-link group relative inline-block origin-center px-1.5 py-2 text-[0.92rem] font-medium text-white/85"
            >
              <span
                className={`relative z-[1] block transition-[transform,text-shadow,color] duration-300 ease-soft will-change-transform group-hover:scale-110 group-hover:text-white group-hover:[text-shadow:0_0_18px_rgba(96,224,255,0.45)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:[text-shadow:none] ${
                  active === href
                    ? 'scale-110 text-white [text-shadow:0_0_18px_rgba(96,224,255,0.45)] motion-reduce:scale-100 motion-reduce:[text-shadow:none]'
                    : ''
                }`}
              >
                {label}
              </span>
              <span
                aria-hidden
                className={`absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 origin-center rounded-full bg-gradient-to-r from-transparent via-cyan-light to-transparent shadow-[0_0_10px_rgba(0,224,255,0.55)] transition-[transform,opacity] duration-300 ease-soft ${
                  active === href
                    ? 'scale-x-100 opacity-100'
                    : 'scale-x-0 opacity-0 group-hover:scale-x-[0.55] group-hover:opacity-70'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="#"
            className={`${navCtaClass} hidden border border-white/18 px-4 py-2 text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] sm:inline-flex`}
          >
            Iniciar Sesión
          </Link>
          <Link
            href="#contacto"
            onClick={(e) => onNavClick(e, '#contacto')}
            className={`${navCtaClass} bg-gradient-to-b from-cyan-light to-[#0077b6] px-3 py-1.5 text-xs text-white shadow-[0_6px_22px_rgba(0,180,216,0.38)] hover:shadow-[0_8px_26px_rgba(0,180,216,0.45)] sm:hidden`}
          >
            Experto
          </Link>
          <Link
            href="#contacto"
            onClick={(e) => onNavClick(e, '#contacto')}
            className={`${navCtaClass} hidden bg-gradient-to-b from-cyan-light to-[#0077b6] px-4 py-2 text-white shadow-[0_6px_22px_rgba(0,180,216,0.38)] hover:shadow-[0_8px_26px_rgba(0,180,216,0.45)] sm:inline-flex`}
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
