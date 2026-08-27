import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Servicio",
    links: [
      { href: "/como-funciona", label: "Cómo funciona" },
      { href: "/que-digitalizamos", label: "Qué digitalizamos" },
      { href: "/precios", label: "Precios" },
      { href: "/seguridad", label: "Seguridad" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/faq", label: "Preguntas frecuentes" },
      { href: "/contacto", label: "Contacto" },
      { href: "/pedido", label: "Seguir mi pedido" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/aviso-legal", label: "Aviso legal" },
      { href: "/legal/privacidad", label: "Privacidad" },
      { href: "/legal/cookies", label: "Cookies" },
      { href: "/legal/condiciones", label: "Condiciones" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-gris-tinta/70">
            Digitalizamos tus cintas de VHS, VHS-C, MiniDV y 8&nbsp;mm con
            cuidado profesional y entrega segura a domicilio.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold text-gris-tinta">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-gris-tinta/70">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-azul-principal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 py-6 text-center text-xs text-gris-tinta/60">
        © {new Date().getFullYear()} Vuelvia. Todos los derechos reservados. ·
        Hecho con cariño en Valladolid.
      </div>
    </footer>
  );
}
