import Link from "next/link";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 p-3 backdrop-blur md:hidden">
      <Link
        href="/digitalizar"
        className="block rounded-full bg-azul-principal px-6 py-3 text-center font-bold text-white"
      >
        Digitalizar mis cintas
      </Link>
    </div>
  );
}
