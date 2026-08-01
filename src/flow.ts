import { EnergyCardConfig, HassLike, getNumber } from "./types";
import { toKw } from "./format";

export interface FlowNow {
  pv: number; // kW, >= 0
  load: number; // kW, >= 0
  soc: number | undefined; // %
  imp: number; // kW grid import, >= 0
  exp: number; // kW grid export, >= 0
  charge: number; // kW battery charging, >= 0
  discharge: number; // kW battery discharging, >= 0
  supply: number; // kW total inverter throughput (pv + discharge + imp)
  selfSufficiencyNow: number | undefined; // %, share of supply not imported
}

/** Live power split, computed from current entity states — the real-data analogue of the mock's `flow(scenario)`. */
export function computeFlowNow(config: EnergyCardConfig, hass: HassLike): FlowNow {
  const ent = config.entities;
  const pv = Math.max(0, toKw(config, getNumber(hass, ent.pv_power)) || 0);
  const gridRaw = toKw(config, getNumber(hass, ent.grid_power)) || 0;
  const battRaw = toKw(config, getNumber(hass, ent.battery_power)) || 0;
  const soc = getNumber(hass, ent.battery_soc);

  const imp = Math.max(0, gridRaw);
  const exp = Math.max(0, -gridRaw);
  const charge = Math.max(0, battRaw);
  const discharge = Math.max(0, -battRaw);

  const configuredLoad = getNumber(hass, ent.load_power);
  const load =
    configuredLoad !== undefined
      ? Math.max(0, toKw(config, configuredLoad) || 0)
      : Math.max(0, pv + discharge + imp - charge - exp);

  const supply = pv + discharge + imp;
  const selfSufficiencyNow = supply > 0 ? ((supply - imp) / supply) * 100 : undefined;

  return { pv, load, soc, imp, exp, charge, discharge, supply, selfSufficiencyNow };
}

export function pctOfSupply(v: number, supply: number): string {
  return supply > 0 ? `${Math.round((v / supply) * 100)}%` : "0%";
}
