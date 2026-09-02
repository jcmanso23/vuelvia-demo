const STEPS = ["Tu pedido", "Tus datos", "Extras y pago"];

export function StepIndicator({ step }: { step: number }) {
  return (
    <ol
      aria-label="Progreso del pedido"
      className="flex items-center justify-between gap-2"
    >
      {STEPS.map((label, index) => {
        const num = index + 1;
        const done = num < step;
        const current = num === step;
        return (
          <li
            key={label}
            aria-current={current ? "step" : undefined}
            className="flex flex-1 flex-col items-center text-center"
          >
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                done
                  ? "bg-azul-noche text-white"
                  : current
                    ? "border-2 border-azul-noche text-azul-noche"
                    : "border-2 border-black/10 text-black/60"
              }`}
            >
              {done ? "✓" : num}
            </span>
            <span
              className={`sr-only mt-1 text-xs font-semibold sm:not-sr-only sm:block ${
                done || current ? "text-gris-tinta" : "text-gris-tinta/70"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
