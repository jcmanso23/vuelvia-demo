"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { DEMO_ORDERS, loadOrders, Order } from "@/lib/orders";
import { formatEuros } from "@/lib/pricing";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders([...loadOrders(), ...DEMO_ORDERS]);
  }, []);

  const totalPedidos = orders.length;
  const cintasEsperadas = orders
    .filter((o) => ["confirmado", "esperando-cintas", "en-camino"].includes(o.status))
    .reduce((sum, o) => sum + o.tapeCount, 0);
  const enDigitalizacion = orders.filter((o) => o.status === "en-digitalizacion").length;
  const listas = orders.filter((o) => o.status === "listas").length;
  const enviosPendientes = orders.filter((o) => o.status === "listas").length;
  const facturado = orders.reduce((sum, o) => sum + o.pricing.total, 0);

  const kpis = [
    { label: "Pedidos totales", value: totalPedidos },
    { label: "Cintas esperadas", value: cintasEsperadas },
    { label: "En digitalización", value: enDigitalizacion },
    { label: "Listas para enviar", value: listas },
    { label: "Envíos pendientes", value: enviosPendientes },
    { label: "Facturado", value: formatEuros(facturado) },
  ];

  return (
    <AdminShell>
      <h1 className="font-[family-name:var(--font-baloo)] text-2xl font-bold text-gris-tinta">
        Dashboard
      </h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl bg-white p-5">
            <p className="text-sm font-semibold text-gris-tinta/70">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold text-azul-noche">{kpi.value}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
