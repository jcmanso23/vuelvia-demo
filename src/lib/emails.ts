// Plantillas de emails transaccionales de Vuelvia.
//
// Son funciones puras: reciben los datos del pedido y devuelven
// { subject, html, text }, listas para pasar a cualquier proveedor de
// envío (Resend, Postmark, SES...) desde el backend real. No dependen de
// ningún proveedor concreto todavía.

type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

const BRAND_BLUE = "#0C3C78";
const BRAND_LIGHT = "#DDF4FF";
const INK = "#1F2A37";

function baseLayout(preheader: string, bodyHtml: string, ctaHtml = ""): string {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#F4F7FB;font-family:Arial,Helvetica,sans-serif;color:${INK};">
    <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FB;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:24px 32px;border-bottom:1px solid #eee;">
                <span style="font-size:20px;font-weight:bold;color:${BRAND_BLUE};">Vuelvia</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
                ${ctaHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:${BRAND_LIGHT};font-size:12px;color:${INK};">
                ¿Necesitas ayuda? Escríbenos respondiendo a este correo.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function cta(label: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
    <tr><td style="border-radius:999px;background:${BRAND_BLUE};">
      <a href="${url}" style="display:inline-block;padding:12px 24px;color:#ffffff;text-decoration:none;font-weight:bold;border-radius:999px;">${label}</a>
    </td></tr>
  </table>`;
}

export function pedidoConfirmadoEmail(data: {
  orderCode: string;
  customerName: string;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "Ya puedes enviarnos tus cintas";
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Ahora, a por esas cintas.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0 0 12px;">Tu pedido <strong>${data.orderCode}</strong> está confirmado. Ya puedes preparar la caja y hacérnosla llegar.</p>
    <p style="margin:0;">Te explicamos cómo prepararlas paso a paso en tu página de pedido.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver cómo prepararlas", data.trackingUrl)),
    text: `Ahora, a por esas cintas.\n\nHola ${data.customerName}, tu pedido ${data.orderCode} está confirmado. Ya puedes preparar la caja y hacérnosla llegar.\n\nVer instrucciones: ${data.trackingUrl}`,
  };
}

export function cintasRecibidasEmail(data: {
  orderCode: string;
  customerName: string;
  tapeCount: number;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "Ya tenemos tus cintas";
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Han llegado.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0;">Hemos recibido ${data.tapeCount} ${data.tapeCount === 1 ? "cinta" : "cintas"} de tu pedido <strong>${data.orderCode}</strong> y ya están identificadas. Ahora empezamos a revisarlas.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver mi pedido", data.trackingUrl)),
    text: `Han llegado.\n\nHola ${data.customerName}, hemos recibido ${data.tapeCount} cintas de tu pedido ${data.orderCode} y ya están identificadas.\n\nVer pedido: ${data.trackingUrl}`,
  };
}

export function cantidadDistintaEmail(data: {
  orderCode: string;
  customerName: string;
  esperadas: number;
  recibidas: number;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "Hemos recibido una cantidad diferente";
  const diferencia = data.recibidas - data.esperadas;
  const explicacion =
    diferencia > 0
      ? `Nos llegaron ${data.recibidas}, así que te cobraremos la diferencia antes de empezar.`
      : `Nos llegaron ${data.recibidas}, así que te devolveremos la diferencia correspondiente.`;
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Contemos esto juntos.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0 0 12px;">En tu pedido <strong>${data.orderCode}</strong> esperábamos ${data.esperadas} ${data.esperadas === 1 ? "cinta" : "cintas"}. ${explicacion}</p>
    <p style="margin:0;">No empezaremos a digitalizar hasta que quede ajustado. Si tienes dudas, escríbenos.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver mi pedido", data.trackingUrl)),
    text: `Contemos esto juntos.\n\nHola ${data.customerName}, en tu pedido ${data.orderCode} esperábamos ${data.esperadas} cintas y nos llegaron ${data.recibidas}. ${explicacion}\n\nVer pedido: ${data.trackingUrl}`,
  };
}

export function digitalizandoEmail(data: {
  orderCode: string;
  customerName: string;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "Estamos haciendo que vuelvan";
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Ya estamos con ellas.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0;">Tus cintas del pedido <strong>${data.orderCode}</strong> están pasando a digital ahora mismo.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver mi pedido", data.trackingUrl)),
    text: `Ya estamos con ellas.\n\nHola ${data.customerName}, tus cintas del pedido ${data.orderCode} están pasando a digital ahora mismo.\n\nVer pedido: ${data.trackingUrl}`,
  };
}

export function noDigitalizableEmail(data: {
  orderCode: string;
  customerName: string;
  tapeLabel: string;
  refundAmount: string;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "No hemos podido digitalizar una de tus cintas";
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Una noticia agridulce.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0 0 12px;">Hemos intentado trabajar con la cinta &ldquo;${data.tapeLabel}&rdquo; de tu pedido <strong>${data.orderCode}</strong>, pero no hemos podido obtener una digitalización válida.</p>
    <p style="margin:0;">No te la cobramos: te devolvemos ${data.refundAmount}, y la cinta original vuelve junto con el resto.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver mi pedido", data.trackingUrl)),
    text: `Una noticia agridulce.\n\nHola ${data.customerName}, no hemos podido digitalizar la cinta "${data.tapeLabel}" de tu pedido ${data.orderCode}. No te la cobramos: te devolvemos ${data.refundAmount}, y la cinta vuelve junto con el resto.\n\nVer pedido: ${data.trackingUrl}`,
  };
}

export function listoParaVolverEmail(data: {
  orderCode: string;
  customerName: string;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "Tus recuerdos han vuelto";
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Ya puedes volver a verlos.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0;">Hemos terminado de digitalizar tu pedido <strong>${data.orderCode}</strong> y preparado tu memoria USB con todos los vídeos. En unos días la recibirás en casa, junto con tus cintas originales.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver mi pedido", data.trackingUrl)),
    text: `Ya puedes volver a verlos.\n\nHola ${data.customerName}, hemos terminado tu pedido ${data.orderCode} y preparado tu memoria USB. Pronto la recibirás en casa junto con tus cintas originales.\n\nVer pedido: ${data.trackingUrl}`,
  };
}

export function envioDeVueltaEmail(data: {
  orderCode: string;
  customerName: string;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "Tus cintas vuelven a casa";
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Vuelven a casa.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0;">Tus cintas originales y tu memoria USB del pedido <strong>${data.orderCode}</strong> ya están de camino a tu domicilio.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver mi pedido", data.trackingUrl)),
    text: `Vuelven a casa.\n\nHola ${data.customerName}, tus cintas originales y tu memoria USB del pedido ${data.orderCode} ya están de camino a tu domicilio.\n\nVer pedido: ${data.trackingUrl}`,
  };
}

export function entregadoEmail(data: {
  customerName: string;
  orderCode: string;
  trackingUrl: string;
}): EmailTemplate {
  const subject = "Tus recuerdos ya están contigo";
  const body = `
    <h1 style="font-size:22px;margin:0 0 12px;">Todo de nuevo contigo.</h1>
    <p style="margin:0 0 12px;">Hola ${data.customerName},</p>
    <p style="margin:0;">Gracias por confiar en Vuelvia tus recuerdos. Esperamos que disfrutes volviendo a verlos.</p>
  `;
  return {
    subject,
    html: baseLayout(subject, body, cta("Ver mi pedido", data.trackingUrl)),
    text: `Todo de nuevo contigo.\n\nHola ${data.customerName}, gracias por confiar en Vuelvia tus recuerdos.\n\nVer pedido: ${data.trackingUrl}`,
  };
}

export const EMAIL_TEMPLATES = {
  "pedido-confirmado": pedidoConfirmadoEmail,
  "cintas-recibidas": cintasRecibidasEmail,
  "cantidad-distinta": cantidadDistintaEmail,
  digitalizando: digitalizandoEmail,
  "no-digitalizable": noDigitalizableEmail,
  "listo-para-volver": listoParaVolverEmail,
  "envio-de-vuelta": envioDeVueltaEmail,
  entregado: entregadoEmail,
} as const;
