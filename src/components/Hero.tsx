import { Photo } from "@/components/Photo";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-azul-suave/60 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="font-[family-name:var(--font-baloo)] text-4xl font-bold leading-tight text-gris-tinta md:text-5xl">
            Tus recuerdos <span className="text-azul-principal">merecen volver.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-gris-tinta/70">
            Digitalizamos tus cintas para que vuelvas a ver y compartir los
            momentos que llevaban años guardados.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/digitalizar"
              className="rounded-full bg-azul-principal px-6 py-3 font-bold text-white transition hover:bg-azul-noche"
            >
              Digitalizar mis cintas
            </Link>
            <a href="#calculadora" className="font-bold text-azul-principal hover:text-azul-noche">
              Calcular mi precio →
            </a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold text-gris-tinta/80">
            <li>· Desde 10 €/cinta</li>
            <li>· Envío ida y vuelta 12 €</li>
            <li>· Te devolvemos tus originales</li>
            <li>· Recibes tus vídeos en USB</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-sm">
          <Photo
            src="/images/abuela-hijo-viendo-cinta.webp"
            alt="Una madre y su hijo revisando juntos una cinta VHS y una foto familiar"
            width={1600}
            height={1200}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
