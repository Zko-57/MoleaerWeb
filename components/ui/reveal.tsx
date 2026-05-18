'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMounted } from '@/hooks/use-mounted';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className = '', delay = 0, y = 28 }: Props) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  if (!animate) {
    return <m.div className={className}>{children}</m.div>;
  }

  return (
    <m.div
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-80px', amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  );
}

export function RevealStagger({
  children,
  className = '',
  stagger = 0.07,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  if (!animate) {
    return <m.div className={className}>{children}</m.div>;
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px', amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children.map((child, i) => (
        <m.div
          key={i}
          variants={{
            hidden: { y: 22 },
            show: { y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </m.div>
      ))}
    </m.div>
  );
}
