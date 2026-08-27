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

export function HeroCalculator() {
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
    <section className="bg-gradient-to-b from-azul-suave/60 to-white">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="font-[family-name:var(--font-baloo)] text-4xl font-bold leading-tight text-gris-tinta md:text-5xl">
            Tus recuerdos <span className="text-azul-principal">merecen volver.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-gris-tinta/70">
            Digitalizamos tus cintas para que vuelvas a ver y compartir los
            momentos que llevaban años guardados.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/digitalizar"
              className="rounded-full bg-azul-principal px-6 py-3 font-bold text-white transition hover:bg-azul-noche"
            >
              Digitalizar mis cintas
            </Link>
            <a href="#como-funciona" className="font-bold text-azul-principal hover:text-azul-noche">
              Ver cómo funciona →
            </a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold text-gris-tinta/80">
            <li>· Desde 10 €/cinta</li>
            <li>· Envío ida y vuelta 12 €</li>
            <li>· Te devolvemos tus originales</li>
            <li>· Recibes tus vídeos en USB</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
            ¿Cuántas cintas quieres recuperar?
          </h2>
          <div className="mt-5 flex justify-center">
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
