import { formatEuros } from "@/lib/pricing";

export function PriceSummary({
  tapeCount,
  total,
  usbExtra,
  usbCopies,
  volumeMessage,
}: {
  tapeCount: number;
  total: number;
  usbExtra?: number;
  usbCopies?: number;
  volumeMessage?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <p className="text-sm font-bold text-gris-tinta/60">Este es tu precio final</p>
      <p className="text-3xl font-bold text-azul-principal">{formatEuros(total)}</p>

      <ul className="mt-4 space-y-1.5 text-sm text-gris-tinta/75">
        <li className="flex items-center gap-2">
          <span className="text-azul-principal">✓</span>
          Digitalización de {tapeCount} {tapeCount === 1 ? "cinta" : "cintas"}
        </li>
        <li className="flex items-center gap-2">
          <span className="text-azul-principal">✓</span>
          Envío hasta Vuelvia
        </li>
        <li className="flex items-center gap-2">
          <span className="text-azul-principal">✓</span>
          Tus vídeos en memoria USB
        </li>
        <li className="flex items-center gap-2">
          <span className="text-azul-principal">✓</span>
          Devolución a tu domicilio
        </li>
        {!!usbCopies && usbCopies > 0 && (
          <li className="flex items-center justify-between gap-2 border-t border-black/5 pt-1.5">
            <span>
              <span className="text-azul-principal">✓</span> Copia USB extra × {usbCopies}
            </span>
            <span className="font-semibold text-gris-tinta">
              {usbExtra && usbExtra > 0 ? formatEuros(usbExtra) : "A confirmar"}
            </span>
          </li>
        )}
      </ul>

      {volumeMessage && (
        <p className="mt-3 rounded-lg bg-naranja-luz/15 px-3 py-2 text-xs font-semibold text-gris-tinta">
          {volumeMessage}
        </p>
      )}

      <p className="mt-4 border-t border-black/10 pt-3 text-xs text-gris-tinta/60">
        Pago único, sin sorpresas. Si una cinta no se puede digitalizar, no
        la pagas.
      </p>
    </div>
  );
}
