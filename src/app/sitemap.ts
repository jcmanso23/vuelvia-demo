import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "",
  "como-funciona",
  "que-digitalizamos",
  "precios",
  "seguridad",
  "faq",
  "contacto",
  "digitalizar",
  "pedido",
  "digitalizar-vhs",
  "digitalizar-vhs-c",
  "digitalizar-minidv",
  "digitalizar-8mm",
  "digitalizar-vhs-valladolid",
  "como-pasar-vhs-a-digital",
  "legal/aviso-legal",
  "legal/privacidad",
  "legal/cookies",
  "legal/condiciones",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}/${route}`,
    lastModified: new Date(),
  }));
}
