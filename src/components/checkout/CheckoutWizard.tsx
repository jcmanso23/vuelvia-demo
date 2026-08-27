"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Counter } from "@/components/Counter";
import { PriceSummary } from "@/components/PriceSummary";
import { Photo } from "@/components/Photo";
import { StepIndicator } from "./StepIndicator";
import {
  calculateTotal,
  formatEuros,
  loadPricingConfig,
  PricingConfig,
} from "@/lib/pricing";
import {
  createOrderFromCheckout,
  saveOrder,
  Customer,
  InboundMethod,
} from "@/lib/orders";

const EMPTY_CUSTOMER: Customer = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  province: "",
};

export function CheckoutWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<PricingConfig | null>(null);
  const [tapes, setTapes] = useState(1);
  const [method, setMethod] = useState<InboundMethod>("correos");
  const [usbCopies, setUsbCopies] = useState(0);
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConfig(loadPricingConfig());
    const paramTapes = Number(searchParams.get("cintas"));
    if (paramTapes > 0) setTapes(paramTapes);
    const paramMethod = searchParams.get("metodo");
    if (paramMethod === "correos" || paramMethod === "domicilio") setMethod(paramMethod);
  }, [searchParams]);

  const pricing = useMemo(
    () => (config ? calculateTotal(tapes, method, usbCopies, config) : null),
    [config, tapes, method, usbCopies]
  );
  const dropoffTotal = config ? calculateTotal(tapes, "correos", 0, config).total : null;
  const pickupTotal = config ? calculateTotal(tapes, "domicilio", 0, config).total : null;

  const volumeMessage =
    config && tapes > config.tier1Max
      ? `¡Has desbloqueado la tarifa por volumen! Cada cinta adicional cuesta solo ${formatEuros(
          config.tier2PricePerTape
        )}.`
      : null;

  function goNext() {
    setError(null);
    if (step === 2) {
      const required = Object.values(customer).every((v) => v.trim().length > 0);
      if (!required) {
        setError("Revisa que todos los campos estén completos.");
        return;
      }
      if (!customer.email.includes("@")) {
        setError("Revisa tu dirección de email.");
        return;
      }
    }
    setStep((s) => Math.min(3, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!config) return;
    setSubmitting(true);
    setError(null);

    // Punto de integración real de Stripe:
    // aquí se llamaría a un endpoint backend que cree una Stripe Checkout
    // Session (o Payment Intent) con el importe `pricing.total` y se
    // redirigiría a Stripe. Como esto es una demo sin backend ni claves
    // reales, simulamos el pago localmente.
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const order = createOrderFromCheckout({
      tapeCount: tapes,
      formats: ["no-lo-se"],
      usbCopies,
      inboundMethod: method,
      customer,
      pricingConfig: config,
    });
    saveOrder(order);
    setSubmitting(false);
    router.push(`/pedido-confirmado?code=${order.code}`);
  }

  if (!config || !pricing) {
    return <p className="text-center text-gris-tinta/60">Cargando...</p>;
  }

  return (
    <div>
      <StepIndicator step={step} />

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl bg-white p-6">
          {step === 1 && (
            <div>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                ¿Cuántas cintas quieres digitalizar?
              </h2>
              <div className="mt-5 flex justify-center">
                <Counter value={tapes} onChange={setTapes} />
              </div>

              <h3 className="mt-8 font-bold text-gris-tinta">¿Cómo quieres enviárnoslas?</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMethod("correos")}
                  className={`rounded-2xl border-2 p-4 text-left transition ${
                    method === "correos"
                      ? "border-azul-principal bg-azul-suave/50"
                      : "border-black/10 hover:border-azul-principal/50"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-azul-principal">
                    Más económico
                  </p>
                  <p className="mt-1 font-bold text-gris-tinta">Lo llevo a un punto</p>
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
                      : "border-black/10 hover:border-azul-principal/50"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-coral-digital">
                    Más cómodo
                  </p>
                  <p className="mt-1 font-bold text-gris-tinta">Recogedlo en mi casa</p>
                  {pickupTotal !== null && (
                    <p className="text-sm text-gris-tinta/70">{formatEuros(pickupTotal)} todo incluido</p>
                  )}
                </button>
              </div>

              <p className="mt-6 rounded-lg bg-gris-niebla px-4 py-3 text-xs text-gris-tinta/60">
                Aceptamos VHS, VHS-C, MiniDV y 8&nbsp;mm. Si no sabes cuál
                tienes, no pasa nada — no hace falta saberlo para pedir.
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                Tus datos
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" value={customer.name} onChange={(v) => setCustomer({ ...customer, name: v })} />
                <Field label="Apellidos" value={customer.surname} onChange={(v) => setCustomer({ ...customer, surname: v })} />
                <Field label="Email" type="email" value={customer.email} onChange={(v) => setCustomer({ ...customer, email: v })} />
                <Field label="Teléfono" value={customer.phone} onChange={(v) => setCustomer({ ...customer, phone: v })} />
                <Field label="Dirección" className="sm:col-span-2" value={customer.address} onChange={(v) => setCustomer({ ...customer, address: v })} />
                <Field label="Código postal" value={customer.postalCode} onChange={(v) => setCustomer({ ...customer, postalCode: v })} />
                <Field label="Localidad" value={customer.city} onChange={(v) => setCustomer({ ...customer, city: v })} />
                <Field label="Provincia" value={customer.province} onChange={(v) => setCustomer({ ...customer, province: v })} />
              </div>
              <p className="mt-4 text-xs text-gris-tinta/50">
                La dirección se usa tanto para la recogida (si la elegiste)
                como para devolverte tus cintas originales.
              </p>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handlePay}>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                ¿Quieres también una copia física?
              </h2>
              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-black/10 p-4">
                <div className="w-20 shrink-0 overflow-hidden rounded-lg">
                  <Photo
                    src="/images/unboxing-usb-cliente.webp"
                    alt="Copia en memoria USB"
                    width={200}
                    height={200}
                    className="h-16 w-20 object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gris-tinta">Copia en memoria USB</p>
                  <p className="text-xs text-gris-tinta/60">
                    La enviamos junto con tus cintas originales. Ideal para
                    guardarla también en un soporte físico o regalarla.
                  </p>
                </div>
                <Counter value={usbCopies} onChange={setUsbCopies} min={0} max={10} />
              </div>

              <h2 className="mt-8 font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                Revisar y pagar
              </h2>
              <div className="mt-4 space-y-1 text-sm text-gris-tinta/70">
                <p>
                  {tapes} {tapes === 1 ? "cinta" : "cintas"} ·{" "}
                  {method === "correos" ? "Lo llevo a un punto" : "Recogida en domicilio"}
                </p>
                <p>
                  {customer.name} {customer.surname} · {customer.email}
                </p>
                <p>
                  {customer.address}, {customer.postalCode} {customer.city} ({customer.province})
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-black/10 p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gris-tinta">
                  💳 Pago con tarjeta
                  <span className="rounded-full bg-azul-suave px-2 py-0.5 text-[11px] font-bold text-azul-noche">
                    Modo demostración
                  </span>
                </p>
                <p className="mb-3 text-xs text-gris-tinta/60">
                  Este formulario simula el pago para la demo. En producción
                  se procesará de forma segura a través de Stripe — no se
                  realizará ningún cargo real aquí.
                </p>
                <div className="grid gap-3">
                  <Field label="Nombre en la tarjeta" value={card.name} onChange={(v) => setCard({ ...card, name: v })} />
                  <Field label="Número de tarjeta" value={card.number} placeholder="4242 4242 4242 4242" onChange={(v) => setCard({ ...card, number: v })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Caducidad" value={card.expiry} placeholder="MM/AA" onChange={(v) => setCard({ ...card, expiry: v })} />
                    <Field label="CVC" value={card.cvc} placeholder="123" onChange={(v) => setCard({ ...card, cvc: v })} />
                  </div>
                </div>
              </div>

              {error && <p className="mt-3 text-sm font-semibold text-coral-digital">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-full bg-azul-principal px-6 py-3.5 font-bold text-white transition hover:bg-azul-noche disabled:opacity-60"
              >
                {submitting ? "Procesando…" : `Confirmar pedido · ${formatEuros(pricing.total)}`}
              </button>
              <p className="mt-3 text-center text-xs text-gris-tinta/50">
                Pago único · Transporte incluido · Te devolvemos los
                originales · Si una cinta no puede digitalizarse, no te la
                cobramos.
              </p>
            </form>
          )}

          {error && step !== 3 && (
            <p className="mt-4 text-sm font-semibold text-coral-digital">{error}</p>
          )}

          {step < 3 && (
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="font-bold text-gris-tinta/60 hover:text-gris-tinta"
                >
                  ← Atrás
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-azul-principal px-6 py-3 font-bold text-white transition hover:bg-azul-noche"
              >
                Continuar
              </button>
            </div>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-4 font-bold text-gris-tinta/60 hover:text-gris-tinta"
            >
              ← Atrás
            </button>
          )}
        </div>

        <div className="h-fit">
          <PriceSummary
            tapeCount={tapes}
            total={pricing.total}
            usbExtra={pricing.usbExtra}
            usbCopies={usbCopies}
            volumeMessage={volumeMessage}
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block text-sm font-bold text-gris-tinta ${className}`}>
      {label}
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 font-normal focus:border-azul-principal focus:outline-none"
      />
    </label>
  );
}
