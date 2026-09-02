import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faq";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Resolvemos las dudas más habituales sobre precio, formatos, plazos y envíos.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Preguntas frecuentes
      </h1>
      <div className="mt-10">
        <FAQAccordion items={FAQ_ITEMS} />
      </div>
      <div className="mt-10 rounded-2xl bg-white p-6 text-center">
        <p className="font-bold text-gris-tinta">¿No encuentras tu respuesta?</p>
        <Link href="/contacto" className="mt-2 inline-block font-bold text-azul-noche hover:underline">
          Contacta con nosotros →
        </Link>
      </div>
    </div>
  );
}
