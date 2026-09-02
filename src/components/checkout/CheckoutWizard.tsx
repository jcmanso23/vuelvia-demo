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
      ? `A partir de aquí, cada cinta te cuesta menos: desde la cinta ${config.tier1Max + 1}, las siguientes cuestan ${formatEuros(
          config.tier2PricePerTape
        )} cada una.`
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
    return <p className="text-center text-gris-tinta/70">Cargando...</p>;
  }

  return (
    <div>
      <StepIndicator step={step} />

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl bg-white p-6">
          {step === 1 && (
            <div>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                ¿Cuántas cintas tienes?
              </h2>
              <p className="text-xs text-gris-tinta/70">No hace falta que sean todas del mismo formato.</p>
              <div className="mt-5 flex justify-center">
                <Counter value={tapes} onChange={setTapes} />
              </div>

              <h3 className="mt-8 font-bold text-gris-tinta">¿Cómo quieres hacérnoslas llegar?</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMethod("correos")}
                  aria-pressed={method === "correos"}
                  className={`rounded-2xl border-2 p-4 text-left transition ${
                    method === "correos"
                      ? "border-azul-noche bg-azul-suave/50"
                      : "border-black/10 hover:border-azul-principal/50"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-azul-noche">
                    La opción más económica
                  </p>
                  <p className="mt-1 font-bold text-gris-tinta">Las llevo yo</p>
                  <p className="text-xs text-gris-tinta/70">A un punto de entrega cercano</p>
                  {dropoffTotal !== null && (
                    <p className="text-sm text-gris-tinta/70">{formatEuros(dropoffTotal)} todo incluido</p>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("domicilio")}
                  aria-pressed={method === "domicilio"}
                  className={`rounded-2xl border-2 p-4 text-left transition ${
                    method === "domicilio"
                      ? "border-azul-noche bg-azul-suave/50"
                      : "border-black/10 hover:border-azul-principal/50"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-coral-digital">
                    La opción más cómoda
                  </p>
                  <p className="mt-1 font-bold text-gris-tinta">Venid a recogerlas</p>
                  <p className="text-xs text-gris-tinta/70">Pasamos por tu domicilio</p>
                  {pickupTotal !== null && (
                    <p className="text-sm text-gris-tinta/70">{formatEuros(pickupTotal)} todo incluido</p>
                  )}
                </button>
              </div>

              <p className="mt-6 rounded-lg bg-gris-niebla px-4 py-3 text-xs text-gris-tinta/70">
                Aceptamos VHS, VHS-C, MiniDV y 8&nbsp;mm. Si no sabes cuál
                tienes, no pasa nada — no hace falta saberlo para pedir.
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                ¿Dónde te las devolvemos?
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
              <p className="mt-4 text-xs text-gris-tinta/70">
                La dirección se usa tanto para la recogida (si la elegiste)
                como para devolverte tus cintas originales.
              </p>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handlePay}>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                ¿Quieres algo más?
              </h2>
              <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-black/10 p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-20 shrink-0 overflow-hidden rounded-lg">
                    <Photo
                      src="/images/unboxing-usb-cliente.webp"
                      alt="Copia en memoria USB"
                      width={200}
                      height={200}
                      className="h-16 w-20 object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gris-tinta">Otra copia para compartir</p>
                    <p className="text-xs text-gris-tinta/70">
                      Tu memoria USB ya va incluida. Si quieres otra para un
                      familiar, la enviamos junto con la tuya.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center sm:block sm:shrink-0">
                  <Counter value={usbCopies} onChange={setUsbCopies} min={0} max={10} />
                </div>
              </div>

              <h2 className="mt-8 font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                Todo correcto. Solo falta confirmar.
              </h2>
              <p className="text-xs text-gris-tinta/70">Revisa que esté todo como quieres antes de pagar.</p>
              <div className="mt-4 space-y-1 text-sm text-gris-tinta/70">
                <p>
                  {tapes} {tapes === 1 ? "cinta" : "cintas"} ·{" "}
                  {method === "correos" ? "Las llevo yo" : "Venid a recogerlas"}
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
                <p className="mb-3 text-xs text-gris-tinta/70">
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
                className="mt-6 w-full rounded-full bg-azul-noche px-6 py-3.5 font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? "Procesando…" : `Confirmar pedido · ${formatEuros(pricing.total)}`}
              </button>
              <p className="mt-3 text-center text-xs text-gris-tinta/70">
                Pago único. Sin suscripciones ni cargos posteriores salvo
                que tú autorices expresamente algún cambio.
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
                  className="font-bold text-gris-tinta/70 hover:text-gris-tinta"
                >
                  ← Atrás
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-azul-noche px-6 py-3 font-bold text-white transition hover:opacity-90"
              >
                Continuar
              </button>
            </div>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-4 font-bold text-gris-tinta/70 hover:text-gris-tinta"
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
        className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 font-normal focus:border-azul-noche focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
      />
    </label>
  );
}
