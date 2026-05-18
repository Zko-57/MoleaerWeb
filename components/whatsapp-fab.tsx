import Link from 'next/link';

export function WhatsAppFab() {
  return (
    <Link
      href="#"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 transition-transform duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.8 11.8 0 0 0 2.9 18.7L2 22l3.4-.9A11.9 11.9 0 1 0 20.5 3.5zM12 20.2a8.3 8.3 0 0 1-4.2-1.1l-.3-.2-2 .5.5-1.9-.2-.3A8.3 8.3 0 1 1 12 20.2zm4.6-6.2c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.4c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2 5.3 5.3 0 0 0 1.1 2.7 12.1 12.1 0 0 0 4.6 4 5.4 5.4 0 0 0 2.5.5 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.2-.3-.2-.6-.4z" />
      </svg>
    </Link>
  );
}
