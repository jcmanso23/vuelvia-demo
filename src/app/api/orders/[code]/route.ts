import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma, hasDatabase } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";
import { fromDbOrder } from "@/lib/orderMapping";
import { toDbStatus } from "@/lib/statusMapping";
import { sendEmail } from "@/lib/mailer";
import {
  cintasRecibidasEmail,
  digitalizandoEmail,
  listoParaVolverEmail,
  envioDeVueltaEmail,
  entregadoEmail,
} from "@/lib/emails";
import type { PublicStatus } from "@/lib/orders";

export const dynamic = "force-dynamic";

const STATUS_EMAIL: Partial<
  Record<PublicStatus, (data: { orderCode: string; customerName: string; trackingUrl: string; tapeCount: number }) => ReturnType<typeof cintasRecibidasEmail>>
> = {
  recibidas: cintasRecibidasEmail,
  "en-digitalizacion": digitalizandoEmail,
  listas: listoParaVolverEmail,
  enviadas: envioDeVueltaEmail,
  entregado: entregadoEmail,
};

export async function GET(_request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  if (!hasDatabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const { code } = await params;
  const order = await prisma.order.findUnique({ where: { code: code.toUpperCase() } });
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(fromDbOrder(order));
}

const patchSchema = z.object({
  status: z.enum([
    "confirmado",
    "esperando-cintas",
    "en-camino",
    "recibidas",
    "en-revision",
    "en-digitalizacion",
    "listas",
    "enviadas",
    "entregado",
  ]),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  if (!hasDatabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { code } = await params;
  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const existing = await prisma.order.findUnique({ where: { code: code.toUpperCase() } });
  if (!existing) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const order = await prisma.order.update({
    where: { code: code.toUpperCase() },
    data: { status: toDbStatus(parsed.data.status) },
  });

  const emailBuilder = STATUS_EMAIL[parsed.data.status];
  if (emailBuilder) {
    const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/pedido?code=${order.code}`;
    await sendEmail(
      order.customerEmail,
      emailBuilder({
        orderCode: order.code,
        customerName: order.customerName,
        trackingUrl,
        tapeCount: order.tapeCount,
      })
    ).catch((err) => console.error("[emails] fallo al enviar notificación de estado", err));
  }

  return NextResponse.json(fromDbOrder(order));
}
