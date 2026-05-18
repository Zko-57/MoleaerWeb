'use client';

import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Props = {
  target: number;
  suffix?: string;
  className?: string;
};

function formatCounterValue(target: number, val: number) {
  return target >= 1000
    ? Math.floor(val).toLocaleString('es-ES')
    : Number.isInteger(target)
      ? String(Math.floor(val))
      : val.toFixed(1);
}

/** Evita ~50–80 commits de React durante el easing: el texto se actualiza por rAF en el DOM. */
export function AnimatedCounter({ target, suffix = '', className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const valueEl = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    const el = valueEl.current;
    if (!el) return;

    if (reduce) {
      el.textContent = formatCounterValue(target, target);
      done.current = true;
      return;
    }

    done.current = true;
    const start = performance.now();
    const dur = 1400;

    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - (1 - t) ** 3;
      el.textContent = formatCounterValue(target, target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, reduce]);

  return (
    <div ref={ref} className={className}>
      <span ref={valueEl}>0</span>
      {suffix}
    </div>
  );
}
