import { Photo } from "@/components/Photo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguridad — Vuelvia",
  description: "Cómo cuidamos tus cintas y tus recuerdos en cada paso del proceso.",
};

const etapas = [
  {
    momento: "Antes",
    titulo: "Sabes dónde están",
    texto: "Puedes seguir el viaje hasta Vuelvia y también la vuelta a casa.",
  },
  {
    momento: "Al llegar",
    titulo: "Te decimos que ya están aquí",
    texto: "Las contamos y fotografiamos. Después te avisamos de cuántas hemos recibido.",
  },
  {
    momento: "Durante",
    titulo: "Cada cinta sigue siendo la tuya",
    texto: "Las identificamos para mantener cada cinta unida a su pedido y a su archivo final.",
  },
  {
    momento: "Al terminar",
    titulo: "Todo vuelve junto a casa",
    texto: "Tus cintas originales y tu memoria USB con los vídeos llegan juntas a tu domicilio.",
  },
];

export default function SeguridadPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Sabemos que no son solo cintas.
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-gris-tinta/70">
        Puede que ahí esté el único vídeo de una boda, una infancia o alguien
        que ya no está. Por eso queremos que sepas exactamente qué hacemos con
        tus cintas desde que salen de casa hasta que vuelven.
      </p>

      <div className="mt-8 rounded-2xl bg-azul-suave/50 p-6 text-center">
        <p className="font-bold text-gris-tinta">Tus originales siempre vuelven.</p>
        <p className="mt-1 text-sm text-gris-tinta/70">
          Las digitalicemos o no, te devolvemos todas las cintas que nos
          envíes.
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
          Solo accedemos a ellos para realizar el trabajo y los conservamos
          temporalmente por seguridad. Después, los eliminamos (7 días tras
          la entrega).
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
