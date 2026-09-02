import { CalculatorBlock } from "@/components/CalculatorBlock";
import { TrustBadges } from "@/components/TrustBadges";
import { Photo } from "@/components/Photo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitalizar VHS en Valladolid",
  description:
    "Vuelvia nace en Valladolid y digitaliza cintas VHS, VHS-C, MiniDV y 8mm para toda España, con recogida y entrega a domicilio.",
};

export default function DigitalizarVallaidolidPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <h1 className="font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
          Digitalizar VHS en Valladolid
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gris-tinta/70">
          Vuelvia nace en Valladolid, y desde aquí digitalizamos cintas de
          familias de toda España. No importa dónde vivas: recogemos tus
          cintas y te las devolvemos a domicilio.
        </p>
      </div>

      <div className="mt-8">
        <CalculatorBlock />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl">
          <Photo
            src="/images/recepcion-revision-cinta.webp"
            alt="Un técnico de Vuelvia en Valladolid revisando una cinta VHS"
            width={1600}
            height={1100}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 space-y-4 text-gris-tinta/75">
          <p>
            No estás enviando tus recuerdos a una plataforma anónima. Vuelvia
            es un equipo con años de experiencia digitalizando cintas
            familiares, con sede en Valladolid.
          </p>
          <p>
            Ya vivas en Valladolid o en cualquier otro punto de España, el
            proceso es el mismo: eliges cuántas cintas tienes, decides si las
            llevas a un punto de entrega o pasamos a recogerlas, y nosotros
            nos encargamos del resto.
          </p>
        </div>

        <TrustBadges className="mt-10" />
      </div>
    </div>
  );
}
