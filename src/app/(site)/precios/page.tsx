import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios — Vuelvia",
  description: "10€/cinta hasta 10, 8€ a partir de la cinta 11, transporte 12€ ida y vuelta.",
};

const ejemplos = [
  { cintas: 1, digitalizacion: 10, envio: 12, total: 22 },
  { cintas: 5, digitalizacion: 50, envio: 12, total: 62 },
  { cintas: 10, digitalizacion: 100, envio: 12, total: 112 },
  { cintas: 15, digitalizacion: 140, envio: 12, total: 152 },
  { cintas: 20, digitalizacion: 180, envio: 12, total: 192 },
];

export default function PreciosPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Un precio claro desde el principio
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-gris-tinta/70">
        El precio depende únicamente del número de cintas. No depende de la
        duración, el formato ni el contenido.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 text-center">
          <p className="text-sm font-bold text-gris-tinta/60">1–10 cintas</p>
          <p className="mt-2 text-3xl font-bold text-azul-principal">10 €</p>
          <p className="text-sm text-gris-tinta/70">por cinta</p>
        </div>
        <div className="rounded-2xl bg-white p-6 text-center">
          <p className="text-sm font-bold text-gris-tinta/60">A partir de la 11.ª</p>
          <p className="mt-2 text-3xl font-bold text-azul-principal">8 €</p>
          <p className="text-sm text-gris-tinta/70">por cinta adicional</p>
        </div>
        <div className="rounded-2xl bg-white p-6 text-center">
          <p className="text-sm font-bold text-gris-tinta/60">Transporte</p>
          <p className="mt-2 text-3xl font-bold text-azul-principal">12 €</p>
          <p className="text-sm text-gris-tinta/70">ida y vuelta, una vez</p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-white p-6">
        <h2 className="font-bold text-gris-tinta">Incluido en el precio</h2>
        <ul className="mt-3 grid gap-2 text-sm text-gris-tinta/70 sm:grid-cols-2">
          <li>· Revisión de cada cinta</li>
          <li>· Digitalización completa</li>
          <li>· Archivos en MP4</li>
          <li>· Memoria USB</li>
          <li>· Devolución de tus originales</li>
          <li>· Transporte ida y vuelta</li>
        </ul>
        <p className="mt-4 text-xs text-gris-tinta/50">
          Extra disponible: copia USB adicional (precio a confirmar).
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-center font-bold text-gris-tinta">Ejemplos de precio</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-gris-tinta/60">
                <th className="px-4 py-3">Cintas</th>
                <th className="px-4 py-3">Digitalización</th>
                <th className="px-4 py-3">Envío</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {ejemplos.map((e) => (
                <tr key={e.cintas} className="border-b border-black/5 last:border-0">
                  <td className="px-4 py-3 font-bold text-gris-tinta">{e.cintas}</td>
                  <td className="px-4 py-3 text-gris-tinta/70">{e.digitalizacion} €</td>
                  <td className="px-4 py-3 text-gris-tinta/70">{e.envio} €</td>
                  <td className="px-4 py-3 font-bold text-azul-principal">{e.total} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-azul-suave/50 p-6 text-center">
        <p className="font-bold text-gris-tinta">
          Si una cinta no puede digitalizarse, no te la cobramos.
        </p>
        <p className="mt-1 text-sm text-gris-tinta/70">
          Revisamos cada cinta. Si finalmente no puede digitalizarse, te
          devolvemos el importe correspondiente y recibes igualmente tu cinta
          original.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/digitalizar"
          className="inline-block rounded-full bg-azul-principal px-8 py-4 font-bold text-white transition hover:bg-azul-noche"
        >
          Calcular mi precio y pedir
        </Link>
      </div>
    </div>
  );
}
