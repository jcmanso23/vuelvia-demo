import { PricingConfig, calculateTotal } from "./pricing";

export type InboundMethod = "correos" | "domicilio";

export type TapeFormat = "VHS" | "VHS-C" | "MiniDV" | "8mm" | "no-lo-se" | "varios";

export type PublicStatus =
  | "confirmado"
  | "esperando-cintas"
  | "en-camino"
  | "recibidas"
  | "en-revision"
  | "en-digitalizacion"
  | "listas"
  | "enviadas"
  | "entregado";

export type Customer = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
};

export type Order = {
  code: string;
  createdAt: string;
  tapeCount: number;
  formats: TapeFormat[];
  usbCopies: number;
  inboundMethod: InboundMethod;
  customer: Customer;
  pricing: {
    digitization: number;
    shipping: number;
    usbExtra: number;
    total: number;
  };
  estimatedDays: number;
  status: PublicStatus;
  isDemo?: boolean;
};

const STORAGE_KEY = "vuelvia_orders";

export const STATUS_LABELS: Record<PublicStatus, string> = {
  confirmado: "Pedido confirmado",
  "esperando-cintas": "Esperando tus cintas",
  "en-camino": "En camino a Vuelvia",
  recibidas: "Cintas recibidas",
  "en-revision": "En revisión",
  "en-digitalizacion": "En digitalización",
  listas: "Listas",
  enviadas: "Enviadas",
  entregado: "Entregado",
};

export const STATUS_ORDER: PublicStatus[] = [
  "confirmado",
  "esperando-cintas",
  "en-camino",
  "recibidas",
  "en-revision",
  "en-digitalizacion",
  "listas",
  "enviadas",
  "entregado",
];

export const STATUS_MESSAGES: Record<PublicStatus, string> = {
  confirmado: "Hemos recibido tu pedido.",
  "esperando-cintas": "Prepara el paquete y envíanoslo cuando puedas.",
  "en-camino": "Tus cintas están viajando hacia nosotros.",
  recibidas: "Ya tenemos tus cintas y las hemos registrado.",
  "en-revision": "Estamos comprobando que todo esté correcto.",
  "en-digitalizacion": "Estamos recuperando tus recuerdos.",
  listas: "Tus vídeos ya están preparados.",
  enviadas: "Tus cintas y tu memoria USB vuelven a casa.",
  entregado: "Tus recuerdos ya están contigo.",
};

function randomDigits(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) out += Math.floor(Math.random() * 10);
  return out;
}

export function generateOrderCode(): string {
  const year = new Date().getFullYear();
  return `VLV-${year}${randomDigits(5)}`;
}

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  const orders = loadOrders();
  orders.unshift(order);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrderStatus(code: string, status: PublicStatus) {
  if (typeof window === "undefined") return;
  const orders = loadOrders().map((o) =>
    o.code === code ? { ...o, status } : o
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function findOrder(code: string): Order | undefined {
  const normalized = code.trim().toUpperCase();
  const local = loadOrders().find((o) => o.code === normalized);
  if (local) return local;
  return DEMO_ORDERS.find((o) => o.code === normalized);
}

export function createOrderFromCheckout(input: {
  tapeCount: number;
  formats: TapeFormat[];
  usbCopies: number;
  inboundMethod: InboundMethod;
  customer: Customer;
  pricingConfig: PricingConfig;
}): Order {
  const pricing = calculateTotal(
    input.tapeCount,
    input.usbCopies,
    input.pricingConfig
  );
  return {
    code: generateOrderCode(),
    createdAt: new Date().toISOString(),
    tapeCount: input.tapeCount,
    formats: input.formats,
    usbCopies: input.usbCopies,
    inboundMethod: input.inboundMethod,
    customer: input.customer,
    pricing,
    estimatedDays: input.pricingConfig.highDemandMode
      ? input.pricingConfig.estimatedDaysHighDemand
      : input.pricingConfig.estimatedDaysNormal,
    status: "confirmado",
  };
}

export const DEMO_ORDERS: Order[] = [
  {
    code: "VLV-DEMO1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    tapeCount: 6,
    formats: ["VHS"],
    usbCopies: 0,
    inboundMethod: "domicilio",
    customer: {
      name: "Laura",
      surname: "Sánchez",
      email: "demo@vuelvia.app",
      phone: "600000000",
      address: "Calle Mayor 12",
      postalCode: "47001",
      city: "Valladolid",
      province: "Valladolid",
    },
    pricing: { digitization: 60, shipping: 12, usbExtra: 0, total: 72 },
    estimatedDays: 10,
    status: "en-digitalizacion",
    isDemo: true,
  },
  {
    code: "VLV-DEMO2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    tapeCount: 12,
    formats: ["MiniDV", "8mm"],
    usbCopies: 1,
    inboundMethod: "correos",
    customer: {
      name: "Miguel",
      surname: "Ortega",
      email: "demo2@vuelvia.app",
      phone: "600000001",
      address: "Av. de la Constitución 4",
      postalCode: "28012",
      city: "Madrid",
      province: "Madrid",
    },
    pricing: { digitization: 116, shipping: 12, usbExtra: 15, total: 143 },
    estimatedDays: 10,
    status: "enviadas",
    isDemo: true,
  },
  {
    code: "VLV-DEMO3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    tapeCount: 3,
    formats: ["VHS-C"],
    usbCopies: 0,
    inboundMethod: "domicilio",
    customer: {
      name: "Ana",
      surname: "Delgado",
      email: "demo3@vuelvia.app",
      phone: "600000002",
      address: "Calle Sol 8",
      postalCode: "41001",
      city: "Sevilla",
      province: "Sevilla",
    },
    pricing: { digitization: 30, shipping: 12, usbExtra: 0, total: 42 },
    estimatedDays: 10,
    status: "entregado",
    isDemo: true,
  },
];
