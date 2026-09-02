import { Photo } from "@/components/Photo";
import Link from "next/link";
import { TrustBadges } from "@/components/TrustBadges";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo funciona — Vuelvia",
  description: "Así de fácil es digitalizar tus cintas con Vuelvia, de principio a fin.",
};

const pasos = [
  {
    numero: "1",
    titulo: "Cuéntanos cuántas tienes",
    descripcion: "Elige el número de cintas y verás el precio al instante.",
  },
  {
    numero: "2",
    titulo: "Tú decides cómo enviarlas",
    descripcion:
      "Puedes llevarlas a un punto de entrega o pedir que pasemos a recogerlas.",
  },
  {
    numero: "3",
    titulo: "Un único pago",
    descripcion:
      "Pagas todo al hacer el pedido. Sin pagos a medias ni sorpresas después.",
  },
  {
    numero: "4",
    titulo: "Prepara la caja",
    descripcion: "Te explicamos cómo protegerlas para que viajen bien.",
  },
  {
    numero: "5",
    titulo: "Ya las tenemos",
    descripcion: "Al llegar, las contamos, fotografiamos y te avisamos.",
  },
  {
    numero: "6",
    titulo: "Empieza la digitalización",
    descripcion: "Convertimos cada cinta completa en un archivo de vídeo.",
  },
  {
    numero: "7",
    titulo: "Preparamos tu memoria USB",
    descripcion: "Todos tus vídeos, en una memoria USB incluida en el precio.",
  },
  {
    numero: "8",
    titulo: "Todo vuelve a casa",
    descripcion: "Te devolvemos tus cintas originales y tu memoria USB, a domicilio.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Más fácil de lo que parece
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-gris-tinta/70">
        Tú nos dices cuántas cintas tienes. Nosotros te guiamos en todo lo
        demás. Y si surge algo especial, te escribimos antes de hacer nada.
      </p>

      <ol className="mt-12 space-y-8">
        {pasos.map((paso) => (
          <li key={paso.numero} className="flex gap-5 rounded-2xl bg-white p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azul-principal font-bold text-white">
              {paso.numero}
            </span>
            <div>
              <h2 className="font-bold text-gris-tinta">{paso.titulo}</h2>
              <p className="mt-1 text-sm text-gris-tinta/70">{paso.descripcion}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <Photo
            src="/images/entrega-repartidor-paquete.webp"
            alt="El trayecto de tus cintas: las envías, las recibimos, y te devolvemos tus originales"
            width={1600}
            height={1200}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-3xl">
          <Photo
            src="/images/recepcion-revision-cinta.webp"
            alt="Un técnico de Vuelvia registrando y revisando una cinta al recibirla"
            width={1600}
            height={1200}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <TrustBadges className="mt-12" />

      <div className="mt-12 text-center">
        <Link
          href="/#calculadora"
          className="inline-block rounded-full bg-azul-principal px-8 py-4 font-bold text-white transition hover:bg-azul-noche"
        >
          Calcular mi precio
        </Link>
      </div>
    </div>
  );
}
