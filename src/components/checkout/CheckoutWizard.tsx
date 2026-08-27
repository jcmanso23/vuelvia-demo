"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Counter } from "@/components/Counter";
import { PriceSummary } from "@/components/PriceSummary";
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
  TapeFormat,
} from "@/lib/orders";

const FORMAT_OPTIONS: { value: TapeFormat; label: string }[] = [
  { value: "VHS", label: "VHS" },
  { value: "VHS-C", label: "VHS-C" },
  { value: "MiniDV", label: "MiniDV" },
  { value: "8mm", label: "8 mm" },
  { value: "varios", label: "Tengo varios tipos" },
  { value: "no-lo-se", label: "No lo sé" },
];

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
  const [formats, setFormats] = useState<TapeFormat[]>([]);
  const [usbCopies, setUsbCopies] = useState(0);
  const [inboundMethod, setInboundMethod] = useState<InboundMethod | null>(null);
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [moldChecked, setMoldChecked] = useState(false);
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConfig(loadPricingConfig());
    const paramTapes = Number(searchParams.get("cintas"));
    if (paramTapes > 0) setTapes(paramTapes);
  }, [searchParams]);

  const pricing = useMemo(
    () => (config ? calculateTotal(tapes, usbCopies, config) : null),
    [config, tapes, usbCopies]
  );

  const volumeMessage =
    config && tapes > config.tier1Max
      ? `A partir de la cinta ${config.tier1Max + 1}, cada cinta adicional cuesta solo ${formatEuros(
          config.tier2PricePerTape
        )}.`
      : null;

  function toggleFormat(value: TapeFormat) {
    setFormats((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  }

  function goNext() {
    setError(null);
    if (step === 2 && !inboundMethod) {
      setError("Elige cómo quieres hacernos llegar tus cintas.");
      return;
    }
    if (step === 3) {
      const required = Object.values(customer).every((v) => v.trim().length > 0);
      if (!required) {
        setError("Revisa que todos los campos estén completos.");
        return;
      }
      if (!customer.email.includes("@")) {
        setError("Revisa tu dirección de email.");
        return;
      }
      if (!moldChecked) {
        setError("Confirma que has revisado que tus cintas no tienen moho.");
        return;
      }
    }
    setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!config || !inboundMethod) return;
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
      formats: formats.length > 0 ? formats : ["no-lo-se"],
      usbCopies,
      inboundMethod,
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

              <h3 className="mt-8 font-bold text-gris-tinta">¿Qué tipo de cintas tienes?</h3>
              <p className="text-xs text-gris-tinta/60">
                Esto nos ayuda a prepararnos. No cambia el precio.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FORMAT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleFormat(opt.value)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      formats.includes(opt.value)
                        ? "border-azul-principal bg-azul-suave text-azul-noche"
                        : "border-black/10 text-gris-tinta/70 hover:border-azul-principal"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <h3 className="mt-8 font-bold text-gris-tinta">Copia USB adicional</h3>
              <p className="text-xs text-gris-tinta/60">
                Ideal para regalar o compartir con otro familiar.
                {config.usbExtraPrice === null && " (precio a confirmar con Vuelvia)"}
              </p>
              <div className="mt-3">
                <Counter value={usbCopies} onChange={setUsbCopies} min={0} max={10} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                ¿Cómo quieres hacérnoslas llegar?
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setInboundMethod("correos")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    inboundMethod === "correos"
                      ? "border-azul-principal bg-azul-suave/50"
                      : "border-black/10 hover:border-azul-principal/50"
                  }`}
                >
                  <p className="font-bold text-gris-tinta">Oficina de Correos</p>
                  <p className="mt-1 text-sm text-gris-tinta/70">
                    Lleva tu paquete a una oficina de Correos cuando te venga bien.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setInboundMethod("domicilio")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    inboundMethod === "domicilio"
                      ? "border-azul-principal bg-azul-suave/50"
                      : "border-black/10 hover:border-azul-principal/50"
                  }`}
                >
                  <p className="font-bold text-gris-tinta">Recogida a domicilio</p>
                  <p className="mt-1 text-sm text-gris-tinta/70">
                    Si lo prefieres, recogemos las cintas en tu casa.
                  </p>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
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

              <label className="mt-6 flex items-start gap-3 rounded-xl bg-naranja-luz/15 p-4 text-sm text-gris-tinta/80">
                <input
                  type="checkbox"
                  checked={moldChecked}
                  onChange={(e) => setMoldChecked(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  <strong>Importante:</strong> si alguna cinta tiene manchas
                  blancas, polvo o aspecto algodonoso, podría tener moho. He
                  revisado que mis cintas no presentan moho visible.
                </span>
              </label>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handlePay}>
              <h2 className="font-[family-name:var(--font-baloo)] text-xl font-bold text-gris-tinta">
                Revisar y pagar
              </h2>
              <div className="mt-4 space-y-1 text-sm text-gris-tinta/70">
                <p>
                  {tapes} {tapes === 1 ? "cinta" : "cintas"} ·{" "}
                  {inboundMethod === "correos" ? "Entrega en Correos" : "Recogida a domicilio"}
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
                {submitting ? "Procesando…" : `Pagar ${formatEuros(pricing.total)}`}
              </button>
              <p className="mt-3 text-center text-xs text-gris-tinta/50">
                Pago único · Envío ida y vuelta incluido · Te devolvemos los
                originales · Si una cinta no puede digitalizarse, no te la
                cobramos.
              </p>
            </form>
          )}

          {error && step !== 4 && (
            <p className="mt-4 text-sm font-semibold text-coral-digital">{error}</p>
          )}

          {step < 4 && (
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
        </div>

        <div className="h-fit">
          <PriceSummary
            tapeCount={tapes}
            digitization={pricing.digitization}
            shipping={pricing.shipping}
            usbExtra={pricing.usbExtra}
            usbCopies={usbCopies}
            total={pricing.total}
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
