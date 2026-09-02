import { FormatLandingPage } from "@/components/FormatLandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitalizar VHS-C a memoria USB",
  description:
    "Pasa tus cintas VHS-C de videocámara a digital con Vuelvia. Precio claro, recogida a domicilio y tus originales de vuelta.",
};

export default function DigitalizarVhsCPage() {
  return (
    <FormatLandingPage
      h1="Digitaliza tus cintas VHS-C"
      intro="El formato compacto que llevaban las videocámaras familiares. Más pequeño que un VHS normal, pero con los mismos recuerdos dentro."
      photo="/images/cintas-vhs-flatlay.webp"
      photoAlt="Cinta VHS-C junto a otros formatos de vídeo"
      parrafos={[
        "El VHS-C fue el formato preferido para videocámaras domésticas entre finales de los 80 y los 90. Es como un VHS en miniatura, pensado para cámaras portátiles que las familias llevaban a cumpleaños, bodas y vacaciones.",
        "Al ser un formato menos común hoy en día, encontrar un reproductor compatible es cada vez más difícil. Nosotros contamos con los equipos necesarios para leer estas cintas y convertirlas a vídeo digital.",
        "El proceso es igual que con cualquier otro formato: revisamos la cinta, la digitalizamos completa y te devolvemos el original junto con tu memoria USB, a domicilio.",
      ]}
      faq={[
        {
          question: "¿El VHS-C cuesta lo mismo que digitalizar un VHS normal?",
          answer:
            "Sí. El precio depende solo del número de cintas, no del formato: 10 €/cinta hasta 10, y 8 € a partir de la 11.",
        },
        {
          question: "Mi cinta VHS-C es muy pequeña, ¿se puede perder?",
          answer:
            "La identificamos y registramos en cuanto llega, igual que el resto de cintas de tu pedido, para que quede vinculada a tu envío en todo momento.",
        },
      ]}
    />
  );
}
