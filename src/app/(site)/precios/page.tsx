import { CalculatorBlock } from "@/components/CalculatorBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios — Vuelvia",
  description: "10€/cinta hasta 10, 8€ a partir de la cinta 11, transporte incluido en el total.",
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
    <div>
      <div className="mx-auto max-w-4xl px-6 pt-16 text-center">
        <h1 className="font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
          Lo sabes antes de enviarnos nada.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gris-tinta/70">
          Elige cuántas cintas tienes y cómo quieres hacérnoslas llegar. Ese
          será tu precio final.
        </p>
      </div>

      <div className="mt-8">
        <CalculatorBlock />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-azul-suave/50 p-6 text-center">
          <p className="font-bold text-gris-tinta">
            Solo pagas por las cintas que conseguimos digitalizar.
          </p>
          <p className="mt-1 text-sm text-gris-tinta/70">
            Si alguna no se puede recuperar, te devolvemos el importe
            correspondiente y, por supuesto, también la cinta.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6">
          <h2 className="font-bold text-gris-tinta">Incluido en el precio</h2>
          <ul className="mt-3 grid gap-2 text-sm text-gris-tinta/70 sm:grid-cols-2">
            <li>· Revisión de cada cinta</li>
            <li>· Digitalización completa</li>
            <li>· Tu memoria USB con los vídeos</li>
            <li>· Devolución de tus originales, a domicilio</li>
            <li>· Transporte incluido en el total</li>
          </ul>
          <p className="mt-4 text-xs text-gris-tinta/50">
            Extra disponible: otra copia USB adicional (precio a confirmar).
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-center font-bold text-gris-tinta">
            Ejemplos de precio (llevando el paquete a un punto)
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 text-gris-tinta/60">
                  <th className="px-4 py-3 whitespace-nowrap">Cintas</th>
                  <th className="px-4 py-3 whitespace-nowrap">Digitalización</th>
                  <th className="px-4 py-3 whitespace-nowrap">Transporte</th>
                  <th className="px-4 py-3 whitespace-nowrap">Total</th>
                </tr>
              </thead>
              <tbody>
                {ejemplos.map((e) => (
                  <tr key={e.cintas} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-gris-tinta">{e.cintas}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gris-tinta/70">{e.digitalizacion} €</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gris-tinta/70">{e.envio} €</td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-azul-principal">{e.total} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-center text-xs text-gris-tinta/50">
            Si prefieres que recojamos las cintas en tu domicilio, el
            transporte tiene un coste algo mayor — usa la calculadora de
            arriba para ver tu precio exacto.
          </p>
        </div>
      </div>
    </div>
  );
}
