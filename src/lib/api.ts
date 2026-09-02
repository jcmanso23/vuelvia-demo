import {
  Order,
  Customer,
  InboundMethod,
  TapeFormat,
  PublicStatus,
  createOrderFromCheckout,
  saveOrder,
  findOrder as findOrderLocal,
  generateOrderCode,
} from "@/lib/orders";
import { PricingConfig, loadPricingConfig, calculateTotal } from "@/lib/pricing";

// Capa de acceso a datos: intenta usar el backend real (API routes +
// Postgres) y, si no está disponible (por ejemplo en la demo estática de
// GitHub Pages, o si el backend aún no tiene base de datos configurada),
// recurre a localStorage para que la web siga siendo utilizable.

async function apiAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/api/pricing", { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function loadRemotePricingConfig(): Promise<PricingConfig> {
  try {
    const res = await fetch("/api/pricing", { cache: "no-store" });
    if (!res.ok) throw new Error("pricing api unavailable");
    return await res.json();
  } catch {
    return loadPricingConfig();
  }
}

export async function submitOrder(input: {
  tapeCount: number;
  formats: TapeFormat[];
  usbCopies: number;
  inboundMethod: InboundMethod;
  customer: Customer;
  pricingConfig: PricingConfig;
}): Promise<Order> {
  const pricing = calculateTotal(
    input.tapeCount,
    input.inboundMethod,
    input.usbCopies,
    input.pricingConfig
  );
  const code = generateOrderCode();

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        tapeCount: input.tapeCount,
        formats: input.formats,
        usbCopies: input.usbCopies,
        inboundMethod: input.inboundMethod,
        customer: input.customer,
        pricing,
        estimatedDays: input.pricingConfig.highDemandMode
          ? input.pricingConfig.estimatedDaysHighDemand
          : input.pricingConfig.estimatedDaysNormal,
      }),
    });
    if (!res.ok) throw new Error("orders api unavailable");
    return await res.json();
  } catch {
    // Sin backend disponible: seguimos funcionando como demo local.
    const order = createOrderFromCheckout(input);
    saveOrder(order);
    return order;
  }
}

export async function fetchOrder(code: string): Promise<Order | null> {
  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(code)}`, { cache: "no-store" });
    if (res.status === 404) return findOrderLocal(code) ?? null;
    if (!res.ok) throw new Error("orders api unavailable");
    return await res.json();
  } catch {
    return findOrderLocal(code) ?? null;
  }
}

export async function fetchOrdersAdmin(adminToken: string): Promise<Order[] | null> {
  try {
    const res = await fetch("/api/orders", {
      headers: { "x-admin-token": adminToken },
      cache: "no-store",
    });
    if (res.status === 401) return null;
    if (!res.ok) throw new Error("orders api unavailable");
    return await res.json();
  } catch {
    return [];
  }
}

export async function updateOrderStatusAdmin(
  code: string,
  status: PublicStatus,
  adminToken: string
): Promise<Order | null> {
  const res = await fetch(`/api/orders/${encodeURIComponent(code)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-token": adminToken },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function savePricingConfigAdmin(
  config: PricingConfig,
  adminToken: string
): Promise<boolean> {
  const res = await fetch("/api/pricing", {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-admin-token": adminToken },
    body: JSON.stringify(config),
  });
  return res.ok;
}

export async function createStripeCheckoutSession(input: {
  orderCode: string;
  total: number;
  customerEmail: string;
  tapeCount: number;
}): Promise<string | null> {
  try {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  } catch {
    return null;
  }
}

export { apiAvailable };
