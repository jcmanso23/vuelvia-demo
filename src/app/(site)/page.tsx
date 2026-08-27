import { Photo } from "@/components/Photo";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CalculatorBlock } from "@/components/CalculatorBlock";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faq";
import { DownloadMockup } from "@/components/DownloadMockup";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const pasos = [
  {
    numero: "1",
    titulo: "Las preparas",
    descripcion: "Eliges cuántas cintas y cómo nos las haces llegar. La web calcula el precio al instante.",
  },
  {
    numero: "2",
    titulo: "Nos llegan",
    descripcion: "Las recibimos, contamos y fotografiamos. Te avisamos en cuanto están con nosotros.",
  },
  {
    numero: "3",
    titulo: "Las digitalizamos",
    descripcion: "Revisamos y convertimos cada cinta a un archivo de vídeo con cuidado.",
  },
  {
    numero: "4",
    titulo: "Descargas y recibes tus originales",
    descripcion: "Te avisamos por email con tu enlace de descarga. Tus cintas vuelven a casa.",
  },
];

const formatos = [
  { nombre: "VHS", detalle: "El formato más habitual en los hogares españoles." },
  { nombre: "VHS-C", detalle: "El formato compacto de las videocámaras familiares." },
  { nombre: "MiniDV", detalle: "Cintas digitales de cámaras de los 2000." },
  { nombre: "8 mm", detalle: "Cintas pequeñas de cámaras de vídeo antiguas." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <CalculatorBlock />

      {/* Confianza / seguridad — sube justo después del precio */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-azul-principal">
                Tus cintas son únicas. Nuestro proceso también.
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
                No son solo cintas. Son tus recuerdos.
              </h2>
              <p className="mt-4 text-gris-tinta/75">
                Sabemos que muchas de estas cintas son copias únicas e
                irremplazables. Por eso las fotografiamos y contamos al
                recibirlas, las identificamos en cada paso, y siempre te
                devolvemos los originales.
              </p>
              <TrustBadges className="mt-6" />
              <Link
                href="/seguridad"
                className="mt-4 inline-block font-bold text-azul-principal hover:text-azul-noche"
              >
                Cómo cuidamos tus recuerdos →
              </Link>
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Photo
                src="/images/recepcion-revision-cinta.webp"
                alt="Un técnico de Vuelvia revisando y registrando una cinta VHS con guantes de protección"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Así funciona
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((paso) => (
              <div key={paso.numero} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-azul-suave text-lg font-bold text-azul-noche">
                  {paso.numero}
                </div>
                <h3 className="mt-4 font-bold text-gris-tinta">{paso.titulo}</h3>
                <p className="mt-2 text-sm text-gris-tinta/70">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultado: la descarga */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
              Tus recuerdos, disponibles desde cualquier dispositivo.
            </h2>
            <p className="mt-4 text-gris-tinta/75">
              En cuanto terminamos de digitalizar tus cintas, recibes un
              enlace privado para ver y descargar tus vídeos, sin esperar a
              que las cintas físicas vuelvan a casa.
            </p>
            <p className="mt-3 text-sm font-semibold text-gris-tinta/60">
              ¿Prefieres además una copia en memoria USB? Puedes añadirla como
              extra al hacer tu pedido.
            </p>
          </div>
          <DownloadMockup />
        </div>
      </section>

      {/* Formatos */}
      <section id="formatos" className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Qué digitalizamos
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formatos.map((f) => (
              <div key={f.nombre} className="rounded-2xl bg-gris-niebla p-6 text-center">
                <div className="mx-auto flex h-14 w-20 items-center justify-center rounded-lg bg-azul-noche font-[family-name:var(--font-baloo)] text-sm font-bold text-white">
                  {f.nombre}
                </div>
                <p className="mt-4 text-sm text-gris-tinta/70">{f.detalle}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gris-tinta/60">
            Actualmente no digitalizamos formato Beta / Betamax.{" "}
            <Link href="/contacto" className="font-bold text-azul-principal">
              ¿Tienes Beta? Escríbenos.
            </Link>
          </p>
          <div className="mt-6 text-center">
            <Link href="/que-digitalizamos" className="font-bold text-azul-principal hover:text-azul-noche">
              Ver todos los formatos →
            </Link>
          </div>
        </div>
      </section>

      {/* Bloque emocional */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Vuelve a ver lo que creías perdido.
          </h2>
          <p className="mt-4 text-gris-tinta/75">
            Una boda, un cumpleaños, la voz de alguien que ya no está. Cada
            cinta guarda algo que merece volver a verse. Las cintas magnéticas
            se deterioran con el tiempo — haz que vuelvan antes de que sea más
            difícil recuperarlas.
          </p>
        </div>
      </section>

      {/* Precio / garantía */}
      <section id="precio" className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Un precio claro desde el principio
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-gris-niebla p-6">
              <p className="text-3xl font-bold text-azul-principal">10 €</p>
              <p className="mt-1 text-sm text-gris-tinta/70">por cinta (1–10)</p>
            </div>
            <div className="rounded-2xl bg-gris-niebla p-6">
              <p className="text-3xl font-bold text-azul-principal">8 €</p>
              <p className="mt-1 text-sm text-gris-tinta/70">por cinta adicional (11+)</p>
            </div>
            <div className="rounded-2xl bg-gris-niebla p-6">
              <p className="text-3xl font-bold text-azul-principal">Incluido</p>
              <p className="mt-1 text-sm text-gris-tinta/70">transporte ida y vuelta</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gris-tinta/60">
            Incluye revisión, digitalización completa, enlace de descarga y
            devolución de tus originales.
          </p>
          <div className="mt-6 rounded-2xl bg-azul-suave/50 p-5">
            <p className="font-bold text-gris-tinta">
              Solo pagas por las cintas que conseguimos digitalizar.
            </p>
            <p className="mt-1 text-sm text-gris-tinta/70">
              Si alguna no puede digitalizarse, no te la cobramos.
            </p>
          </div>
          <Link
            href="/precios"
            className="mt-6 inline-block font-bold text-azul-principal hover:text-azul-noche"
          >
            Ver ejemplos de precio →
          </Link>
        </div>
      </section>

      <TestimonialsSection />

      {/* FAQ */}
      <section className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Preguntas frecuentes
          </h2>
          <div className="mt-8">
            <FAQAccordion items={FAQ_ITEMS.slice(0, 6)} />
          </div>
          <div className="mt-6 text-center">
            <Link href="/faq" className="font-bold text-azul-principal hover:text-azul-noche">
              Ver todas las preguntas →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <Photo
              src="/images/entrega-repartidor-paquete.webp"
              alt="Una clienta recibiendo su paquete de Vuelvia en la entrega a domicilio"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta md:text-4xl">
              Haz que vuelvan.
            </h2>
            <p className="mt-4 text-gris-tinta/75">
              Esas cintas llevan años esperando. Nosotros hacemos que volver a
              verlas sea fácil.
            </p>
            <a
              href="#calculadora"
              className="mt-6 inline-block rounded-full bg-azul-principal px-8 py-4 font-bold text-white transition hover:bg-azul-noche"
            >
              Calcular mi precio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
