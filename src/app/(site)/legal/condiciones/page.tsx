import { LegalPage } from "@/components/LegalPage";

export default function CondicionesPage() {
  return (
    <LegalPage title="Condiciones de contratación">
      <h2>El servicio</h2>
      <p>
        Vuelvia digitaliza cintas VHS, VHS-C, MiniDV y 8&nbsp;mm. El precio
        depende únicamente del número de cintas: 10 €/cinta hasta 10 cintas,
        8 €/cinta adicional a partir de la undécima, más 12 € de transporte
        ida y vuelta.
      </p>
      <h2>Pago</h2>
      <p>
        El pago es único y se realiza al confirmar el pedido. Incluye
        digitalización y transporte de ida y vuelta.
      </p>
      <h2>Cintas no digitalizables</h2>
      <p>
        Si una cinta no puede digitalizarse, no se cobra y se devuelve el
        importe correspondiente junto con la cinta original.
      </p>
      <h2>Cantidad recibida distinta a la contratada</h2>
      <p>
        Si llegan más o menos cintas de las pagadas, ajustamos el importe
        antes de comenzar el trabajo, cobrando o devolviendo la diferencia.
      </p>
      <h2>Plazos</h2>
      <p>
        El plazo habitual es de aproximadamente 10 días. En pedidos grandes o
        periodos de alta demanda puede ampliarse hasta unos 21 días.
      </p>
      <h2>Cancelaciones</h2>
      <p>
        Política pendiente de definir formalmente antes del lanzamiento en
        producción.
      </p>
    </LegalPage>
  );
}
