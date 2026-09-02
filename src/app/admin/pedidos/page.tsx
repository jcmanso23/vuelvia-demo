"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTokenGate } from "@/components/admin/AdminTokenGate";
import { DEMO_ORDERS, loadOrders, Order, STATUS_LABELS } from "@/lib/orders";
import { fetchOrdersAdmin } from "@/lib/api";
import { formatEuros } from "@/lib/pricing";

function PedidosTable({ token }: { token: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [source, setSource] = useState<"remote" | "local">("local");

  useEffect(() => {
    fetchOrdersAdmin(token).then((remote) => {
      if (remote && remote.length > 0) {
        setOrders([...remote, ...DEMO_ORDERS]);
        setSource("remote");
      } else {
        setOrders([...loadOrders(), ...DEMO_ORDERS]);
        setSource("local");
      }
    });
  }, [token]);

  return (
    <>
      <p className="mt-1 text-sm text-gris-tinta/70">
        {source === "remote"
          ? "Mostrando pedidos reales de la base de datos."
          : "Sin backend conectado todavía — mostrando pedidos guardados en este navegador."}
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-gris-tinta/70">
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Cintas</th>
              <th className="px-4 py-3">Importe</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gris-tinta/70">
                  Todavía no hay pedidos. Se crearán al completar el checkout.
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr key={o.code} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3 font-bold text-gris-tinta">{o.code}</td>
                <td className="px-4 py-3 text-gris-tinta/70">
                  {o.customer.name} {o.customer.surname}
                </td>
                <td className="px-4 py-3 text-gris-tinta/70">{o.tapeCount}</td>
                <td className="px-4 py-3 text-gris-tinta/70">{formatEuros(o.pricing.total)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-azul-suave px-2.5 py-1 text-xs font-bold text-azul-noche">
                    {STATUS_LABELS[o.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-gris-tinta/70">
                  {new Date(o.createdAt).toLocaleDateString("es-ES")}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/pedido?code=${o.code}`} className="font-bold text-azul-noche hover:underline">
                    Ver →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function AdminPedidosPage() {
  return (
    <AdminShell>
      <h1 className="font-[family-name:var(--font-baloo)] text-2xl font-bold text-gris-tinta">
        Pedidos
      </h1>
      <AdminTokenGate>{(token) => <PedidosTable token={token} />}</AdminTokenGate>
    </AdminShell>
  );
}
