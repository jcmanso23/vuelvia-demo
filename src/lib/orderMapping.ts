import type { Order as DbOrder } from "@prisma/client";
import type { Order, TapeFormat } from "@/lib/orders";
import { fromDbStatus, fromDbInboundMethod } from "@/lib/statusMapping";

export function fromDbOrder(order: DbOrder): Order {
  return {
    code: order.code,
    createdAt: order.createdAt.toISOString(),
    tapeCount: order.tapeCount,
    formats: order.formats as TapeFormat[],
    usbCopies: order.usbCopies,
    inboundMethod: fromDbInboundMethod(order.inboundMethod),
    customer: {
      name: order.customerName,
      surname: order.customerSurname,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.customerAddress,
      postalCode: order.customerPostal,
      city: order.customerCity,
      province: order.customerProvince,
    },
    pricing: {
      digitization: order.digitization,
      shipping: order.shipping,
      usbExtra: order.usbExtra,
      total: order.total,
    },
    estimatedDays: order.estimatedDays,
    status: fromDbStatus(order.status),
    isRemote: true,
  };
}
