// Nota: las cifras y testimonios de este bloque son de ejemplo, para poder
// visualizar el diseño de la sección. Antes de publicar en producción deben
// sustituirse por datos reales verificables (número de cintas, opiniones con
// consentimiento del cliente, valoraciones reales de Google/Facebook, etc.).
// No presentar como reseñas genuinas mientras sean de ejemplo.

const testimonios = [
  {
    texto:
      "Pude volver a ver los vídeos de la boda de mis padres, de hace más de 25 años. No sabía ni que seguían siendo legibles.",
    autor: "Ejemplo — cliente ilustrativo",
  },
  {
    texto:
      "Tenía miedo de que se perdieran las cintas por el camino, pero pude seguir todo el proceso paso a paso.",
    autor: "Ejemplo — cliente ilustrativo",
  },
  {
    texto:
      "Encargué la digitalización de una caja entera de cintas familiares. Todo llegó de vuelta perfecto, con los vídeos ya listos.",
    autor: "Ejemplo — cliente ilustrativo",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-azul-principal">
            Experiencia
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            15 años cuidando recuerdos familiares
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gris-tinta/70">
            Miles de cintas VHS, VHS-C, MiniDV y 8&nbsp;mm han pasado por
            nuestras manos en los últimos 8 años.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="rounded-2xl bg-azul-suave/40 px-8 py-5 text-center">
            <p className="font-[family-name:var(--font-baloo)] text-4xl font-bold text-azul-noche">
              +32.000
            </p>
            <p className="text-sm font-semibold text-gris-tinta/70">
              cintas digitalizadas en los últimos 8 años
            </p>
            <p className="mt-1 text-[11px] text-gris-tinta/40">
              Cifra estimada de ejemplo — pendiente de confirmar con datos reales antes de publicar en producción.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonios.map((t) => (
            <div key={t.texto} className="rounded-2xl bg-white p-5">
              <p className="text-sm text-gris-tinta/75">&ldquo;{t.texto}&rdquo;</p>
              <p className="mt-3 text-xs font-bold text-gris-tinta/40">{t.autor}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-gris-tinta/40">
          Testimonios de ejemplo para ilustrar el diseño — se sustituirán por
          opiniones reales y verificadas antes del lanzamiento.
        </p>
      </div>
    </section>
  );
}
