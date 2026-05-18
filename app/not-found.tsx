import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-zinc-300">Error</p>
      <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-white">Página no encontrada</h1>
      <p className="mt-3 text-zinc-400">La ruta que buscas no existe o ha cambiado.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-gradient-to-b from-cyan-light to-[#0077b6] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_22px_rgba(0,180,216,0.38)]"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
