"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Counter } from "./Counter";
import {
  calculateTotal,
  formatEuros,
  loadPricingConfig,
  PricingConfig,
} from "@/lib/pricing";
import type { InboundMethod } from "@/lib/orders";
import { PriceSummary } from "./PriceSummary";

const QUICK_AMOUNTS = [3, 5, 10, 15];

export function CalculatorBlock() {
  const [tapes, setTapes] = useState(5);
  const [method, setMethod] = useState<InboundMethod>("correos");
  const [config, setConfig] = useState<PricingConfig | null>(null);

  useEffect(() => {
    setConfig(loadPricingConfig());
  }, []);

  const pricing = config ? calculateTotal(tapes, method, 0, config) : null;
  const dropoffTotal = config ? calculateTotal(tapes, "correos", 0, config).total : null;
  const pickupTotal = config ? calculateTotal(tapes, "domicilio", 0, config).total : null;

  const volumeMessage =
    config && tapes > config.tier1Max
      ? `A partir de aquí, cada cinta te cuesta menos: desde la cinta ${config.tier1Max + 1}, las siguientes cuestan ${formatEuros(
          config.tier2PricePerTape
        )} cada una.`
      : null;

  return (
    <section id="calculadora" className="border-y border-black/5 bg-white py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-3xl border border-black/5 bg-gris-niebla p-6 md:p-8">
          <h2 className="text-center font-[family-name:var(--font-baloo)] text-2xl font-bold text-gris-tinta">
            ¿Cuántas cintas quieres recuperar?
          </h2>
          <div className="mt-6 flex justify-center">
            <Counter value={tapes} onChange={setTapes} />
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {QUICK_AMOUNTS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setTapes(n)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  tapes === n
                    ? "bg-azul-principal text-white"
                    : "bg-white text-gris-tinta/60 hover:text-azul-principal"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <h3 className="mt-8 text-center font-bold text-gris-tinta">
            ¿Cómo quieres enviárnoslas?
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("correos")}
              className={`rounded-2xl border-2 p-4 text-left transition ${
                method === "correos"
                  ? "border-azul-principal bg-azul-suave/50"
                  : "border-black/10 bg-white hover:border-azul-principal/50"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-azul-principal">
                La opción más económica
              </p>
              <p className="mt-1 font-bold text-gris-tinta">Las llevo yo</p>
              <p className="text-xs text-gris-tinta/50">A un punto de entrega cercano</p>
              {dropoffTotal !== null && (
                <p className="text-sm text-gris-tinta/70">{formatEuros(dropoffTotal)} todo incluido</p>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMethod("domicilio")}
              className={`rounded-2xl border-2 p-4 text-left transition ${
                method === "domicilio"
                  ? "border-azul-principal bg-azul-suave/50"
                  : "border-black/10 bg-white hover:border-azul-principal/50"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-coral-digital">
                La opción más cómoda
              </p>
              <p className="mt-1 font-bold text-gris-tinta">Venid a recogerlas</p>
              <p className="text-xs text-gris-tinta/50">Pasamos por tu domicilio</p>
              {pickupTotal !== null && (
                <p className="text-sm text-gris-tinta/70">{formatEuros(pickupTotal)} todo incluido</p>
              )}
            </button>
          </div>

          {pricing && (
            <div className="mt-6">
              <PriceSummary tapeCount={tapes} total={pricing.total} volumeMessage={volumeMessage} />
            </div>
          )}
          <Link
            href={`/digitalizar?cintas=${tapes}&metodo=${method}`}
            className="mt-5 block rounded-full bg-azul-principal px-6 py-3 text-center font-bold text-white transition hover:bg-azul-noche"
          >
            Continuar con {tapes} {tapes === 1 ? "cinta" : "cintas"}
          </Link>
          <p className="mt-3 text-center text-xs text-gris-tinta/50">
            Cuando estén listos, te enviaremos un enlace para descargar tus
            vídeos. Y tus cintas originales volverán a casa.
          </p>
        </div>
      </div>
    </section>
  );
}
