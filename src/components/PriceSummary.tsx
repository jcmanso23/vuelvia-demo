import { formatEuros } from "@/lib/pricing";

export function PriceSummary({
  tapeCount,
  digitization,
  shipping,
  usbExtra,
  usbCopies,
  total,
  volumeMessage,
}: {
  tapeCount: number;
  digitization: number;
  shipping: number;
  usbExtra: number;
  usbCopies: number;
  total: number;
  volumeMessage?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="space-y-2 text-sm text-gris-tinta/80">
        <div className="flex items-center justify-between">
          <span>
            Digitalización ({tapeCount} {tapeCount === 1 ? "cinta" : "cintas"})
          </span>
          <span className="font-semibold text-gris-tinta">{formatEuros(digitization)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Envío ida y vuelta</span>
          <span className="font-semibold text-gris-tinta">{formatEuros(shipping)}</span>
        </div>
        {usbCopies > 0 && (
          <div className="flex items-center justify-between">
            <span>
              Copia USB adicional × {usbCopies}
            </span>
            <span className="font-semibold text-gris-tinta">
              {usbExtra > 0 ? formatEuros(usbExtra) : "A confirmar"}
            </span>
          </div>
        )}
      </div>
      {volumeMessage && (
        <p className="mt-3 rounded-lg bg-naranja-luz/15 px-3 py-2 text-xs font-semibold text-gris-tinta">
          {volumeMessage}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
        <span className="font-bold text-gris-tinta">Total</span>
        <span className="text-xl font-bold text-azul-principal">{formatEuros(total)}</span>
      </div>
      <p className="mt-2 text-xs text-gris-tinta/60">
        Este es el precio total de tu pedido. Pago único, sin cargos posteriores.
      </p>
    </div>
  );
}
