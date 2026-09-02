import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma, hasDatabase } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";
import { fromDbOrder } from "@/lib/orderMapping";
import { toDbInboundMethod } from "@/lib/statusMapping";
import { sendEmail } from "@/lib/mailer";
import { pedidoConfirmadoEmail } from "@/lib/emails";

export const dynamic = "force-dynamic";

const customerSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
});

const createOrderSchema = z.object({
  code: z.string().min(1),
  tapeCount: z.number().int().positive(),
  formats: z.array(z.string()),
  usbCopies: z.number().int().min(0),
  inboundMethod: z.enum(["correos", "domicilio"]),
  customer: customerSchema,
  pricing: z.object({
    digitization: z.number(),
    shipping: z.number(),
    usbExtra: z.number(),
    total: z.number(),
  }),
  estimatedDays: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  if (!hasDatabase) {
    return NextResponse.json(
      { error: "not_configured", message: "Backend sin base de datos configurada." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body", issues: parsed.error.issues }, { status: 400 });
  }
  const input = parsed.data;

  const order = await prisma.order.create({
    data: {
      code: input.code,
      tapeCount: input.tapeCount,
      formats: input.formats,
      usbCopies: input.usbCopies,
      inboundMethod: toDbInboundMethod(input.inboundMethod),
      customerName: input.customer.name,
      customerSurname: input.customer.surname,
      customerEmail: input.customer.email,
      customerPhone: input.customer.phone,
      customerAddress: input.customer.address,
      customerPostal: input.customer.postalCode,
      customerCity: input.customer.city,
      customerProvince: input.customer.province,
      digitization: input.pricing.digitization,
      shipping: input.pricing.shipping,
      usbExtra: input.pricing.usbExtra,
      total: input.pricing.total,
      estimatedDays: input.estimatedDays,
    },
  });

  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/pedido?code=${order.code}`;
  await sendEmail(
    input.customer.email,
    pedidoConfirmadoEmail({
      orderCode: order.code,
      customerName: input.customer.name,
      trackingUrl,
    })
  ).catch((err) => console.error("[emails] fallo al enviar pedido-confirmado", err));

  return NextResponse.json(fromDbOrder(order), { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!hasDatabase) {
    return NextResponse.json([], { status: 200 });
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders.map(fromDbOrder));
}
