'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 36]);
  const visualY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -24]);
  const visualScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.02]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto flex max-w-[1320px] flex-col gap-12 px-5 pb-[var(--section-y)] pt-28 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:pt-32"
    >
      <m.div className="flex-1 space-y-8" style={{ y: contentY }}>
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-light shadow-[0_0_8px_rgba(0,224,255,0.85)]" />
            Nueva Generación de Tratamiento de Agua
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
            El Futuro del Agua,
            <br />
            <span className="text-gradient">A Escala Nano.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
            Fusionamos ciencia, ingeniería y datos para transformar el agua con nanoburbujas. Restauramos ecosistemas,
            revolucionamos la agricultura y optimizamos la industria — sin químicos añadidos.
          </p>
        </Reveal>
        <RevealStaggerRow
          items={[
            <Link
              key="a"
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-cyan-light to-[#0077b6] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_26px_rgba(0,180,216,0.38)] transition-[transform,box-shadow] duration-300 ease-out hover:translate-y-[-2px] hover:shadow-[0_12px_32px_rgba(0,180,216,0.48)]"
            >
              Descubrir la Tecnología
            </Link>,
            <Link
              key="b"
              href="#nanoburbujas"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white/90 transition-[transform,background-color] duration-300 ease-out hover:bg-white/[0.08]"
            >
              <span className="text-cyan-light" aria-hidden>
                ▶
              </span>{' '}
              Ver el Impacto
            </Link>,
          ]}
        />
        <Reveal delay={0.22}>
          <div className="space-y-3 pt-2">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Confiado por líderes globales en</p>
            <p className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-zinc-400">
              <span>Acuicultura</span>
              <span className="text-zinc-600">·</span>
              <span>Agricultura</span>
              <span className="text-zinc-600">·</span>
              <span>Tratamiento de Aguas</span>
              <span className="text-zinc-600">·</span>
              <span>Alimentos & Bebidas</span>
            </p>
          </div>
        </Reveal>
      </m.div>

      <m.div
        className="relative flex flex-1 flex-col items-center justify-center gap-6 lg:max-w-[min(520px,46vw)]"
        style={{ y: visualY, scale: visualScale }}
      >
        <Reveal delay={0.12} className="relative w-full max-w-md lg:max-w-none">
          <div className="glass relative aspect-square overflow-hidden rounded-[2rem] p-2 sm:rounded-[2.25rem]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
              <Image
                src="/images/frutiger_tech.jpg"
                alt="Esfera de agua con nanoburbujas y circuito tecnológico"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 46vw"
                priority
              />
            </div>
            <div
              className="pointer-events-none absolute inset-[10%] rounded-full border border-cyan-light/25"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-[6%] rounded-full border border-white/10"
              aria-hidden
            />
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="glass flex w-full max-w-sm items-stretch gap-0 overflow-hidden rounded-2xl sm:max-w-md">
            <div className="flex flex-1 flex-col justify-center gap-1 px-5 py-4">
              <span className="font-display text-2xl font-bold tracking-tight text-white">2500×</span>
              <span className="text-xs leading-snug text-zinc-500">Más pequeñas que un grano de sal</span>
            </div>
            <div className="w-px shrink-0 bg-white/10" aria-hidden />
            <div className="flex flex-1 flex-col justify-center gap-1 px-5 py-4">
              <span className="font-display text-2xl font-bold tracking-tight text-cyan-light">&gt;85%</span>
              <span className="text-xs leading-snug text-zinc-500">Transferencia de gas</span>
            </div>
          </div>
        </Reveal>
      </m.div>
    </section>
  );
}

function RevealStaggerRow({ items }: { items: ReactNode[] }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className="flex flex-wrap gap-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: reduce ? {} : { staggerChildren: 0.07, delayChildren: 0.14 },
        },
      }}
    >
      {items.map((child, i) => (
        <m.div
          key={i}
          variants={{
            hidden: reduce ? {} : { opacity: 0, y: 16 },
            show: reduce ? {} : { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </m.div>
      ))}
    </m.div>
  );
}
