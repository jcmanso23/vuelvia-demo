"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { findOrder, Order } from "@/lib/orders";
import { formatEuros } from "@/lib/pricing";

const embalaje = [
  "Utiliza una caja resistente.",
  "Coloca las cintas dentro.",
  "Rellena los huecos para que no se muevan.",
  "No pegues adhesivos directamente sobre las cintas.",
  "Protege especialmente las cintas rotas.",
  "Añade el número de tu pedido en un papel dentro de la caja.",
  "Cierra bien la caja.",
  "Entrégala en Correos, o espera la recogida si la elegiste.",
];

function Confirmation() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (code) setOrder(findOrder(code) ?? null);
  }, [code]);

  if (order === undefined) {
    return <p className="text-center text-gris-tinta/60">Cargando…</p>;
  }

  if (!order) {
    return (
      <div className="text-center">
        <p className="text-gris-tinta/70">No hemos encontrado ese pedido.</p>
        <Link href="/digitalizar" className="mt-4 inline-block font-bold text-azul-principal">
          Hacer un pedido →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <span className="text-5xl">🎉</span>
        <h1 className="mt-3 font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
          ¡Perfecto! Ya está todo preparado.
        </h1>
        <p className="mt-2 text-gris-tinta/70">
          Ahora solo tienes que preparar tus cintas y hacérnoslas llegar.
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 text-center">
        <p className="text-sm font-bold text-gris-tinta/60">Tu pedido</p>
        <p className="mt-1 text-2xl font-bold text-azul-principal">{order.code}</p>
        <p className="mt-2 text-sm text-gris-tinta/70">
          {order.tapeCount} {order.tapeCount === 1 ? "cinta" : "cintas"} · Total pagado{" "}
          {formatEuros(order.pricing.total)}
        </p>
        <p className="mt-1 text-sm font-semibold text-gris-tinta">
          Elegiste: {order.inboundMethod === "correos" ? "Entrega en Correos" : "Recogida en domicilio"}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() => setShowInstructions((v) => !v)}
          className="rounded-full border-2 border-azul-principal px-6 py-3 font-bold text-azul-principal hover:bg-azul-suave/40"
        >
          Ver instrucciones de envío
        </button>
        <Link
          href={`/pedido?code=${order.code}`}
          className="rounded-full bg-azul-principal px-6 py-3 text-center font-bold text-white hover:bg-azul-noche"
        >
          Ver mi pedido
        </Link>
      </div>

      {showInstructions && (
        <div className="mt-8 rounded-2xl bg-white p-6">
          <h2 className="font-bold text-gris-tinta">Cómo preparar tus cintas</h2>
          <ol className="mt-3 space-y-2 text-sm text-gris-tinta/70">
            {embalaje.map((paso, i) => (
              <li key={paso} className="flex gap-2">
                <span className="font-bold text-azul-principal">{i + 1}.</span>
                {paso}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function PedidoConfirmadoPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <Suspense fallback={<p className="text-center text-gris-tinta/60">Cargando…</p>}>
        <Confirmation />
      </Suspense>
    </div>
  );
}
