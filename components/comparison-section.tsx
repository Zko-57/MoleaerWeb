'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ComparisonSection() {
  const [focus, setFocus] = useState<'none' | 'bad' | 'good'>('none');

  return (
    <div
      className="comparison-root glass grid gap-10 overflow-hidden p-8 lg:grid-cols-2 lg:p-12"
      data-focus={focus === 'none' ? undefined : focus}
    >
      <div className="flex flex-col justify-center gap-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-zinc-300">
          Caso de éxito · Agricultura
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          El impacto es visible.
        </h2>
        <p className="max-w-prose text-zinc-400">
          Los sistemas de riego enriquecidos con nanoburbujas de Moleaer superoxigenan la zona radicular. El
          resultado es un desarrollo masivo de las raíces, mayor absorción de nutrientes y resistencia extrema a
          enfermedades, sin necesidad de fertilizantes adicionales.
        </p>
        <ul className="space-y-3 text-[0.95rem] text-zinc-300">
          <li className="flex gap-3">
            <span className="text-cyan-light">✓</span>
            Aumento del <b>25%</b> en rendimiento de cultivos
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-light">✓</span>
            Raíces más blancas, densas y saludables
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-light">✓</span>
            Supresión natural de <i>Pythium</i> y patógenos
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-light">✓</span>
            Reducción de hasta <b>50%</b> en consumo de agua post-cosecha
          </li>
        </ul>
        <a
          href="#contacto"
          className="w-fit rounded-full bg-gradient-to-b from-cyan-light to-[#0077b6] px-7 py-3.5 text-center text-sm font-semibold text-white shadow-[0_8px_26px_rgba(0,180,216,0.38)] transition-[transform,box-shadow] hover:translate-y-[-2px] hover:shadow-[0_12px_32px_rgba(0,180,216,0.48)]"
        >
          Solicitar el estudio
        </a>
      </div>

      <div className="relative min-h-[240px] rounded-2xl bg-gradient-to-b from-[#001a34]/80 to-[#000a14]/90 lg:min-h-[360px]">
        <div className="comparison-zoom relative h-full min-h-[240px] overflow-hidden rounded-2xl lg:min-h-[360px]">
          <Image
            src="/images/lettuce_roots.jpg"
            alt="Comparativa de raíces con y sin Moleaer"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-auto absolute inset-x-0 bottom-4 flex justify-center gap-4">
          <button
            type="button"
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-[transform,opacity] ${
              focus === 'bad'
                ? 'border-red-400/70 bg-red-950/40 text-red-100'
                : 'border-white/25 bg-black/50 text-white/90 hover:bg-black/65'
            }`}
            onClick={() => setFocus((f) => (f === 'bad' ? 'none' : 'bad'))}
          >
            Sin Moleaer
          </button>
          <button
            type="button"
            className={`rounded-full border px-5 py-2 text-sm font-semibold shadow-[0_0_18px_rgba(0,224,255,0.35)] transition-[transform,opacity] ${
              focus === 'good'
                ? 'border-cyan-light bg-cyan-950/40 text-cyan-100'
                : 'border-cyan-light/50 bg-black/50 text-white hover:bg-black/65'
            }`}
            onClick={() => setFocus((f) => (f === 'good' ? 'none' : 'good'))}
          >
            Con Moleaer
          </button>
        </div>
      </div>
    </div>
  );
}
