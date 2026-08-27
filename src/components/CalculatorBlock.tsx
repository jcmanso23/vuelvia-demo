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
import { PriceSummary } from "./PriceSummary";

export function CalculatorBlock() {
  const [tapes, setTapes] = useState(5);
  const [config, setConfig] = useState<PricingConfig | null>(null);

  useEffect(() => {
    setConfig(loadPricingConfig());
  }, []);

  const pricing = config ? calculateTotal(tapes, 0, config) : null;
  const volumeMessage =
    config && tapes > config.tier1Max
      ? `A partir de la cinta ${config.tier1Max + 1}, cada cinta adicional cuesta solo ${formatEuros(
          config.tier2PricePerTape
        )}.`
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
          {pricing && (
            <div className="mt-6">
              <PriceSummary
                tapeCount={tapes}
                digitization={pricing.digitization}
                shipping={pricing.shipping}
                usbExtra={0}
                usbCopies={0}
                total={pricing.total}
                volumeMessage={volumeMessage}
              />
            </div>
          )}
          <Link
            href={`/digitalizar?cintas=${tapes}`}
            className="mt-5 block rounded-full bg-azul-principal px-6 py-3 text-center font-bold text-white transition hover:bg-azul-noche"
          >
            Continuar con {tapes} {tapes === 1 ? "cinta" : "cintas"}
          </Link>
        </div>
      </div>
    </section>
  );
}
