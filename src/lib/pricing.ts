export type PricingConfig = {
  tier1PricePerTape: number;
  tier1Max: number;
  tier2PricePerTape: number;
  shippingRoundTrip: number;
  usbExtraPrice: number | null;
  estimatedDaysNormal: number;
  estimatedDaysHighDemand: number;
  highDemandMode: boolean;
};

export const DEFAULT_PRICING: PricingConfig = {
  tier1PricePerTape: 10,
  tier1Max: 10,
  tier2PricePerTape: 8,
  shippingRoundTrip: 12,
  usbExtraPrice: null,
  estimatedDaysNormal: 10,
  estimatedDaysHighDemand: 21,
  highDemandMode: false,
};

const STORAGE_KEY = "vuelvia_pricing_config";

export function loadPricingConfig(): PricingConfig {
  if (typeof window === "undefined") return DEFAULT_PRICING;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRICING;
    return { ...DEFAULT_PRICING, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PRICING;
  }
}

export function savePricingConfig(config: PricingConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function calculateDigitization(tapes: number, config: PricingConfig): number {
  if (tapes <= 0) return 0;
  if (tapes <= config.tier1Max) return tapes * config.tier1PricePerTape;
  const base = config.tier1Max * config.tier1PricePerTape;
  const rest = (tapes - config.tier1Max) * config.tier2PricePerTape;
  return base + rest;
}

export function calculateTotal(
  tapes: number,
  usbCopies: number,
  config: PricingConfig
) {
  const digitization = calculateDigitization(tapes, config);
  const shipping = tapes > 0 ? config.shippingRoundTrip : 0;
  const usbExtra = config.usbExtraPrice ? usbCopies * config.usbExtraPrice : 0;
  const total = digitization + shipping + usbExtra;
  return { digitization, shipping, usbExtra, total };
}

export function estimatedDays(config: PricingConfig): number {
  return config.highDemandMode
    ? config.estimatedDaysHighDemand
    : config.estimatedDaysNormal;
}

export function formatEuros(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
