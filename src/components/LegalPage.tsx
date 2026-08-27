export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-[family-name:var(--font-baloo)] text-3xl font-bold text-gris-tinta">
        {title}
      </h1>
      <div className="mt-3 rounded-lg bg-naranja-luz/15 px-4 py-3 text-sm text-gris-tinta/80">
        Documento de ejemplo pendiente de revisión legal antes de su
        publicación en producción. No usar tal cual para operar
        comercialmente.
      </div>
      <div className="prose prose-sm mt-8 max-w-none text-gris-tinta/80 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:font-bold [&_h2]:text-gris-tinta [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
