import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020814]/90 px-5 pb-16 pt-20 sm:px-8">
      <div className="mx-auto grid max-w-[1320px] gap-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="#top" className="inline-block" aria-label="Moleaer">
            <BrandLogo variant="footer" alt="Moleaer — Advancing Nanobubble Technology" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            La compañía líder mundial en tecnología industrial de nanoburbujas. Ciencia respaldada por datos.
            Resultados respaldados por personas.
          </p>
          <div className="flex gap-3 text-sm">
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-zinc-400 transition-colors hover:border-cyan/40 hover:text-cyan-light">
              in
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-zinc-400 transition-colors hover:border-cyan/40 hover:text-cyan-light">
              𝕏
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-zinc-400 transition-colors hover:border-cyan/40 hover:text-cyan-light">
              ▶
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-zinc-400">
            Soluciones
          </h4>
          <nav className="flex flex-col gap-3 text-sm text-zinc-500">
            <Link href="#" className="transition-colors hover:text-white">
              Agricultura
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Acuicultura
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Aguas Superficiales
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Aguas Residuales
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Alimentos & Bebidas
            </Link>
          </nav>
        </div>
        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-zinc-400">Compañía</h4>
          <nav className="flex flex-col gap-3 text-sm text-zinc-500">
            <Link href="#" className="transition-colors hover:text-white">
              Sobre Nosotros
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              I+D
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Carreras
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Noticias
            </Link>
            <Link href="#contacto" className="transition-colors hover:text-white">
              Contacto
            </Link>
          </nav>
        </div>
        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-zinc-400">
            Soporte Rápido
          </h4>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
          >
            <span className="text-emerald-400">W</span> WhatsApp Business
          </a>
          <p className="mt-6 text-sm leading-relaxed text-zinc-500">
            3232 El Segundo Blvd
            <br />
            Hawthorne, CA 90250 USA
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1320px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-600 sm:flex-row">
        <p>© {new Date().getFullYear()} Moleaer Inc. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-zinc-400">
            Política de Privacidad
          </Link>
          <Link href="#" className="hover:text-zinc-400">
            Términos de Uso
          </Link>
          <Link href="#" className="hover:text-zinc-400">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
