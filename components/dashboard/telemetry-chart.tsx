'use client';

import { m } from 'framer-motion';
import { TELEMETRY_SERIES } from '@/lib/dashboard-mock';

const W = 640;
const H = 220;
const PAD = { t: 16, r: 12, b: 28, l: 36 };
const IW = W - PAD.l - PAD.r;
const IH = H - PAD.t - PAD.b;

function scaleY(v: number, min: number, max: number) {
  return PAD.t + IH - ((v - min) / (max - min)) * IH;
}

function scaleX(i: number, len: number) {
  return PAD.l + (i / (len - 1)) * IW;
}

function linePath(values: number[], min: number, max: number) {
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i, values.length)} ${scaleY(v, min, max)}`)
    .join(' ');
}

function areaPath(values: number[], min: number, max: number) {
  const top = linePath(values, min, max);
  const lastX = scaleX(values.length - 1, values.length);
  const firstX = scaleX(0, values.length);
  const base = PAD.t + IH;
  return `${top} L ${lastX} ${base} L ${firstX} ${base} Z`;
}

export function TelemetryChart() {
  const oxygen = TELEMETRY_SERIES.map((p) => p.oxygen);
  const power = TELEMETRY_SERIES.map((p) => p.power);
  const oMin = 5.5;
  const oMax = 9;
  const pMin = 55;
  const pMax = 100;

  return (
    <m.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="dashboard-glass flex h-full min-h-[320px] flex-col rounded-2xl border border-white/10 p-5 sm:p-6"
      aria-labelledby="telemetry-chart-title"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="telemetry-chart-title" className="font-display text-lg font-bold text-white">
            Correlación operativa · 24 h
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Oxígeno disuelto en alza frente a reducción de consumo eléctrico
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-2 text-zinc-400">
            <span className="h-0.5 w-6 rounded-full bg-emerald-400" aria-hidden />
            Oxígeno (mg/L)
          </span>
          <span className="flex items-center gap-2 text-zinc-400">
            <span className="h-0.5 w-6 rounded-full bg-cyan-light" aria-hidden />
            Consumo eléctrico (%)
          </span>
        </div>
      </div>

      <div className="relative flex-1 min-h-[240px]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          role="img"
          aria-label="Gráfico de oxígeno disuelto y consumo eléctrico en las últimas 24 horas"
        >
          <defs>
            <linearGradient id="oxygenFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0.35)" />
              <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
            </linearGradient>
            <linearGradient id="powerFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(72, 202, 228, 0.28)" />
              <stop offset="100%" stopColor="rgba(72, 202, 228, 0)" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((i) => {
            const y = PAD.t + (IH / 3) * i;
            return (
              <line
                key={i}
                x1={PAD.l}
                y1={y}
                x2={W - PAD.r}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            );
          })}

          <path d={areaPath(power, pMin, pMax)} fill="url(#powerFill)" />
          <path
            d={linePath(power, pMin, pMax)}
            fill="none"
            stroke="rgba(72, 202, 228, 0.85)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path d={areaPath(oxygen, oMin, oMax)} fill="url(#oxygenFill)" />
          <path
            d={linePath(oxygen, oMin, oMax)}
            fill="none"
            stroke="rgba(52, 211, 153, 0.95)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {TELEMETRY_SERIES.filter((_, i) => i % 2 === 0).map((p, idx) => {
            const i = idx * 2;
            return (
              <text
                key={p.hour}
                x={scaleX(i, TELEMETRY_SERIES.length)}
                y={H - 6}
                textAnchor="middle"
                className="fill-zinc-500 text-[9px] font-medium"
              >
                {p.hour}
              </text>
            );
          })}
        </svg>
      </div>
    </m.section>
  );
}
