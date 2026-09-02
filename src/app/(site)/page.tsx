import { Photo } from "@/components/Photo";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CalculatorBlock } from "@/components/CalculatorBlock";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faq";
import { UsbMockup } from "@/components/UsbMockup";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const pasos = [
  {
    numero: "1",
    titulo: "Las preparas",
    descripcion: "Dinos cuántas tienes y elige si las llevas a un punto o pasamos a recogerlas.",
  },
  {
    numero: "2",
    titulo: "Las recibimos",
    descripcion: "Las contamos, fotografiamos y te avisamos en cuanto están con nosotros.",
  },
  {
    numero: "3",
    titulo: "Las digitalizamos",
    descripcion: "Las revisamos y convertimos en archivos digitales, una a una.",
  },
  {
    numero: "4",
    titulo: "Vuelven a casa",
    descripcion: "Tus cintas originales y tu memoria USB con los vídeos llegan juntas a tu domicilio.",
  },
];

const formatos = [
  { nombre: "VHS", detalle: "Las grandes. Las que estaban junto al vídeo del salón." },
  { nombre: "VHS-C", detalle: "Más pequeñas, muy habituales en videocámaras familiares." },
  { nombre: "MiniDV", detalle: "Las pequeñas cintas digitales que dominaron muchas videocámaras de los 2000." },
  { nombre: "8 mm", detalle: "Otro clásico de las videocámaras domésticas." },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Vuelvia",
          url: SITE_URL,
          description:
            "Servicio de digitalización de cintas VHS, VHS-C, MiniDV y 8mm con recogida y entrega a domicilio en toda España.",
          areaServed: "ES",
          priceRange: "€€",
        }}
      />
      <Hero />
      <CalculatorBlock />

      {/* Confianza / seguridad — sube justo después del precio */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-azul-noche">
                Sabemos lo que llevas dentro de esa caja.
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
                No son solo cintas. Son tus recuerdos.
              </h2>
              <p className="mt-4 text-gris-tinta/75">
                Algunas llevan años guardadas y puede que no exista otra
                copia. Por eso, cuando llegan, las contamos, fotografiamos y
                dejamos identificadas antes de empezar.
              </p>
              <TrustBadges className="mt-6" />
              <Link
                href="/seguridad"
                className="mt-4 inline-block font-bold text-azul-noche hover:underline"
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

      {/* Resultado: la memoria USB */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
              Tus vídeos, listos para ver donde quieras.
            </h2>
            <p className="mt-4 text-gris-tinta/75">
              Cada cinta se convierte en un archivo de vídeo. Todos juntos en
              una memoria USB que va siempre incluida, sin coste adicional, y
              que puedes conectar a la tele, al ordenador o a donde quieras.
            </p>
            <p className="mt-3 text-sm font-semibold text-gris-tinta/70">
              ¿Quieres otra copia para regalar a un familiar? Puedes añadirla
              al hacer tu pedido.
            </p>
          </div>
          <UsbMockup />
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
          <p className="mt-6 text-center text-sm text-gris-tinta/70">
            Actualmente no digitalizamos formato Beta / Betamax.{" "}
            <Link href="/contacto" className="font-bold text-azul-noche">
              ¿Tienes Beta? Escríbenos.
            </Link>
          </p>
          <div className="mt-6 text-center">
            <Link href="/que-digitalizamos" className="font-bold text-azul-noche hover:underline">
              Ver todos los formatos →
            </Link>
          </div>
        </div>
      </section>

      {/* Bloque emocional */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Hay cosas que merecen volver a verse.
          </h2>
          <p className="mt-4 text-gris-tinta/75">
            Una boda. Un cumpleaños. Un verano que parecía eterno. La voz de
            alguien que echas de menos. A veces todo eso sigue ahí, dentro de
            una cinta que lleva veinte años en un cajón.
          </p>
          <p className="mt-3 font-semibold text-gris-tinta/75">
            Nosotros ponemos la parte técnica. Tú recuperas lo importante.
          </p>
          <p className="mt-4 text-sm text-gris-tinta/70">
            Las cintas envejecen. Los recuerdos no deberían hacerlo con ellas.
          </p>
        </div>
      </section>

      {/* Precio / garantía */}
      <section id="precio" className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Lo sabes antes de enviarnos nada.
          </h2>
          <p className="mt-2 text-gris-tinta/70">
            Elige cuántas cintas tienes y cómo quieres hacérnoslas llegar. Ese
            será tu precio final.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-gris-niebla p-6">
              <p className="text-3xl font-bold text-azul-noche">10 €</p>
              <p className="mt-1 text-sm text-gris-tinta/70">por cinta (1–10)</p>
            </div>
            <div className="rounded-2xl bg-gris-niebla p-6">
              <p className="text-3xl font-bold text-azul-noche">8 €</p>
              <p className="mt-1 text-sm text-gris-tinta/70">por cinta adicional (11+)</p>
            </div>
            <div className="rounded-2xl bg-gris-niebla p-6">
              <p className="text-3xl font-bold text-azul-noche">Incluido</p>
              <p className="mt-1 text-sm text-gris-tinta/70">transporte ida y vuelta</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gris-tinta/70">
            Incluye revisión, digitalización completa, tu memoria USB y
            devolución de tus originales, todo a domicilio.
          </p>
          <div className="mt-6 rounded-2xl bg-azul-suave/50 p-5">
            <p className="font-bold text-gris-tinta">
              Solo pagas por las cintas que conseguimos digitalizar.
            </p>
            <p className="mt-1 text-sm text-gris-tinta/70">
              Si alguna no se puede recuperar, te devolvemos el importe
              correspondiente y, por supuesto, también la cinta.
            </p>
          </div>
          <Link
            href="/precios"
            className="mt-6 inline-block font-bold text-azul-noche hover:underline"
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
            <Link href="/faq" className="font-bold text-azul-noche hover:underline">
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
              className="mt-6 inline-block rounded-full bg-azul-noche px-8 py-4 font-bold text-white transition hover:opacity-90"
            >
              Calcular mi precio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
