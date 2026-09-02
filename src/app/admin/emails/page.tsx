"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  pedidoConfirmadoEmail,
  cintasRecibidasEmail,
  cantidadDistintaEmail,
  digitalizandoEmail,
  noDigitalizableEmail,
  listoParaVolverEmail,
  envioDeVueltaEmail,
  entregadoEmail,
} from "@/lib/emails";

const EXAMPLE = {
  orderCode: "VLV-202612345",
  customerName: "Laura",
  trackingUrl: "https://vuelvia.app/pedido?code=VLV-202612345",
};

const TEMPLATES = [
  { id: "pedido-confirmado", label: "Pedido confirmado", build: () => pedidoConfirmadoEmail(EXAMPLE) },
  {
    id: "cintas-recibidas",
    label: "Cintas recibidas",
    build: () => cintasRecibidasEmail({ ...EXAMPLE, tapeCount: 7 }),
  },
  {
    id: "cantidad-distinta",
    label: "Cantidad distinta",
    build: () => cantidadDistintaEmail({ ...EXAMPLE, esperadas: 7, recibidas: 6 }),
  },
  { id: "digitalizando", label: "En digitalización", build: () => digitalizandoEmail(EXAMPLE) },
  {
    id: "no-digitalizable",
    label: "Cinta no digitalizable",
    build: () =>
      noDigitalizableEmail({ ...EXAMPLE, tapeLabel: "Cumpleaños Ana", refundAmount: "10 €" }),
  },
  { id: "listo-para-volver", label: "Listo para volver", build: () => listoParaVolverEmail(EXAMPLE) },
  { id: "envio-de-vuelta", label: "Envío de vuelta", build: () => envioDeVueltaEmail(EXAMPLE) },
  { id: "entregado", label: "Entregado", build: () => entregadoEmail(EXAMPLE) },
];

export default function AdminEmailsPage() {
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);
  const active = TEMPLATES.find((t) => t.id === activeId)!;
  const rendered = active.build();

  return (
    <AdminShell>
      <h1 className="font-[family-name:var(--font-baloo)] text-2xl font-bold text-gris-tinta">
        Emails transaccionales
      </h1>
      <p className="mt-1 text-sm text-gris-tinta/70">
        Vista previa con datos de ejemplo. Listos para conectar a un proveedor de envío real.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="space-y-1">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                activeId === t.id
                  ? "bg-azul-noche text-white"
                  : "bg-white text-gris-tinta/70 hover:bg-azul-suave/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-gris-tinta/70">Asunto</p>
          <p className="mb-4 font-bold text-gris-tinta">{rendered.subject}</p>
          <iframe
            title="preview"
            srcDoc={rendered.html}
            className="h-[520px] w-full rounded-xl border border-black/10"
          />
        </div>
      </div>
    </AdminShell>
  );
}
