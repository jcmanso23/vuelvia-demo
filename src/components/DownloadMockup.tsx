const videos = [
  { nombre: "Vacaciones 1997", duracion: "23:14" },
  { nombre: "Cumpleaños Marta", duracion: "08:40" },
  { nombre: "Navidad 1999", duracion: "15:02" },
];

export function DownloadMockup() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="border-b border-black/5 bg-gris-niebla px-5 py-4">
        <p className="font-bold text-gris-tinta">Tus recuerdos están listos</p>
      </div>
      <ul className="divide-y divide-black/5">
        {videos.map((v) => (
          <li key={v.nombre} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-azul-suave text-azul-noche">
                ▶
              </span>
              <div>
                <p className="text-sm font-semibold text-gris-tinta">{v.nombre}</p>
                <p className="text-xs text-gris-tinta/50">{v.duracion}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-azul-principal">Descargar</span>
          </li>
        ))}
      </ul>
      <div className="p-4">
        <button
          type="button"
          className="w-full rounded-full bg-azul-principal px-4 py-2.5 text-sm font-bold text-white"
          tabIndex={-1}
        >
          Descargar todo
        </button>
      </div>
    </div>
  );
}
