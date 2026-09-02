"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_ON = ["/digitalizar", "/pedido-confirmado", "/pedido"];

export function StickyMobileCta() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname?.startsWith(p))) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 p-3 backdrop-blur md:hidden">
      <Link
        href="/digitalizar"
        className="block rounded-full bg-azul-noche px-6 py-3 text-center font-bold text-white"
      >
        Calcular mi precio
      </Link>
    </div>
  );
}
