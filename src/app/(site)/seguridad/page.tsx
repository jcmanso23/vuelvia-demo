import { Photo } from "@/components/Photo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguridad — Vuelvia",
  description: "Cómo cuidamos tus cintas y tus recuerdos en cada paso del proceso.",
};

const etapas = [
  {
    momento: "Antes",
    titulo: "Seguimiento de principio a fin",
    texto: "Tanto el envío hacia Vuelvia como la vuelta a tu casa se pueden seguir en todo momento, con estados claros en tu página de pedido.",
  },
  {
    momento: "Al llegar",
    titulo: "Fotografiamos y contamos tus cintas",
    texto: "En cuanto llegan, las contamos y fotografiamos, y te avisamos: sabrás exactamente cuántas hemos recibido.",
  },
  {
    momento: "Durante",
    titulo: "Cada cinta, identificada",
    texto: "Cada cinta queda vinculada a tu pedido de forma inequívoca, desde que llega hasta que se convierte en tu archivo final.",
  },
  {
    momento: "Al terminar",
    titulo: "Descarga y originales de vuelta",
    texto: "Recibes un enlace privado para tus vídeos, y tus cintas originales siempre vuelven a tu domicilio.",
  },
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

      <div className="mt-8 rounded-2xl bg-azul-suave/50 p-6 text-center">
        <p className="font-bold text-gris-tinta">Tus originales siempre vuelven.</p>
        <p className="mt-1 text-sm text-gris-tinta/70">
          Pase lo que pase con la digitalización, tus cintas físicas regresan
          a tu domicilio.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl">
        <Photo
          src="/images/recepcion-revision-cinta.webp"
          alt="Un técnico de Vuelvia revisando y registrando una cinta con cuidado"
          width={1600}
          height={1100}
          className="h-full w-full object-cover"
        />
      </div>

      <ol className="mt-12 space-y-6">
        {etapas.map((e) => (
          <li key={e.momento} className="flex gap-5 rounded-2xl bg-white p-5">
            <span className="w-20 shrink-0 text-xs font-bold uppercase tracking-wide text-azul-principal">
              {e.momento}
            </span>
            <div>
              <h2 className="font-bold text-gris-tinta">{e.titulo}</h2>
              <p className="mt-1 text-sm text-gris-tinta/70">{e.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl bg-white p-6 text-center">
        <p className="font-bold text-gris-tinta">Tus vídeos son tuyos. Punto.</p>
        <p className="mt-1 text-sm text-gris-tinta/70">
          Solo los usamos para prestarte el servicio y los eliminamos según
          nuestra política de conservación (7 días tras la entrega).
        </p>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/#calculadora"
          className="inline-block rounded-full bg-azul-principal px-8 py-4 font-bold text-white transition hover:bg-azul-noche"
        >
          Calcular mi precio
        </a>
      </div>
    </div>
  );
}
