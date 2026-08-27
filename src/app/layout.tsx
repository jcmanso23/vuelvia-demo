import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vuelvia — Tus recuerdos merecen volver",
  description:
    "Digitalizamos tus cintas de VHS, VHS-C, MiniDV y 8mm con cuidado profesional. Te devolvemos los originales y tus vídeos en una memoria USB.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${baloo.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gris-niebla text-gris-tinta">
        {children}
      </body>
    </html>
  );
}
