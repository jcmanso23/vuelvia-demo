import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo pasar tus cintas VHS a digital",
  description:
    "Guía sencilla para pasar tus cintas VHS, VHS-C, MiniDV y 8mm a digital: qué opciones tienes y cómo funciona el proceso con Vuelvia.",
};

export default function ComoPasarVhsADigitalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Cómo pasar tus cintas VHS a digital
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-gris-tinta/70">
        Si tienes cintas guardadas y no sabes por dónde empezar, esta guía te
        cuenta las opciones que existen y cómo funciona digitalizarlas con
        Vuelvia.
      </p>

      <div className="mt-12 space-y-8">
        <div className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-gris-tinta">1. Identifica qué tipo de cinta tienes</h2>
          <p className="mt-2 text-sm text-gris-tinta/70">
            No hace falta que lo sepas con precisión. Aceptamos VHS, VHS-C,
            MiniDV y 8&nbsp;mm, y el precio es el mismo para todos. Si no
            estás seguro, puedes marcarlo como &ldquo;No lo sé&rdquo; al hacer
            tu pedido.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-gris-tinta">2. Decide si quieres hacerlo tú mismo o encargarlo</h2>
          <p className="mt-2 text-sm text-gris-tinta/70">
            Existen capturadoras USB para hacerlo en casa, pero requieren un
            reproductor compatible, tiempo y cierto conocimiento técnico. Si
            prefieres no complicarte, un servicio como Vuelvia se encarga de
            todo el proceso por ti.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-gris-tinta">3. Envía tus cintas con seguimiento</h2>
          <p className="mt-2 text-sm text-gris-tinta/70">
            Con Vuelvia eliges cuántas cintas tienes y cómo nos las haces
            llegar. Todo el trayecto, de ida y de vuelta, se puede seguir
            desde tu pedido.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-gris-tinta">4. Recibe tus vídeos y tus originales</h2>
          <p className="mt-2 text-sm text-gris-tinta/70">
            Cada cinta se convierte en un archivo de vídeo. Te devolvemos tus
            cintas originales junto con una memoria USB con todos tus vídeos,
            a domicilio.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/#calculadora"
          className="inline-block rounded-full bg-azul-noche px-8 py-4 font-bold text-white transition hover:opacity-90"
        >
          Calcular mi precio
        </a>
        <p className="mt-3 text-sm text-gris-tinta/70">
          o{" "}
          <Link href="/como-funciona" className="font-bold text-azul-noche">
            ver cómo funciona paso a paso
          </Link>
        </p>
      </div>
    </div>
  );
}
