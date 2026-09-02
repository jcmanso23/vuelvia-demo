import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
