import { Photo } from "@/components/Photo";
import { CalculatorBlock } from "@/components/CalculatorBlock";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import type { FAQItem } from "@/components/FAQAccordion";

export function FormatLandingPage({
  h1,
  intro,
  parrafos,
  faq,
  photo,
  photoAlt,
}: {
  h1: string;
  intro: string;
  parrafos: string[];
  faq: FAQItem[];
  photo: string;
  photoAlt: string;
}) {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <h1 className="font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
          {h1}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gris-tinta/70">{intro}</p>
      </div>

      <div className="mt-8">
        <CalculatorBlock />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl">
          <Photo src={photo} alt={photoAlt} width={1600} height={1100} className="h-full w-full object-cover" />
        </div>

        <div className="mt-10 space-y-4 text-gris-tinta/75">
          {parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-center font-bold text-gris-tinta">Preguntas frecuentes</h2>
          <div className="mt-4">
            <FAQAccordion items={faq} />
          </div>
        </div>
      </div>
    </div>
  );
}
