'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className = '', delay = 0, y = 28 }: Props) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
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
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px', amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? { staggerChildren: 0 }
            : { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children.map((child, i) => (
        <m.div
          key={i}
          variants={{
            hidden: reduce ? {} : { opacity: 0, y: 22 },
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
