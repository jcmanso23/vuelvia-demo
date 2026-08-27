import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qué digitalizamos — Vuelvia",
  description: "Digitalizamos VHS, VHS-C, MiniDV y 8mm. Beta/Betamax no está disponible actualmente.",
};

const formatos = [
  {
    nombre: "VHS",
    descripcion:
      "El formato más habitual en los hogares españoles durante los años 80, 90 y 2000. Si tienes una cinta grande de plástico negro, casi seguro que es esta.",
  },
  {
    nombre: "VHS-C",
    descripcion:
      "El formato compacto que se usaba en las videocámaras familiares. Es como un VHS en miniatura, pensado para cámaras portátiles.",
  },
  {
    nombre: "MiniDV",
    descripcion:
      "Cintas digitales, más pequeñas, habituales en cámaras de vídeo de los años 2000.",
  },
  {
    nombre: "8 mm",
    descripcion:
      "Cintas pequeñas de cámaras de vídeo antiguas. Aceptamos este formato sin necesidad de que sepas la variante exacta.",
  },
];

export default function QueDigitalizamosPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Qué digitalizamos
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-gris-tinta/70">
        No necesitas saber exactamente qué tipo de cinta tienes. Si no lo
        sabes, puedes marcar &ldquo;No lo sé&rdquo; en el pedido — el precio
        no cambia según el formato.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl">
        <Image
          src="/images/cintas-vhs-flatlay.webp"
          alt="Distintos formatos de cintas de vídeo: VHS, VHS-C, MiniDV y 8mm"
          width={1600}
          height={1100}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {formatos.map((f) => (
          <div key={f.nombre} className="rounded-2xl bg-white p-6">
            <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-azul-noche font-[family-name:var(--font-baloo)] text-sm font-bold text-white">
              {f.nombre}
            </div>
            <p className="mt-4 text-sm text-gris-tinta/70">{f.descripcion}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-naranja-luz/15 p-6 text-center">
        <p className="font-bold text-gris-tinta">
          Beta / Betamax no está disponible actualmente.
        </p>
      </div>

      <div className="mt-12 rounded-2xl bg-white p-6">
        <h2 className="font-bold text-gris-tinta">¿No sabes qué tipo de cinta tienes?</h2>
        <p className="mt-2 text-sm text-gris-tinta/70">
          No pasa nada. Si no sabes si tu cinta es VHS-C, MiniDV o 8&nbsp;mm,
          puedes elegir &ldquo;No lo sé / Tengo varios formatos&rdquo; al
          hacer tu pedido, o escribirnos y te ayudamos a identificarla.
        </p>
        <Link href="/contacto" className="mt-3 inline-block font-bold text-azul-principal hover:text-azul-noche">
          Contactar con Vuelvia →
        </Link>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/digitalizar"
          className="inline-block rounded-full bg-azul-principal px-8 py-4 font-bold text-white transition hover:bg-azul-noche"
        >
          Digitalizar mis cintas
        </Link>
      </div>
    </div>
  );
}
