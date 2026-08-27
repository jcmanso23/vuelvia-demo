"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const links = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/que-digitalizamos", label: "Qué digitalizamos" },
  { href: "/precios", label: "Precios" },
  { href: "/seguridad", label: "Seguridad" },
  { href: "/faq", label: "Preguntas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCheckout = pathname?.startsWith("/digitalizar");

  if (isCheckout) {
    return (
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Vuelvia — inicio">
            <Logo />
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-semibold text-gris-tinta/60 hover:text-azul-principal"
          >
            Necesito ayuda
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Vuelvia — inicio">
          <Logo />
        </Link>
        <div className="hidden items-center gap-7 text-sm font-semibold text-gris-tinta md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-azul-principal">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Link
            href="/digitalizar"
            className="rounded-full bg-azul-principal px-5 py-2.5 text-sm font-bold text-white transition hover:bg-azul-noche"
          >
            Calcular mi precio
          </Link>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>
      {open && (
        <div className="border-t border-black/5 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-semibold text-gris-tinta">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-azul-principal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/digitalizar"
              onClick={() => setOpen(false)}
              className="rounded-full bg-azul-principal px-5 py-3 text-center font-bold text-white"
            >
              Calcular mi precio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
