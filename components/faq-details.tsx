'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

type Props = {
  className?: string;
  /** Solo el primer FAQ suele ir abierto al cargar; sin props raras del DOM. */
  initiallyOpen?: boolean;
  children: ReactNode;
};

/**
 * <details> nativo: en React, `defaultOpen` en <details> no está soportado como en dialog.
 * Objetivo inicial abierto vía ref — sin warning y sin modo controlado.
 */
export function FaqDetails({ className, initiallyOpen, children }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && initiallyOpen) {
      el.open = true;
    }
  }, [initiallyOpen]);

  return (
    <details ref={ref} className={className}>
      {children}
    </details>
  );
}
