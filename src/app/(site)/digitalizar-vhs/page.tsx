import { FormatLandingPage } from "@/components/FormatLandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitalizar VHS a memoria USB",
  description:
    "Pasa tus cintas VHS a digital con Vuelvia. Recogida y entrega a domicilio, precio claro y tus originales de vuelta.",
};

export default function DigitalizarVhsPage() {
  return (
    <FormatLandingPage
      h1="Digitaliza tus cintas VHS"
      intro="Esas cintas grandes que estaban junto al televisor del salón. Las convertimos a vídeo digital sin que tengas que preocuparte de nada."
      photo="/images/cintas-vhs-flatlay.webp"
      photoAlt="Cintas VHS listas para digitalizar"
      parrafos={[
        "El VHS fue el formato de vídeo doméstico más extendido en España durante los años 80, 90 y 2000. Si tienes una cinta grande de plástico negro guardada en un cajón, es casi seguro que es esta.",
        "Con el tiempo, la cinta magnética que hay dentro se deteriora, y cada vez es más difícil encontrar un reproductor VHS que funcione. Digitalizarla ahora es la forma más sencilla de asegurarte de que esos vídeos se puedan volver a ver.",
        "En Vuelvia revisamos cada cinta, la convertimos a un archivo de vídeo y te la devolvemos junto con una memoria USB con todos tus vídeos, siempre a domicilio.",
      ]}
      faq={[
        {
          question: "¿Cuánto cuesta digitalizar una cinta VHS?",
          answer:
            "10 € por cinta hasta 10 cintas, y 8 € por cada cinta adicional a partir de la 11. El transporte va incluido en el precio final que ves antes de pagar.",
        },
        {
          question: "¿Necesito saber si mi cinta es VHS o VHS-C?",
          answer:
            "No hace falta. El precio es el mismo para todos los formatos que aceptamos, así que puedes enviarla sin identificarla si no estás seguro.",
        },
        {
          question: "¿Me devolvéis la cinta original?",
          answer: "Siempre. Tu cinta VHS vuelve a tu domicilio junto con tu memoria USB.",
        },
      ]}
    />
  );
}
