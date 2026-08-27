const STEPS = ["Tu pedido", "Tus datos", "Extras y pago"];

export function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="flex items-center justify-between gap-2">
      {STEPS.map((label, index) => {
        const num = index + 1;
        const done = num < step;
        const current = num === step;
        return (
          <li key={label} className="flex flex-1 flex-col items-center text-center">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                done
                  ? "bg-azul-principal text-white"
                  : current
                    ? "border-2 border-azul-principal text-azul-principal"
                    : "border-2 border-black/10 text-black/30"
              }`}
            >
              {done ? "✓" : num}
            </span>
            <span
              className={`mt-1 hidden text-xs font-semibold sm:block ${
                done || current ? "text-gris-tinta" : "text-gris-tinta/40"
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
