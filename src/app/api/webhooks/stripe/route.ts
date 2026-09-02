import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma, hasDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

// Webhook de Stripe: marca el pedido como pagado cuando se completa el
// Checkout Session. Configurar en el dashboard de Stripe apuntando a
// https://<tu-dominio>/api/webhooks/stripe, evento "checkout.session.completed",
// y copiar el "signing secret" a STRIPE_WEBHOOK_SECRET.
export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret || !hasDatabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("missing signature");
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe webhook] firma inválida", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderCode = session.metadata?.orderCode;
    if (orderCode) {
      await prisma.order.update({
        where: { code: orderCode },
        data: {
          paidAt: new Date(),
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : undefined,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
