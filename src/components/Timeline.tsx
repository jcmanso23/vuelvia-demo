import { STATUS_LABELS, STATUS_ORDER, PublicStatus } from "@/lib/orders";

export function Timeline({ status }: { status: PublicStatus }) {
  const currentIndex = STATUS_ORDER.indexOf(status);

  return (
    <ol className="space-y-0">
      {STATUS_ORDER.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        const isLast = index === STATUS_ORDER.length - 1;
        return (
          <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                className={`absolute left-[15px] top-8 h-full w-0.5 ${
                  done ? "bg-azul-noche" : "bg-black/10"
                }`}
                aria-hidden
              />
            )}
            <span
              className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                done
                  ? "border-azul-noche bg-azul-noche text-white"
                  : current
                    ? "border-azul-noche bg-white text-azul-noche"
                    : "border-black/15 bg-white text-black/60"
              }`}
            >
              {done ? "✓" : index + 1}
            </span>
            <div className="pt-0.5">
              <p
                className={`font-bold ${
                  done || current ? "text-gris-tinta" : "text-gris-tinta/70"
                }`}
              >
                {STATUS_LABELS[step]}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
