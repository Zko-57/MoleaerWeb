'use client';

import { useId, useMemo, type CSSProperties } from 'react';

function rnd(i: number, s: number) {
  const v = Math.sin((i + 1) * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

/** Misma geometría en Node y en el navegador (evita hydration mismatch en SVG) */
function snap(n: number, decimals = 4) {
  const p = 10 ** decimals;
  return Math.round(n * p) / p;
}

type NodePt = { x: number; y: number; r: number; delay: number; dur: number };

/** Cubre todo el panel: núcleo denso + disco completo (sin “agujero” central) + mezcla uniforme */
function compactPosition(i: number): { x: number; y: number } {
  const u = rnd(i, 1);
  const v = rnd(i, 2);
  const t = rnd(i, 7);

  // ~22 %: zona central compacta (llena el hueco del medio)
  if (t < 0.22) {
    const ang = rnd(i, 13) * Math.PI * 2;
    const r = Math.pow(rnd(i, 14), 0.85) * 24;
    return {
      x: 50 + Math.cos(ang) * r * 1.02,
      y: 48 + Math.sin(ang) * r * 0.92,
    };
  }

  // ~53 %: polar en todo el disco; radio baja a ~0 para incluir el centro (antes mín. 6 dejaba vacío)
  if (t < 0.75) {
    const ang = u * Math.PI * 2;
    const rad = 0.35 + Math.pow(v, 0.58) * 47.5;
    return {
      x: 50 + Math.cos(ang) * rad * 1.02,
      y: 48 + Math.sin(ang) * rad * 0.92,
    };
  }

  return {
    x: 12 + rnd(i, 8) * 76,
    y: 12 + rnd(i, 9) * 74,
  };
}

function buildNetwork(count: number, neighbors: number) {
  const nodes: NodePt[] = Array.from({ length: count }, (_, i) => {
    const { x, y } = compactPosition(i);
    return {
      x: snap(Math.min(94, Math.max(6, x))),
      y: snap(Math.min(92, Math.max(8, y))),
      r: snap(0.2 + rnd(i, 3) * 0.42, 4),
      delay: snap(-rnd(i, 4) * 14, 3),
      dur: snap(7.5 + rnd(i, 5) * 9.5, 3),
    };
  });

  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const ordered = nodes
      .map((nj, j) => ({ j, d: j === i ? Infinity : Math.hypot(nodes[i].x - nj.x, nodes[i].y - nj.y) }))
      .sort((a, b) => a.d - b.d);
    const kMax = Math.min(neighbors, ordered.length);
    for (let k = 0; k < kMax; k++) {
      const j = ordered[k].j;
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}-${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([a, b]);
      }
    }
  }
  return { nodes, edges };
}

/** Red de nanoburbujas — SVG único, animación transform-only sobre <g> */
export function NanoBubbleNetwork({ density = 'normal' }: { density?: 'low' | 'normal' }) {
  const uid = useId().replace(/:/g, '');
  const count = density === 'low' ? 86 : 196;
  const neighbors = density === 'low' ? 5 : 6;

  const { nodes, edges } = useMemo(() => buildNetwork(count, neighbors), [count, neighbors]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_42%,rgba(72,202,228,0.22),transparent_58%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`nn-dot-${uid}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#60e0ff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#00b4d8" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        <g className="nano-net-lines">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="rgba(96, 224, 255, 0.38)"
              strokeWidth={0.09}
              strokeLinecap="round"
            />
          ))}
        </g>
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y})`}>
            <g
              className="nano-net-drift"
              style={
                {
                  ['--nn-delay' as string]: `${n.delay}s`,
                  ['--nn-dur' as string]: `${n.dur}s`,
                } as CSSProperties
              }
            >
              <circle r={n.r} fill={`url(#nn-dot-${uid})`} opacity={0.84} />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
