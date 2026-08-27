import { LegalPage } from "@/components/LegalPage";

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad">
      <h2>Qué datos tratamos</h2>
      <p>
        Nombre, apellidos, email, teléfono y dirección postal, necesarios para
        gestionar tu pedido y su envío. También tratamos el contenido
        audiovisual de tus cintas digitalizadas.
      </p>
      <h2>Tus vídeos</h2>
      <ul>
        <li>Los usamos exclusivamente para prestarte el servicio.</li>
        <li>No los reutilizamos ni los publicamos.</li>
        <li>No los usamos para entrenar sistemas de inteligencia artificial.</li>
        <li>Conservamos una copia de seguridad durante 7 días tras la entrega, después se elimina.</li>
      </ul>
      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación o eliminación de tus datos
        escribiendo a hola@vuelvia.app.
      </p>
    </LegalPage>
  );
}
