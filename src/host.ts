import { EnergyCardConfig, HassLike, Range, SeriesPoint } from "./types";

export interface DeviceTotal {
  name: string;
  color?: string;
  entity: string;
  kwh: number;
}

export interface RangeData {
  rows: SeriesPoint[];
  solarUsed: number;
  gridImported: number;
  exported: number;
  totalKwh: number;
  prevTotalKwh: number;
  devices?: DeviceTotal[];
}

/** The reactive surface each variant renderer reads from / writes to on the card element. */
export interface CardHost {
  hass: HassLike;
  config: EnergyCardConfig;
  range: Range;
  mode: "cost" | "kwh";
  sel: number | null;
  showDevices: boolean;
  loading: boolean;
  rangeData?: RangeData;
  setRange(r: Range): void;
  setMode(m: "cost" | "kwh"): void;
  setSel(i: number | null): void;
  toggleDevices(): void;
}
