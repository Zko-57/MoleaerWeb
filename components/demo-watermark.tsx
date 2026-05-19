/**
 * Marca de agua global: deja claro que el sitio es un concepto demo, no producto oficial Moleaer.
 */
export function DemoWatermark() {
  return (
    <aside
      className="demo-watermark pointer-events-none fixed bottom-[5.25rem] left-1/2 z-[1050] max-w-[min(100vw-2rem,22rem)] -translate-x-1/2 sm:bottom-5"
      aria-label="Aviso: sitio de demostración creado por Adonis Delgado Muñoz"
    >
      <div className="rounded-2xl border border-white/12 bg-[#051836]/85 px-4 py-2.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cyan-light/90">
          Demostración · Concepto UX/UI
        </p>
        <p className="mt-0.5 text-[0.7rem] leading-snug text-zinc-400">
          Mockup no oficial de Moleaer · datos ficticios
        </p>
        <p className="mt-1 text-[0.75rem] font-medium text-zinc-200">
          Adonis Delgado Muñoz
        </p>
      </div>
    </aside>
  );
}
