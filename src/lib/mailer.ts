import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM ?? "Vuelvia <onboarding@resend.dev>";

export const hasEmail = Boolean(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, template: { subject: string; html: string; text: string }) {
  if (!hasEmail) {
    console.warn(`[emails] RESEND_API_KEY no configurada — no se envía "${template.subject}" a ${to}`);
    return { skipped: true };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: FROM,
    to,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}
