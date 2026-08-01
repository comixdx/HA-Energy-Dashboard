import { html, nothing, TemplateResult } from "lit";
import { C } from "../colors";
import { CardHost } from "../host";
import { computeFlowNow } from "../flow";
import { fmtKw, fmtKwh, fmtMoney, importRate, exportRate } from "../format";

const CIRC = 226.2; // 2 * PI * 36, matches the mock's ring radius

export function renderLiveTile(host: CardHost): TemplateResult {
  const flow = computeFlowNow(host.config, host.hass);
  const iRate = importRate(host.config);
  const eRate = exportRate(host.config);
  const perHour = flow.imp * iRate - flow.exp * eRate;

  const refMax = Math.max(flow.pv, flow.load, flow.imp, flow.exp, flow.charge, flow.discharge, 0.01);
  const gridLabel = flow.imp > 0.01 ? fmtKw(flow.imp) : flow.exp > 0.01 ? `−${fmtKw(flow.exp)}` : "idle";
  const battLabel = flow.charge > 0.01 ? `+${fmtKw(flow.charge)}` : flow.discharge > 0.01 ? `−${fmtKw(flow.discharge)}` : "idle";

  const soc = flow.soc;
  const dash = soc !== undefined ? `${((soc / 100) * CIRC).toFixed(1)} ${CIRC}` : `0 ${CIRC}`;

  const capacity = host.config.battery_capacity_kwh;
  const storedKwh = capacity !== undefined && soc !== undefined ? (capacity * soc) / 100 : undefined;

  let scheduleLine1: string | null = null;
  let scheduleLine2: string | null = null;
  if (soc !== undefined) {
    if (flow.charge > 0.01 && capacity !== undefined) {
      const remaining = (capacity * (100 - soc)) / 100;
      const hours = remaining / flow.charge;
      const eta = new Date(Date.now() + hours * 3600_000);
      scheduleLine1 = `Charging to 100% by ${eta.getHours().toString().padStart(2, "0")}:${eta.getMinutes().toString().padStart(2, "0")}`;
    } else if (flow.charge > 0.01) {
      scheduleLine1 = "Charging";
    } else if (flow.discharge > 0.01) {
      scheduleLine1 = "Discharging";
    } else {
      scheduleLine1 = "Idle";
    }
    if (storedKwh !== undefined) {
      const hoursOfUse = flow.load > 0.01 ? storedKwh / flow.load : undefined;
      scheduleLine2 = `${fmtKwh(storedKwh)} stored${hoursOfUse !== undefined ? ` · ${hoursOfUse.toFixed(1)} h of house use` : ""}`;
    }
  }

  const data = host.rangeData;
  const todayCost = data ? data.gridImported * iRate : undefined;
  const todayKwh = data?.totalKwh;

  return html`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${C.neutral500}">Right now</div>
        <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${C.neutral400}">
          <span style="width:6px;height:6px;border-radius:50%;background:${C.accent};box-shadow:0 0 8px ${C.accent}"></span>live
        </div>
      </div>

      <div style="display:flex;align-items:baseline;gap:8.4px">
        <div style="font-size:40px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${C.neutral100}">${flow.load.toFixed(2)}</div>
        <div style="font-size:15px;color:${C.neutral500}">kW drawn</div>
      </div>
      <div style="font-size:13px;color:${C.neutral400}">
        ${perHour >= 0
          ? html`Costing <span style="color:${C.neutral100}">${fmtMoney(host.config, perHour)}/h</span> at the current tariff`
          : html`Earning <span style="color:${C.neutral100}">${fmtMoney(host.config, -perHour)}/h</span> on export`}
      </div>

      <div style="display:flex;flex-direction:column;gap:11.2px;padding:16.8px 0;border-top:1px solid ${C.divider};border-bottom:1px solid ${C.divider}">
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${C.neutral400}">Solar</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${(flow.pv / refMax) * 100}%;border-radius:3px;background:${C.solar}"></div></div>
          <div style="font-size:13px;text-align:right;color:${C.text};font-variant-numeric:tabular-nums">${fmtKw(flow.pv)}</div>
        </div>
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${C.neutral400}">Grid</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${(Math.max(flow.imp, flow.exp) / refMax) * 100}%;border-radius:3px;background:${C.neutral600}"></div></div>
          <div style="font-size:13px;text-align:right;color:${flow.imp > 0.01 || flow.exp > 0.01 ? C.text : C.neutral600};font-variant-numeric:tabular-nums">${gridLabel}</div>
        </div>
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${C.neutral400}">Battery</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${(Math.max(flow.charge, flow.discharge) / refMax) * 100}%;border-radius:3px;background:${C.accent}"></div></div>
          <div style="font-size:13px;text-align:right;color:${flow.charge > 0.01 || flow.discharge > 0.01 ? C.accent300 : C.neutral600};font-variant-numeric:tabular-nums">${battLabel}</div>
        </div>
      </div>

      ${soc !== undefined
        ? html`
            <div style="display:flex;align-items:center;gap:16.8px">
              <div style="position:relative;width:84px;height:84px;flex:0 0 auto">
                <svg viewBox="0 0 84 84" style="width:84px;height:84px;transform:rotate(-90deg)">
                  <circle cx="42" cy="42" r="36" fill="none" stroke="${C.neutral800}" stroke-width="7"></circle>
                  <circle cx="42" cy="42" r="36" fill="none" stroke="${C.accent}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${dash}"></circle>
                </svg>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px">
                  <div style="font-size:18px;font-weight:500;color:${C.neutral100}">${Math.round(soc)}%</div>
                  <div style="font-size:10px;color:${C.neutral500}">battery</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:5.6px">
                ${scheduleLine1 ? html`<div style="font-size:13px;color:${C.text}">${scheduleLine1}</div>` : nothing}
                ${scheduleLine2 ? html`<div style="font-size:12px;color:${C.neutral500}">${scheduleLine2}</div>` : nothing}
              </div>
            </div>
          `
        : nothing}

      ${todayCost !== undefined
        ? html`
            <div style="display:flex;align-items:baseline;justify-content:space-between">
              <div style="font-size:12px;color:${C.neutral500}">Today so far</div>
              <div style="font-size:15px;font-weight:500;color:${C.neutral100}">
                ${fmtMoney(host.config, todayCost)} <span style="font-size:12px;font-weight:400;color:${C.neutral500}">· ${fmtKwh(todayKwh ?? 0)}</span>
              </div>
            </div>
          `
        : nothing}
    </div>
  `;
}
