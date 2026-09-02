import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const hasDatabase = Boolean(process.env.DATABASE_URL);

// PrismaClient valida DATABASE_URL en el propio constructor, así que solo
// lo instanciamos si realmente hay una base de datos configurada. Las
// rutas de API siempre comprueban `hasDatabase` antes de usar `prisma`.
function createClient(): PrismaClient {
  return (
    global.__prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    })
  );
}

export const prisma: PrismaClient = hasDatabase
  ? (() => {
      const client = createClient();
      if (process.env.NODE_ENV !== "production") global.__prisma = client;
      return client;
    })()
  : (new Proxy(
      {},
      {
        get() {
          throw new Error(
            "Prisma no está configurado: falta DATABASE_URL. Comprueba `hasDatabase` antes de usar `prisma`."
          );
        },
      }
    ) as PrismaClient);
