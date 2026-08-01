import { html, nothing, TemplateResult } from "lit";
import { C } from "../colors";
import { CardHost } from "../host";
import { computeFlowNow } from "../flow";
import { exportRate, fmtKwh, fmtMoney, importRate } from "../format";

export function renderCompactTile(host: CardHost): TemplateResult {
  const data = host.rangeData;
  const iRate = importRate(host.config);
  const eRate = exportRate(host.config);

  const gridImported = data?.gridImported ?? 0;
  const exported = data?.exported ?? 0;
  const solarUsed = data?.solarUsed ?? 0;
  const totalKwh = data?.totalKwh ?? 0;
  const prevTotalKwh = data?.prevTotalKwh ?? 0;
  const cost = gridImported * iRate;
  const delta = prevTotalKwh > 0 ? Math.round(((totalKwh - prevTotalKwh) / prevTotalKwh) * 100) : 0;
  const selfPct = totalKwh > 0 ? Math.round((solarUsed / totalKwh) * 100) : 0;

  const rows = data?.rows ?? [];
  const max = Math.max(1e-6, ...rows.map((r) => r.solar + r.grid));
  const spark = rows.map((r) => ({
    h: Math.max(3, ((r.solar + r.grid) / max) * 52),
    color: r.grid > r.solar ? C.neutral600 : C.solar,
  }));

  const flow = computeFlowNow(host.config, host.hass);
  const soc = flow.soc;
  const battStatus = flow.charge > 0.01 ? "charging" : flow.discharge > 0.01 ? "discharging" : "idle";

  return html`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${C.neutral500}">Today</div>
        <div style="font-size:11px;color:${C.neutral600}">${host.config.currency ?? "$"}${iRate.toFixed(2)}/kWh</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="font-size:40px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${C.neutral100}">${fmtMoney(host.config, cost)}</div>
        <div style="font-size:12px;color:${C.neutral500}">
          <span style="color:${C.accent300}">${delta > 0 ? "+" : ""}${delta}%</span> vs. yesterday · ${fmtKwh(totalKwh)}
        </div>
      </div>

      <div style="display:flex;align-items:flex-end;gap:2px;height:52px">
        ${spark.map((s) => html`<div style="flex:1 1 0;border-radius:2px;background:${s.color};height:${s.h}px"></div>`)}
      </div>

      <div style="display:flex;flex-direction:column;gap:8.4px;padding-top:11.2px;border-top:1px solid ${C.divider}">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
          <span style="color:${C.neutral500}">Self-sufficiency</span><span style="color:${C.text}">${selfPct}%</span>
        </div>
        ${soc !== undefined
          ? html`
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
                <span style="color:${C.neutral500}">Battery</span><span style="color:${C.text}">${Math.round(soc)}% · ${battStatus}</span>
              </div>
            `
          : nothing}
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
          <span style="color:${C.neutral500}">Exported</span><span style="color:${C.text}">${fmtKwh(exported)} · ${fmtMoney(host.config, exported * eRate)}</span>
        </div>
      </div>
    </div>
  `;
}
