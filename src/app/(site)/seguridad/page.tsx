import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguridad — Vuelvia",
  description: "Cómo cuidamos tus cintas y tus recuerdos en cada paso del proceso.",
};

const bloques = [
  { titulo: "Envío con seguimiento", texto: "Tanto la entrada como la vuelta de tus cintas se pueden seguir en todo momento." },
  { titulo: "Confirmación de recepción", texto: "En cuanto llegan tus cintas, te avisamos. Sabrás exactamente cuántas hemos recibido." },
  { titulo: "Revisión", texto: "Comprobamos el estado de cada cinta antes de empezar a digitalizar." },
  { titulo: "Fotografías", texto: "Fotografiamos el paquete y el contenido al recibirlo, para dar trazabilidad y resolver cualquier duda." },
  { titulo: "Identificación", texto: "Cada cinta queda vinculada a tu pedido de forma inequívoca, desde que llega hasta que se convierte en tu archivo final." },
  { titulo: "Estados claros", texto: "Puedes seguir el proceso completo: recibidas, en revisión, en digitalización, listas, enviadas." },
  { titulo: "Tus originales, de vuelta", texto: "Siempre te devolvemos las cintas originales junto con tu memoria USB." },
  { titulo: "Copia de seguridad 7 días", texto: "Por seguridad, conservamos una copia durante 7 días después de la entrega. Después la eliminamos." },
];

export default function SeguridadPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Sabemos que no son solo cintas.
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-gris-tinta/70">
        Muchas son copias únicas de recuerdos familiares. Por eso queremos que
        sepas qué ocurre con ellas en cada momento.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl">
        <Image
          src="/images/recepcion-revision-cinta.webp"
          alt="Un técnico de Vuelvia revisando y registrando una cinta con cuidado"
          width={1600}
          height={1100}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {bloques.map((b) => (
          <div key={b.titulo} className="rounded-2xl bg-white p-6">
            <h2 className="font-bold text-gris-tinta">{b.titulo}</h2>
            <p className="mt-2 text-sm text-gris-tinta/70">{b.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-azul-suave/50 p-6 text-center">
        <p className="font-bold text-gris-tinta">
          Privacidad de tus vídeos
        </p>
        <p className="mt-1 text-sm text-gris-tinta/70">
          Usamos tu material exclusivamente para prestarte el servicio. No lo
          reutilizamos, no lo publicamos y no lo usamos para entrenar
          inteligencia artificial.
        </p>
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
