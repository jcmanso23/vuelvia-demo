"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/precios", label: "Precios" },
  { href: "/admin/emails", label: "Emails" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gris-niebla">
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Logo className="h-7 w-auto" />
            <span className="rounded-full bg-azul-suave px-3 py-1 text-xs font-bold text-azul-noche">
              Panel interno
            </span>
          </div>
          <Link href="/" className="text-sm font-semibold text-gris-tinta/70 hover:underline">
            ← Volver a la web
          </Link>
        </div>
        <div className="mx-auto flex max-w-6xl gap-6 px-6 text-sm font-semibold">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b-2 py-3 ${
                pathname === l.href
                  ? "border-azul-noche text-azul-noche"
                  : "border-transparent text-gris-tinta/70 hover:text-gris-tinta"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 rounded-lg bg-naranja-luz/15 px-4 py-2.5 text-xs text-gris-tinta/70">
          Panel de demostración: sin autenticación real y con datos guardados
          solo en este navegador. En producción requerirá acceso protegido.
        </div>
        {children}
      </div>
    </div>
  );
}
