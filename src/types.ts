export type Variant = "1a" | "1b" | "1c" | "2a";

export interface DeviceEntityConfig {
  name: string;
  entity: string;
  color?: string;
}

export interface EnergyCardEntities {
  /** Current PV production, W (or kW — see power_unit). */
  pv_power?: string;
  /** Current grid power, W. Positive = importing, negative = exporting. */
  grid_power?: string;
  /** Current battery power, W. Positive = charging, negative = discharging. */
  battery_power?: string;
  /** Battery state of charge, %. */
  battery_soc?: string;
  /** Current house load, W. Derived from the other three if omitted. */
  load_power?: string;

  /** Cumulative (total_increasing) solar energy, kWh — powers bars/sparkline/today totals. */
  solar_energy?: string;
  /** Cumulative grid import energy, kWh. */
  grid_import_energy?: string;
  /** Cumulative grid export energy, kWh. */
  grid_export_energy?: string;
}

export interface EnergyCardConfig {
  type: string;
  variant: Variant;
  title?: string;
  entities: EnergyCardEntities;
  devices?: DeviceEntityConfig[];
  /** Import price, currency/kWh. Default 0.28. */
  import_rate?: number;
  /** Export/feed-in price, currency/kWh. Default 0.155. */
  export_rate?: number;
  /** Power unit the power entities report in. Default "W". */
  power_unit?: "W" | "kW";
  currency?: string;
  /** Usable battery capacity, kWh — powers the 1B "charging to 100% by" estimate. */
  battery_capacity_kwh?: number;
}

export const DEFAULT_IMPORT_RATE = 0.28;
export const DEFAULT_EXPORT_RATE = 0.155;
export const DEFAULT_CURRENCY = "$";

export type Range = "today" | "week" | "month";

export interface SeriesPoint {
  label: string;
  solar: number;
  grid: number;
}

export interface HassLike {
  states: Record<string, { state: string; attributes: Record<string, any> }>;
  callWS: <T = any>(msg: Record<string, unknown>) => Promise<T>;
  locale?: { language?: string };
}

export function getNumber(hass: HassLike, entityId?: string): number | undefined {
  if (!entityId) return undefined;
  const st = hass.states[entityId];
  if (!st) return undefined;
  const n = Number(st.state);
  return Number.isFinite(n) ? n : undefined;
}
