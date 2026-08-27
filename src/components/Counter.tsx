export function Counter({
  value,
  onChange,
  min = 1,
  max = 200,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-black/10 bg-white px-3 py-2">
      <button
        type="button"
        aria-label="Quitar una cinta"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-azul-suave text-lg font-bold text-azul-noche disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        −
      </button>
      <span className="w-12 text-center text-2xl font-bold text-gris-tinta">{value}</span>
      <button
        type="button"
        aria-label="Añadir una cinta"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-azul-suave text-lg font-bold text-azul-noche disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
