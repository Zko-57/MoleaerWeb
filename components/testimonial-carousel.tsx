'use client';

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { useMounted } from '@/hooks/use-mounted';

const QUOTES = [
  {
    text: 'El uso de nanoburbujas de oxígeno en cultivos de invernadero ha mejorado la producción en el cultivo de pepino bajo estrés por altas temperaturas. La rentabilidad y eficiencia del agua mejoraron drásticamente.',
    name: 'Pablo García Raya',
    role: 'Ingeniero Agrónomo · BioSabor, España',
  },
  {
    text: 'Después de solo 3 meses el agua estaba cristalina. Ahora podemos cosechar todo, en lugar del 30% que cosechábamos en verano. La calidad es mejor y los clientes están contentos.',
    name: 'Richard Smits',
    role: 'Manager · De Kruidenaer, Países Bajos',
  },
  {
    text: 'Con Freya instalado en las jaulas de espera, podemos manejar los peces de manera más segura sin comprometer su bienestar, incluso a altas temperaturas del mar en verano.',
    name: 'Thomas Godtliebsen',
    role: 'Gerente · SalMar Innovanor, Noruega',
  },
  {
    text: 'Planeamos aumentar la producción en más de 20 millones de libras de queso evitando $10M en mejoras de CAPEX. Recomendamos Moleaer a otros fabricantes de queso sin reservas.',
    name: 'Larry Harris',
    role: 'Maestro Quesero · Meister Cheese, USA',
  },
  {
    text: 'Instalada en febrero, ya está teniendo un impacto positivo en el lago. Al aumentar los niveles de oxígeno, estamos permitiendo que nuestro lago se sane por sí mismo.',
    name: 'Steve Manos',
    role: 'Alcalde · Lake Elsinore, USA',
  },
] as const;

function visibleCount(w: number) {
  if (w < 720) return 1;
  if (w < 1100) return 2;
  return 3;
}

const CARD_GAP = 24;

const CAROUSEL_SPRING = { type: 'spring' as const, stiffness: 280, damping: 34 };

const QuoteCard = memo(function QuoteCard({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <article
      data-card
      className="glass-strong flex w-[calc(100vw-2.5rem)] shrink-0 flex-col gap-4 p-9 sm:w-[calc(50vw-2rem)] lg:w-[calc((100vw-4rem)/3-0.5rem)] lg:max-w-[calc(416px)]"
    >
      <div className="font-display text-2xl leading-none text-cyan-light/80" aria-hidden>
        {'\u201C'}
      </div>
      <p className="text-[0.98rem] leading-relaxed text-zinc-300">{q.text}</p>
      <footer className="mt-auto border-t border-white/10 pt-4 text-sm">
        <strong className="text-white">{q.name}</strong>
        <div className="text-zinc-500">{q.role}</div>
      </footer>
    </article>
  );
});

export function TestimonialCarousel() {
  const mounted = useMounted();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardWidthCache = useRef(0);
  const prevGwRef = useRef<number | null>(null);
  const [i, setI] = useState(0);
  const [gw, setGw] = useState(1200);
  const [translate, setTranslate] = useState(0);

  const v = visibleCount(gw);
  const max = Math.max(0, QUOTES.length - v);
  const idx = Math.min(Math.max(i, 0), max);

  /**
   * Solo fuerza lectura de layout cuando cambia el ancho de ventana (gw) o aún no hay caché.
   * Al cambiar solo el índice del slide se reutiliza el ancho medido → menos forced reflow.
   */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    if (!card) return;

    const gwChanged = prevGwRef.current !== gw;
    prevGwRef.current = gw;

    if (gwChanged || cardWidthCache.current <= 0) {
      cardWidthCache.current = card.getBoundingClientRect().width;
    }
    const w = cardWidthCache.current;
    setTranslate(idx * (w + CARD_GAP));
  }, [idx, gw]);

  useEffect(() => {
    let rafId = 0;
    let lastW = typeof window !== 'undefined' ? window.innerWidth : 0;
    const onResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const w = window.innerWidth;
        if (w !== lastW) {
          lastW = w;
          setGw(w);
        }
      });
    };
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => {
        const m0 = Math.max(0, QUOTES.length - visibleCount(window.innerWidth));
        return p >= m0 ? 0 : p + 1;
      });
    }, 5200);
    return () => clearInterval(t);
  }, []);

  const xAnim = useMemo(() => (mounted ? { x: -translate } : false), [mounted, translate]);

  const onPrev = useCallback(() => {
    setI((p) => (p <= 0 ? max : p - 1));
  }, [max]);

  const onNext = useCallback(() => {
    setI((p) => (p >= max ? 0 : p + 1));
  }, [max]);

  return (
    <div className="relative overflow-hidden py-1">
      <m.div ref={trackRef} className="flex gap-6" animate={xAnim} transition={CAROUSEL_SPRING}>
        {QUOTES.map((q, k) => (
          <QuoteCard key={k} q={q} />
        ))}
      </m.div>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-colors hover:bg-white/10"
          onClick={onPrev}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-colors hover:bg-white/10"
          onClick={onNext}
        >
          ›
        </button>
      </div>
    </div>
  );
}
