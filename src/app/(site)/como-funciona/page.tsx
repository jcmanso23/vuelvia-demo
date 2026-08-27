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
    titulo: "El cliente indica cuántas cintas tiene",
    descripcion:
      "En la web eliges el número de cintas que quieres digitalizar y ves el precio al instante, sin sorpresas.",
  },
  {
    numero: "2",
    titulo: "Eliges cómo nos las haces llegar",
    descripcion:
      "Puedes llevarlas a una oficina de Correos o pedir que las recojamos en tu domicilio.",
  },
  {
    numero: "3",
    titulo: "Introduces tus datos y pagas una sola vez",
    descripcion:
      "El pago incluye la digitalización y el transporte de ida y vuelta. No hay pagos parciales ni sorpresas después.",
  },
  {
    numero: "4",
    titulo: "Recibes instrucciones y preparas el envío",
    descripcion:
      "Te explicamos paso a paso cómo embalar tus cintas para que lleguen seguras.",
  },
  {
    numero: "5",
    titulo: "Vuelvia recibe y registra tu material",
    descripcion:
      "Contamos, revisamos y fotografiamos cada cinta al recibirla, y te avisamos en cuanto llega.",
  },
  {
    numero: "6",
    titulo: "Digitalizamos cada cinta por completo",
    descripcion:
      "Cada cinta genera un archivo MP4. Si tiene un nombre escrito, usamos ese nombre para el archivo.",
  },
  {
    numero: "7",
    titulo: "Te enviamos tu enlace de descarga",
    descripcion:
      "En cuanto están listos, recibes un enlace privado para ver y descargar tus vídeos. ¿Quieres además una copia en USB? Puedes añadirla como extra.",
  },
  {
    numero: "8",
    titulo: "Te devolvemos tus originales",
    descripcion:
      "Tus cintas originales vuelven a tu domicilio. Tus recuerdos, en dos formatos: el de siempre y el digital.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Así funciona
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-gris-tinta/70">
        Un pedido normal se puede completar de principio a fin sin necesidad
        de llamar ni escribir a nadie. Guardamos la conversación humana para
        dudas, incidencias o cintas con casos especiales.
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
          href="/digitalizar"
          className="inline-block rounded-full bg-azul-principal px-8 py-4 font-bold text-white transition hover:bg-azul-noche"
        >
          Digitalizar mis cintas
        </Link>
      </div>
    </div>
  );
}
