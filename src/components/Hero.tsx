import { Photo } from "@/components/Photo";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-azul-suave/60 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="font-[family-name:var(--font-baloo)] text-4xl font-bold leading-tight text-gris-tinta md:text-5xl">
            Tus recuerdos <span className="text-azul-noche">merecen volver.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-gris-tinta/70">
            Pasa tus viejas cintas a digital y vuelve a ver todo lo que
            guardan. Nosotros nos ocupamos del viaje de ida y vuelta.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#calculadora"
              className="rounded-full bg-azul-noche px-6 py-3 font-bold text-white transition hover:opacity-90"
            >
              Calcular mi precio
            </a>
            <Link href="/como-funciona" className="font-bold text-azul-noche hover:underline">
              Cómo funciona →
            </Link>
          </div>
          <ul className="mt-8 space-y-1.5 text-sm font-semibold text-gris-tinta/80">
            <li>✓ Sabes dónde están tus cintas en cada momento</li>
            <li>✓ El precio que ves ya incluye el transporte</li>
            <li>✓ Si una cinta no se puede digitalizar, no la pagas</li>
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
