const archivos = [
  "01 - Vacaciones 1997.mp4",
  "02 - Cumpleaños Marta.mp4",
  "03 - Navidad 1999.mp4",
  "LEEME.txt",
];

export function UsbMockup() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-black/5 bg-gris-niebla px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-azul-principal text-white">
          🔌
        </span>
        <div>
          <p className="font-bold text-gris-tinta">VUELVIA</p>
          <p className="text-xs text-gris-tinta/50">Tu memoria USB</p>
        </div>
      </div>
      <ul className="divide-y divide-black/5">
        {archivos.map((nombre) => (
          <li key={nombre} className="flex items-center gap-3 px-5 py-3">
            <span className="text-azul-principal">
              {nombre.endsWith(".mp4") ? "▶" : "📄"}
            </span>
            <p className="text-sm font-semibold text-gris-tinta">{nombre}</p>
          </li>
        ))}
      </ul>
      <p className="px-5 pb-4 text-xs text-gris-tinta/40">
        Cada cinta, un archivo. Si tenía un nombre escrito, lo usamos para el archivo.
      </p>
    </div>
  );
}
