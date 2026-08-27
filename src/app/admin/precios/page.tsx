"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  calculateTotal,
  DEFAULT_PRICING,
  formatEuros,
  loadPricingConfig,
  PricingConfig,
  savePricingConfig,
} from "@/lib/pricing";

export default function AdminPreciosPage() {
  const [config, setConfig] = useState<PricingConfig>(DEFAULT_PRICING);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(loadPricingConfig());
  }, []);

  function update<K extends keyof PricingConfig>(key: K, value: PricingConfig[K]) {
    setConfig((c) => ({ ...c, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    savePricingConfig(config);
    setSaved(true);
  }

  const example = calculateTotal(15, "correos", 0, config);

  return (
    <AdminShell>
      <h1 className="font-[family-name:var(--font-baloo)] text-2xl font-bold text-gris-tinta">
        Configuración de precios
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6 rounded-2xl bg-white p-6">
          <div>
            <h2 className="font-bold text-gris-tinta">Tramo 1</h2>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <NumberField label="Hasta cintas" value={config.tier1Max} onChange={(v) => update("tier1Max", v)} />
              <NumberField label="Precio/cinta (€)" value={config.tier1PricePerTape} onChange={(v) => update("tier1PricePerTape", v)} />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-gris-tinta">Tramo 2 (a partir de la siguiente)</h2>
            <NumberField label="Precio/cinta adicional (€)" value={config.tier2PricePerTape} onChange={(v) => update("tier2PricePerTape", v)} />
          </div>
          <div>
            <h2 className="font-bold text-gris-tinta">Transporte</h2>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <NumberField label="Lo lleva a un punto (€)" value={config.dropoffRoundTrip} onChange={(v) => update("dropoffRoundTrip", v)} />
              <NumberField label="Recogida a domicilio (€)" value={config.homePickupRoundTrip} onChange={(v) => update("homePickupRoundTrip", v)} />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-gris-tinta">Copia USB adicional</h2>
            <label className="block text-sm font-bold text-gris-tinta">
              Precio (€) — vacío = a confirmar
              <input
                type="number"
                value={config.usbExtraPrice ?? ""}
                onChange={(e) =>
                  update("usbExtraPrice", e.target.value === "" ? null : Number(e.target.value))
                }
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 font-normal focus:border-azul-principal focus:outline-none"
              />
            </label>
          </div>
          <div>
            <h2 className="font-bold text-gris-tinta">Plazos</h2>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <NumberField label="Normal (días)" value={config.estimatedDaysNormal} onChange={(v) => update("estimatedDaysNormal", v)} />
              <NumberField label="Alta demanda (días)" value={config.estimatedDaysHighDemand} onChange={(v) => update("estimatedDaysHighDemand", v)} />
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-gris-tinta">
              <input
                type="checkbox"
                checked={config.highDemandMode}
                onChange={(e) => update("highDemandMode", e.target.checked)}
              />
              Activar modo alta demanda ahora
            </label>
          </div>

          <button
            onClick={handleSave}
            className="w-full rounded-full bg-azul-principal px-6 py-3 font-bold text-white hover:bg-azul-noche"
          >
            Guardar cambios
          </button>
          {saved && (
            <p className="text-center text-sm font-semibold text-azul-principal">
              Guardado. Ya se aplica en toda la web.
            </p>
          )}
        </div>

        <div className="h-fit rounded-2xl bg-white p-6">
          <h2 className="font-bold text-gris-tinta">Ejemplo en vivo (15 cintas)</h2>
          <div className="mt-3 space-y-1 text-sm text-gris-tinta/70">
            <div className="flex justify-between">
              <span>Digitalización</span>
              <span>{formatEuros(example.digitization)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{formatEuros(example.shipping)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-black/10 pt-2 font-bold text-gris-tinta">
              <span>Total</span>
              <span>{formatEuros(example.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-sm font-bold text-gris-tinta">
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 font-normal focus:border-azul-principal focus:outline-none"
      />
    </label>
  );
}
