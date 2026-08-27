"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Timeline } from "@/components/Timeline";
import {
  findOrder,
  Order,
  STATUS_MESSAGES,
  STATUS_ORDER,
  updateOrderStatus,
} from "@/lib/orders";
import { formatEuros } from "@/lib/pricing";

function LookupForm() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
        Sigue tu pedido
      </h1>
      <p className="mt-2 text-center text-sm text-gris-tinta/60">
        Introduce el número de pedido que recibiste por email.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code.trim()) router.push(`/pedido?code=${code.trim().toUpperCase()}`);
        }}
        className="mt-6 flex gap-2"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="VLV-2026XXXXX"
          className="flex-1 rounded-lg border border-black/10 px-4 py-2.5 focus:border-azul-principal focus:outline-none"
        />
        <button className="rounded-lg bg-azul-principal px-5 py-2.5 font-bold text-white hover:bg-azul-noche">
          Buscar
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-gris-tinta/50">
        ¿Quieres ver un ejemplo? Prueba con{" "}
        <Link href="/pedido?code=VLV-DEMO1" className="font-bold text-azul-principal">
          VLV-DEMO1
        </Link>
        ,{" "}
        <Link href="/pedido?code=VLV-DEMO2" className="font-bold text-azul-principal">
          VLV-DEMO2
        </Link>{" "}
        o{" "}
        <Link href="/pedido?code=VLV-DEMO3" className="font-bold text-azul-principal">
          VLV-DEMO3
        </Link>
        .
      </p>
    </div>
  );
}

function OrderTracking({ code }: { code: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(findOrder(code) ?? null);
  }, [code]);

  if (order === undefined) return <p className="text-center text-gris-tinta/60">Buscando…</p>;

  if (!order) {
    return (
      <div className="text-center">
        <p className="text-gris-tinta/70">
          No hemos encontrado el pedido <strong>{code}</strong>.
        </p>
        <Link href="/pedido" className="mt-4 inline-block font-bold text-azul-principal">
          ← Buscar otro pedido
        </Link>
      </div>
    );
  }

  const currentIndex = STATUS_ORDER.indexOf(order.status);
  const nextStatus = STATUS_ORDER[currentIndex + 1];

  return (
    <div>
      <div className="text-center">
        <p className="text-sm font-bold text-gris-tinta/60">Pedido</p>
        <h1 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
          {order.code}
        </h1>
        <p className="mt-2 text-gris-tinta/70">{STATUS_MESSAGES[order.status]}</p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-2 font-bold text-gris-tinta">Resumen</h2>
          <dl className="space-y-1 text-sm text-gris-tinta/70">
            <div className="flex justify-between">
              <dt>Cintas</dt>
              <dd>{order.tapeCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Entrada</dt>
              <dd>{order.inboundMethod === "correos" ? "Lo llevo a un punto" : "Recogida a domicilio"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Plazo estimado</dt>
              <dd>{order.estimatedDays} días</dd>
            </div>
            <div className="flex justify-between font-bold text-gris-tinta">
              <dt>Total</dt>
              <dd>{formatEuros(order.pricing.total)}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-lg bg-azul-suave/40 p-4 text-sm text-gris-tinta/80">
            ¿Necesitas ayuda con este pedido?{" "}
            <Link
              href={`/contacto?pedido=${order.code}`}
              className="font-bold text-azul-principal"
            >
              Contactar con Vuelvia
            </Link>
          </div>

          {order.isDemo && nextStatus && (
            <p className="mt-4 text-xs text-gris-tinta/40">
              Pedido de ejemplo — su estado no cambia.
            </p>
          )}
          {!order.isDemo && nextStatus && (
            <button
              onClick={() => {
                updateOrderStatus(order.code, nextStatus);
                setOrder({ ...order, status: nextStatus });
              }}
              className="mt-4 w-full rounded-lg border border-dashed border-black/20 px-4 py-2 text-xs font-semibold text-gris-tinta/50 hover:border-azul-principal hover:text-azul-principal"
            >
              Simular avance de estado (solo demo)
            </button>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6">
          <Timeline status={order.status} />
        </div>
      </div>
    </div>
  );
}

function PedidoContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) return <LookupForm />;
  return <OrderTracking code={code} />;
}

export default function PedidoPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Suspense fallback={<p className="text-center text-gris-tinta/60">Cargando…</p>}>
        <PedidoContent />
      </Suspense>
    </div>
  );
}
