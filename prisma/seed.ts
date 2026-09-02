import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.pricingConfig.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      tier1PricePerTape: 10,
      tier1Max: 10,
      tier2PricePerTape: 8,
      dropoffRoundTrip: 12,
      homePickupRoundTrip: 18,
      usbExtraPrice: null,
      estimatedDaysNormal: 10,
      estimatedDaysHighDemand: 21,
      highDemandMode: false,
    },
    update: {},
  });
  console.log("Precios por defecto listos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
