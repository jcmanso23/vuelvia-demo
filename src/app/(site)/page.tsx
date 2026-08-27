import Image from "next/image";
import { assetPath } from "@/lib/asset";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CalculatorBlock } from "@/components/CalculatorBlock";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faq";

const pasos = [
  {
    numero: "1",
    titulo: "Cuéntanos cuántas tienes",
    descripcion: "Indícanos el número de cintas y la web calcula el precio al instante.",
  },
  {
    numero: "2",
    titulo: "Envíanoslas",
    descripcion: "Desde una oficina de Correos, o con recogida a domicilio si lo prefieres.",
  },
  {
    numero: "3",
    titulo: "Nosotros las digitalizamos",
    descripcion: "Las revisamos, registramos con cuidado y convertimos a MP4.",
  },
  {
    numero: "4",
    titulo: "Vuelven a casa",
    descripcion: "Recibes tus cintas originales + memoria USB en tu domicilio.",
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

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Así funciona
          </h2>
          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <ol className="space-y-6">
              {pasos.map((paso) => (
                <li key={paso.numero} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azul-suave font-bold text-azul-noche">
                    {paso.numero}
                  </span>
                  <div>
                    <h3 className="font-bold text-gris-tinta">{paso.titulo}</h3>
                    <p className="mt-1 text-sm text-gris-tinta/70">{paso.descripcion}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={assetPath("/images/proceso-cinta-a-usb.webp")}
                alt="El proceso de Vuelvia: de la cinta VHS a la memoria USB, pasando por el embalaje y envío"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-azul-principal">
                Más de 15 años recuperando recuerdos
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
                No son solo cintas. Son tus recuerdos.
              </h2>
              <p className="mt-4 text-gris-tinta/75">
                Sabemos que muchas de estas cintas son copias únicas e
                irremplazables. Por eso cuidamos cada paso: contamos,
                revisamos y fotografiamos tu material al recibirlo, y te
                mantenemos informado en todo momento.
              </p>
              <TrustBadges className="mt-6" />
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={assetPath("/images/recepcion-revision-cinta.webp")}
                alt="Un técnico de Vuelvia revisando y registrando una cinta VHS con guantes de protección"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formatos */}
      <section id="formatos" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Qué digitalizamos
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formatos.map((f) => (
              <div key={f.nombre} className="rounded-2xl bg-white p-6 text-center">
                <div className="mx-auto flex h-14 w-20 items-center justify-center rounded-lg bg-azul-noche font-[family-name:var(--font-baloo)] text-sm font-bold text-white">
                  {f.nombre}
                </div>
                <p className="mt-4 text-sm text-gris-tinta/70">{f.detalle}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gris-tinta/60">
            Actualmente no digitalizamos formato Beta / Betamax.
          </p>
          <div className="mt-6 text-center">
            <Link href="/que-digitalizamos" className="font-bold text-azul-principal hover:text-azul-noche">
              Ver todos los formatos →
            </Link>
          </div>
        </div>
      </section>

      {/* Bloque emocional */}
      <section className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-3xl md:order-1">
            <Image
              src={assetPath("/images/unboxing-usb-cliente.webp")}
              alt="Una clienta sonriendo mientras saca su memoria USB Vuelvia de la caja recibida"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
              Vuelve a ver lo que creías perdido.
            </h2>
            <p className="mt-4 text-gris-tinta/75">
              Una boda, un cumpleaños, la voz de alguien que ya no está. Cada
              cinta guarda algo que merece volver a verse. Nosotros nos
              encargamos de que llegue sano y salvo, en un formato que puedas
              ver hoy y compartir con quien quieras.
            </p>
          </div>
        </div>
      </section>

      {/* Precio */}
      <section id="precio" className="py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Un precio claro desde el principio
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6">
              <p className="text-3xl font-bold text-azul-principal">10 €</p>
              <p className="mt-1 text-sm text-gris-tinta/70">por cinta (1–10)</p>
            </div>
            <div className="rounded-2xl bg-white p-6">
              <p className="text-3xl font-bold text-azul-principal">8 €</p>
              <p className="mt-1 text-sm text-gris-tinta/70">por cinta adicional (11+)</p>
            </div>
            <div className="rounded-2xl bg-white p-6">
              <p className="text-3xl font-bold text-azul-principal">12 €</p>
              <p className="mt-1 text-sm text-gris-tinta/70">envío ida y vuelta</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gris-tinta/60">
            Incluye revisión, digitalización completa, archivos MP4, memoria
            USB y devolución de tus originales.
          </p>
          <Link
            href="/precios"
            className="mt-6 inline-block font-bold text-azul-principal hover:text-azul-noche"
          >
            Ver ejemplos de precio →
          </Link>
        </div>
      </section>

      {/* Seguridad */}
      <section className="border-y border-black/5 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
            Sabemos que no son solo cintas.
          </h2>
          <div className="mx-auto mt-4 max-w-xl">
            <p className="text-gris-tinta/75">
              Muchas son copias únicas de recuerdos familiares. Por eso
              queremos que sepas qué ocurre con ellas en cada momento: desde
              que las envías hasta que vuelven a tu casa.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-sm overflow-hidden rounded-3xl">
            <Image
              src={assetPath("/images/cintas-vhs-flatlay.webp")}
              alt="Distintos formatos de cintas: VHS, VHS-C, MiniDV y 8mm"
              width={1200}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <Link
            href="/seguridad"
            className="mt-6 inline-block font-bold text-azul-principal hover:text-azul-noche"
          >
            Cómo cuidamos tus recuerdos →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
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
      <section className="border-t border-black/5 bg-white py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={assetPath("/images/entrega-repartidor-paquete.webp")}
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
            <Link
              href="/digitalizar"
              className="mt-6 inline-block rounded-full bg-azul-principal px-8 py-4 font-bold text-white transition hover:bg-azul-noche"
            >
              Digitalizar mis cintas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
