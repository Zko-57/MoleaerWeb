'use client';

import { m, useReducedMotion } from 'framer-motion';
import { Children, useMemo, type ReactNode } from 'react';
import { useMounted } from '@/hooks/use-mounted';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = '', delay = 0, y = 28 }: Props) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  const transition = useMemo(
    () => ({
      duration: 0.55,
      delay,
      ease: REVEAL_EASE,
    }),
    [delay],
  );

  if (!animate) {
    return <m.div className={className}>{children}</m.div>;
  }

  return (
    <m.div
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-80px', amount: 0.15 }}
      transition={transition}
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
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  const items = Children.toArray(children);

  const parentVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: stagger, delayChildren: 0.05 },
      },
    }),
    [stagger],
  );

  const childTransition = useMemo(
    () => ({
      duration: 0.5,
      ease: REVEAL_EASE,
    }),
    [],
  );

  if (!animate) {
    return <m.div className={className}>{children}</m.div>;
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px', amount: 0.12 }}
      variants={parentVariants}
    >
      {items.map((child, i) => (
        <m.div
          key={i}
          variants={{
            hidden: { y: 22 },
            show: { y: 0 },
          }}
          transition={childTransition}
        >
          {child}
        </m.div>
      ))}
    </m.div>
  );
}
