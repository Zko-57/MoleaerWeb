'use client';

import { useState } from 'react';

export function ContactForm() {
  const [ok, setOk] = useState(false);

  return (
    <form
      className="glass-strong flex flex-col gap-5 p-8 sm:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setOk(true);
        window.setTimeout(() => setOk(false), 3200);
      }}
    >
      <h3 className="font-display text-xl font-bold text-white">Solicita tu evaluación</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          Nombre
          <input
            required
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-cyan/40 placeholder:text-zinc-600 focus:ring-2"
            placeholder="Ej. Pablo García"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          Empresa
          <input
            required
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-cyan/40 placeholder:text-zinc-600 focus:ring-2"
            placeholder="Tu organización"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          Email
          <input
            type="email"
            required
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-cyan/40 placeholder:text-zinc-600 focus:ring-2"
            placeholder="tu@email.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          Sector
          <select
            required
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-cyan/40 focus:ring-2"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona...
            </option>
            <option>Acuicultura</option>
            <option>Agricultura</option>
            <option>Lagos y lagunas</option>
            <option>Aguas residuales</option>
            <option>Alimentos y bebidas</option>
            <option>Industrial</option>
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm text-zinc-400">
        Describe tu reto
        <textarea
          rows={3}
          className="resize-y rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-cyan/40 placeholder:text-zinc-600 focus:ring-2"
          placeholder="Cuéntanos sobre tu instalación, volúmenes, objetivos..."
        />
      </label>
      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-gradient-to-b from-cyan-light to-[#0077b6] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_26px_rgba(0,180,216,0.38)] transition-transform hover:translate-y-[-2px]"
      >
        Enviar consulta
      </button>
      <div
        className={`overflow-hidden text-sm text-cyan-light transition-[max-height,opacity] ${
          ok ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="status"
      >
        ✓ ¡Gracias! Un experto te contactará en 24h.
      </div>
    </form>
  );
}
