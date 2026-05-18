'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Props = {
  target: number;
  suffix?: string;
  className?: string;
};

export function AnimatedCounter({ target, suffix = '', className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? target : 0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    if (reduce) {
      setVal(target);
      done.current = true;
      return;
    }
    done.current = true;
    const start = performance.now();
    const dur = 1400;

    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - (1 - t) ** 3;
      setVal(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, reduce]);

  const formatted =
    target >= 1000
      ? Math.floor(val).toLocaleString('es-ES')
      : Number.isInteger(target)
        ? Math.floor(val)
        : val.toFixed(1);

  return (
    <div ref={ref} className={className}>
      {formatted}
      {suffix}
    </div>
  );
}
