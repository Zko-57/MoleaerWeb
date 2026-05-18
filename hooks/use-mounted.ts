'use client';

import { useEffect, useState } from 'react';

/** true solo tras el primer paint en el cliente (evita hydration mismatch con APIs del navegador). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
