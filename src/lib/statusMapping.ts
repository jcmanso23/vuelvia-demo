import type { PublicStatus as DbStatus, InboundMethod as DbInboundMethod } from "@prisma/client";
import type { PublicStatus, InboundMethod } from "@/lib/orders";

const TO_DB_STATUS: Record<PublicStatus, DbStatus> = {
  confirmado: "confirmado",
  "esperando-cintas": "esperando_cintas",
  "en-camino": "en_camino",
  recibidas: "recibidas",
  "en-revision": "en_revision",
  "en-digitalizacion": "en_digitalizacion",
  listas: "listas",
  enviadas: "enviadas",
  entregado: "entregado",
};

const FROM_DB_STATUS: Record<DbStatus, PublicStatus> = {
  confirmado: "confirmado",
  esperando_cintas: "esperando-cintas",
  en_camino: "en-camino",
  recibidas: "recibidas",
  en_revision: "en-revision",
  en_digitalizacion: "en-digitalizacion",
  listas: "listas",
  enviadas: "enviadas",
  entregado: "entregado",
};

export function toDbStatus(status: PublicStatus): DbStatus {
  return TO_DB_STATUS[status];
}

export function fromDbStatus(status: DbStatus): PublicStatus {
  return FROM_DB_STATUS[status];
}

export function toDbInboundMethod(method: InboundMethod): DbInboundMethod {
  return method;
}

export function fromDbInboundMethod(method: DbInboundMethod): InboundMethod {
  return method;
}
