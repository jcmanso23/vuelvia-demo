import { FormatLandingPage } from "@/components/FormatLandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitalizar cintas de 8mm a memoria USB",
  description:
    "Pasa tus cintas de 8mm a digital con Vuelvia. Precio claro, recogida a domicilio y tus originales de vuelta.",
};

export default function Digitalizar8mmPage() {
  return (
    <FormatLandingPage
      h1="Digitaliza tus cintas de 8 mm"
      intro="Otro clásico de las videocámaras domésticas. Si no sabes exactamente qué variante tienes, no te preocupes: no hace falta saberlo para digitalizarla."
      photo="/images/cintas-vhs-flatlay.webp"
      photoAlt="Cinta de 8mm junto a otros formatos de vídeo"
      parrafos={[
        "Las cintas de 8 mm fueron muy habituales en videocámaras domésticas antes y durante la era del MiniDV. Existen varias variantes (Video8, Hi8, Digital8), pero para digitalizarlas no necesitas saber cuál tienes exactamente.",
        "Como con el resto de formatos, el paso del tiempo hace que estas cintas se vuelvan más frágiles y que los equipos para reproducirlas escaseen. Digitalizarlas es la manera más segura de conservar lo que grabaron.",
        "Revisamos cada cinta de 8 mm, la convertimos a un archivo de vídeo y te la devolvemos junto con tu memoria USB, a domicilio.",
      ]}
      faq={[
        {
          question: "No sé si mi cinta es Video8, Hi8 o Digital8, ¿importa?",
          answer:
            "Para el precio no, es el mismo. Si tienes dudas sobre qué variante exacta tienes, escríbenos y te ayudamos a identificarla.",
        },
        {
          question: "¿Cuánto cuesta digitalizar cintas de 8mm?",
          answer:
            "10 €/cinta hasta 10 cintas, y 8 € por cada cinta adicional a partir de la 11, con el transporte incluido en el total.",
        },
      ]}
    />
  );
}
