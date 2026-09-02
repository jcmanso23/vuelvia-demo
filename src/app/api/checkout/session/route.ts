import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY);

const bodySchema = z.object({
  orderCode: z.string().min(1),
  total: z.number().positive(),
  customerEmail: z.string().email(),
  tapeCount: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  if (!hasStripe) {
    return NextResponse.json(
      { error: "not_configured", message: "Stripe no está configurado todavía." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const { orderCode, total, customerEmail, tapeCount } = parsed.data;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: Math.round(total * 100),
          product_data: {
            name: `Digitalización de ${tapeCount} ${tapeCount === 1 ? "cinta" : "cintas"} — Vuelvia`,
            description: `Pedido ${orderCode}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: { orderCode },
    success_url: `${siteUrl}/pedido-confirmado?code=${orderCode}`,
    cancel_url: `${siteUrl}/digitalizar`,
  });

  return NextResponse.json({ url: session.url });
}
