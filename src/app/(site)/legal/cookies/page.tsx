import { LegalPage } from "@/components/LegalPage";

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies">
      <h2>Qué cookies usamos</h2>
      <p>
        Este sitio de demostración utiliza almacenamiento local del navegador
        (localStorage) para recordar tu pedido y tus preferencias de
        configuración mientras navegas. No se comparte con terceros.
      </p>
      <h2>Cookies analíticas</h2>
      <p>
        En producción se podrán añadir cookies analíticas o de marketing,
        siempre con el consentimiento previo del usuario.
      </p>
    </LegalPage>
  );
}
