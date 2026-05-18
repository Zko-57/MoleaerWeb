import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { MotionProvider } from '@/components/providers/motion-provider';
import { AmbientBackground } from '@/components/ambient-background';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppFab } from '@/components/whatsapp-fab';

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
  preload: true,
});

export const metadata: Metadata = {
  title: 'Moleaer | Tecnología Corporativa de Nanoburbujas',
  description:
    'Moleaer es la compañía líder mundial en tecnología de nanoburbujas: tratamiento de agua, agricultura, acuicultura, lagos y aguas residuales sin químicos.',
  metadataBase: new URL('https://www.moleaer.com'),
  icons: {
    icon: '/images/moleaer-logo.png',
    apple: '/images/moleaer-logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#001428',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${space.variable}`}>
      <body className="min-h-screen font-sans">
        <MotionProvider>
          <AmbientBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            {children}
            <Footer />
            <WhatsAppFab />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
