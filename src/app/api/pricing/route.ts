import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma, hasDatabase } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";
import { DEFAULT_PRICING } from "@/lib/pricing";

export const dynamic = "force-dynamic";

function toApi(row: {
  tier1PricePerTape: number;
  tier1Max: number;
  tier2PricePerTape: number;
  dropoffRoundTrip: number;
  homePickupRoundTrip: number;
  usbExtraPrice: number | null;
  estimatedDaysNormal: number;
  estimatedDaysHighDemand: number;
  highDemandMode: boolean;
}) {
  return {
    tier1PricePerTape: row.tier1PricePerTape,
    tier1Max: row.tier1Max,
    tier2PricePerTape: row.tier2PricePerTape,
    dropoffRoundTrip: row.dropoffRoundTrip,
    homePickupRoundTrip: row.homePickupRoundTrip,
    usbExtraPrice: row.usbExtraPrice,
    estimatedDaysNormal: row.estimatedDaysNormal,
    estimatedDaysHighDemand: row.estimatedDaysHighDemand,
    highDemandMode: row.highDemandMode,
  };
}

export async function GET() {
  if (!hasDatabase) {
    return NextResponse.json(DEFAULT_PRICING);
  }
  const row = await prisma.pricingConfig.findUnique({ where: { id: "default" } });
  if (!row) return NextResponse.json(DEFAULT_PRICING);
  return NextResponse.json(toApi(row));
}

const pricingSchema = z.object({
  tier1PricePerTape: z.number().positive(),
  tier1Max: z.number().int().positive(),
  tier2PricePerTape: z.number().positive(),
  dropoffRoundTrip: z.number().nonnegative(),
  homePickupRoundTrip: z.number().nonnegative(),
  usbExtraPrice: z.number().positive().nullable(),
  estimatedDaysNormal: z.number().int().positive(),
  estimatedDaysHighDemand: z.number().int().positive(),
  highDemandMode: z.boolean(),
});

export async function PUT(request: NextRequest) {
  if (!hasDatabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const parsed = pricingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body", issues: parsed.error.issues }, { status: 400 });
  }
  const row = await prisma.pricingConfig.upsert({
    where: { id: "default" },
    create: { id: "default", ...parsed.data },
    update: parsed.data,
  });
  return NextResponse.json(toApi(row));
}
