'use client';

import { memo, useEffect, useRef, useState } from 'react';

/**
 * Reprocesa el PNG oficial como en _legacy/main.js:
 * fondo blanco/claro → transparente, texto navy → cyan, esfera más viva.
 * Dibuja a resolución mayor (devicePixelRatio) para Retina: el PNG 235×67 no basta en pantallas 2x.
 */
function processBrandLogo(img: HTMLImageElement) {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return;

  /** Cap 2×: encima el coste de getImageData crece ~DPR² con poca ganancia visual en logo pequeño. */
  const dpr =
    typeof window !== 'undefined' ? Math.min(2, Math.max(1, window.devicePixelRatio || 1)) : 1;
  const tw = Math.max(1, Math.round(w * dpr));
  const th = Math.max(1, Math.round(h * dpr));

  const canvas = document.createElement('canvas');
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  try {
    ctx.drawImage(img, 0, 0, tw, th);
    const data = ctx.getImageData(0, 0, tw, th);
    const px = data.data;

    for (let i = 0; i < px.length; i += 4) {
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      const lum = r * 0.299 + g * 0.587 + b * 0.114;

      if (lum > 240 && Math.abs(r - g) < 12 && Math.abs(g - b) < 12) {
        px[i + 3] = 0;
        continue;
      }
      if (lum > 215 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18) {
        px[i + 3] = Math.max(0, 255 - Math.round((lum - 215) * 9));
      }

      if (lum < 110 && b >= r) {
        const t = 1 - lum / 110;
        px[i] = Math.round(170 + 70 * t);
        px[i + 1] = Math.round(225 + 30 * t);
        px[i + 2] = 255;
      } else if (b > r + 10 && b > 90) {
        px[i] = Math.round(r * 0.55);
        px[i + 1] = Math.min(255, Math.round(g * 1.18 + 20));
        px[i + 2] = Math.min(255, Math.round(b * 1.06 + 10));
      }
    }

    ctx.putImageData(data, 0, 0);
    img.src = canvas.toDataURL('image/png');
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Logo processing fallback:', e);
    }
  }
}

type Props = {
  variant: 'nav' | 'footer';
  /** Navbar: ancho como en legacy al hacer scroll */
  compact?: boolean;
  className?: string;
  alt?: string;
  priority?: boolean;
};

function BrandLogoInner({ variant, compact = false, className = '', alt = 'Moleaer', priority }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    const go = () => {
      try {
        processBrandLogo(img);
      } finally {
        setReady(true);
      }
    };

    const schedule = (fn: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(fn, { timeout: 2400 });
      } else {
        setTimeout(fn, 48);
      }
    };

    if (img.complete && img.naturalWidth) {
      schedule(go);
    } else {
      const onLoad = () => schedule(go);
      img.addEventListener('load', onLoad, { once: true });
      img.addEventListener('error', () => setReady(true), { once: true });
    }
  }, []);

  const base =
    variant === 'footer'
      ? 'brand-logo brand-logo-footer'
      : `brand-logo brand-logo-nav ${compact ? 'brand-logo-nav--compact' : ''}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- canvas reprocesa píxeles; requiere <img> mutable
    <img
      ref={ref}
      src="/images/moleaer-logo.png"
      alt={alt}
      width={235}
      height={67}
      className={`${base} ${ready ? 'ready' : ''} ${className}`.trim()}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
    />
  );
}

export const BrandLogo = memo(BrandLogoInner);
