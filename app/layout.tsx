import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { MotionProvider } from '@/components/providers/motion-provider';
import { DemoWatermark } from '@/components/demo-watermark';
import { getSiteUrl } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Moleaer | Tecnología Corporativa de Nanoburbujas',
  description:
    'Moleaer es la compañía líder mundial en tecnología de nanoburbujas: tratamiento de agua, agricultura, acuicultura, lagos y aguas residuales sin químicos.',
  metadataBase: getSiteUrl(),
  /** Favicon: app/favicon.ico + app/icon.svg (oficial Moleaer), no el logo horizontal en pestaña. */
};

export const viewport: Viewport = {
  themeColor: '#001428',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#02040a] font-sans text-zinc-100 antialiased">
        <MotionProvider>
          {children}
          <DemoWatermark />
        </MotionProvider>
      </body>
    </html>
  );
}
