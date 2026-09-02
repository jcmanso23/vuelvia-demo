import { Suspense } from "react";
import { CheckoutWizard } from "@/components/checkout/CheckoutWizard";

export default function DigitalizarPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
        Vamos paso a paso.
      </h1>
      <p className="mx-auto mt-2 max-w-md text-center text-sm text-gris-tinta/70">
        3 pasos, un pago único. Sin necesidad de crear una cuenta.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-center text-gris-tinta/70">Cargando…</p>}>
          <CheckoutWizard />
        </Suspense>
      </div>
    </div>
  );
}
