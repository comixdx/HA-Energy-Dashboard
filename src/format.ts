import { EnergyCardConfig, DEFAULT_CURRENCY, DEFAULT_EXPORT_RATE, DEFAULT_IMPORT_RATE } from "./types";

export function importRate(config: EnergyCardConfig): number {
  return config.import_rate ?? DEFAULT_IMPORT_RATE;
}

export function exportRate(config: EnergyCardConfig): number {
  return config.export_rate ?? DEFAULT_EXPORT_RATE;
}

export function currency(config: EnergyCardConfig): string {
  return config.currency ?? DEFAULT_CURRENCY;
}

/** Normalizes a raw power reading to kW, given the configured unit. */
export function toKw(config: EnergyCardConfig, raw: number | undefined): number {
  if (raw === undefined) return 0;
  return config.power_unit === "kW" ? raw : raw / 1000;
}

export function fmtKw(kw: number): string {
  return `${kw.toFixed(2)} kW`;
}

export function fmtKwh(kwh: number): string {
  return `${kwh.toFixed(1)} kWh`;
}

export function fmtMoney(config: EnergyCardConfig, amount: number): string {
  return `${currency(config)}${amount.toFixed(2)}`;
}

export function fmtPct(n: number): string {
  return `${Math.round(n)}%`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
