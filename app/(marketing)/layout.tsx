import { AmbientBackground } from '@/components/ambient-background';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppFab } from '@/components/whatsapp-fab';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFab />
      </div>
    </>
  );
}
