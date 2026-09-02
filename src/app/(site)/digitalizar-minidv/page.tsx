import { FormatLandingPage } from "@/components/FormatLandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitalizar MiniDV a memoria USB",
  description:
    "Pasa tus cintas MiniDV a digital con Vuelvia. Precio claro, recogida a domicilio y tus originales de vuelta.",
};

export default function DigitalizarMiniDvPage() {
  return (
    <FormatLandingPage
      h1="Digitaliza tus cintas MiniDV"
      intro="Las pequeñas cintas digitales que llevaban las videocámaras de los años 2000. Aunque ya son digitales, siguen necesitando un reproductor que cada vez es más raro encontrar."
      photo="/images/cintas-vhs-flatlay.webp"
      photoAlt="Cinta MiniDV junto a otros formatos de vídeo"
      parrafos={[
        "El MiniDV dominó las videocámaras familiares durante los años 2000, antes de que las cámaras dejaran de usar cintas por completo. Aunque graban en formato digital, siguen guardadas en una cinta física que necesita un reproductor específico para leerse.",
        "Con el paso de los años, esos reproductores son cada vez más escasos y frágiles. Digitalizar tus cintas MiniDV ahora significa pasar esos vídeos a un archivo que puedas ver sin depender de un aparato concreto.",
        "En Vuelvia revisamos cada cinta MiniDV, la convertimos a un archivo de vídeo y te la devolvemos junto con tu memoria USB, a domicilio.",
      ]}
      faq={[
        {
          question: "Mi MiniDV ya es digital, ¿por qué necesito digitalizarla?",
          answer:
            "Porque sigue estando en una cinta física, que necesita una videocámara o reproductor compatible para verse. Al pasarla a un archivo de vídeo, puedes verla en cualquier dispositivo.",
        },
        {
          question: "¿Cuánto cuesta digitalizar cintas MiniDV?",
          answer:
            "Lo mismo que cualquier otro formato: 10 €/cinta hasta 10 cintas, y 8 € por cada cinta adicional a partir de la 11.",
        },
      ]}
    />
  );
}
