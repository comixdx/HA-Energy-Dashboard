import { html, nothing, TemplateResult } from "lit";
import { C } from "../colors";
import { CardHost } from "../host";
import { Range } from "../types";
import { exportRate, fmtKwh, fmtMoney, fmtPct, importRate } from "../format";

const RANGE_LABEL: Record<Range, string> = { today: "today", week: "this week", month: "this month" };
const COMPARE_LABEL: Record<Range, string> = { today: "yesterday", week: "last week", month: "last month" };
const RANGES: Range[] = ["today", "week", "month"];

export function renderWidePanel(host: CardHost): TemplateResult {
  const data = host.rangeData;
  const mode = host.mode;
  const rows = data?.rows ?? [];
  const max = Math.max(1e-6, ...rows.map((r) => r.solar + r.grid));
  const iRate = importRate(host.config);
  const eRate = exportRate(host.config);

  const gridImported = data?.gridImported ?? 0;
  const solarUsed = data?.solarUsed ?? 0;
  const exported = data?.exported ?? 0;
  const totalKwh = data?.totalKwh ?? 0;
  const prevTotalKwh = data?.prevTotalKwh ?? 0;
  const cost = gridImported * iRate;

  const delta = prevTotalKwh > 0 ? Math.round(((totalKwh - prevTotalKwh) / prevTotalKwh) * 100) : 0;
  const selfPct = totalKwh > 0 ? Math.round((solarUsed / totalKwh) * 100) : 0;

  const sel = host.sel;
  const sr = sel !== null ? rows[sel] : undefined;
  const tip = sr
    ? {
        label: host.range === "today" ? `${sr.label}:00` : sr.label,
        headline: mode === "cost" ? `${fmtMoney(host.config, sr.grid * iRate)} from grid` : `${fmtKwh(sr.solar + sr.grid)} used`,
        detail: `${fmtKwh(sr.solar)} solar · ${fmtKwh(sr.grid)} grid`,
      }
    : null;
  const tipLeft = sel !== null && rows.length ? `${((sel + 0.5) / rows.length) * 100}%` : "50%";

  const axisLabel = (i: number) => {
    if (!rows.length) return "";
    const l = rows[i].label;
    return host.range === "today" ? `${l}:00` : l;
  };

  const devices = data?.devices ?? [];
  const devMax = Math.max(1e-6, ...devices.map((d) => d.kwh));

  return html`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16.8px">
        <div style="display:flex;flex-direction:column;gap:8.4px">
          <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${C.neutral500}">
            Energy spend · ${RANGE_LABEL[host.range]}
          </div>
          <div style="display:flex;align-items:baseline;gap:8.4px">
            <div style="font-size:44px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${C.neutral100}">
              ${mode === "cost" ? fmtMoney(host.config, cost) : fmtKwh(totalKwh)}
            </div>
            <div style="font-size:13px;color:${C.neutral500}">
              ${mode === "cost" ? `${fmtKwh(totalKwh)} used` : `${fmtMoney(host.config, cost)} billed`}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:5.6px;font-size:12px;color:${C.neutral500}">
            <span style="color:${delta > 0 ? C.solar : C.accent300}">${delta > 0 ? "+" : ""}${delta}%</span>
            <span>vs. ${COMPARE_LABEL[host.range]}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8.4px">
          <div style="display:flex;gap:2px;padding:2px;background:#1b1d29;border-radius:8px;box-shadow:inset 0 0 0 1px ${C.neutral800}">
            ${RANGES.map(
              (r) => html`
                <button
                  type="button"
                  @click=${() => host.setRange(r)}
                  style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${host.range === r ? "#3a3d4d" : "transparent"};color:${host.range === r ? C.neutral100 : C.neutral500}"
                >
                  ${r[0].toUpperCase()}${r.slice(1)}
                </button>
              `
            )}
          </div>
          <div style="display:flex;gap:2px;padding:2px;background:#1b1d29;border-radius:8px;box-shadow:inset 0 0 0 1px ${C.neutral800}">
            <button
              type="button"
              @click=${() => host.setMode("cost")}
              style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${mode === "cost" ? "#3a3d4d" : "transparent"};color:${mode === "cost" ? C.neutral100 : C.neutral500}"
            >
              Cost
            </button>
            <button
              type="button"
              @click=${() => host.setMode("kwh")}
              style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${mode === "kwh" ? "#3a3d4d" : "transparent"};color:${mode === "kwh" ? C.neutral100 : C.neutral500}"
            >
              kWh
            </button>
          </div>
        </div>
      </div>

      <div style="position:relative;height:168px;display:flex;align-items:flex-end;gap:3px;padding-top:28px">
        ${rows.map((r, i) => {
          const dim = sel === null || sel === i ? 1 : 0.42;
          return html`
            <button
              type="button"
              @click=${() => host.setSel(sel === i ? null : i)}
              title=${r.label}
              style="flex:1 1 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:1px;background:transparent;border:0;padding:0;cursor:pointer;opacity:${dim};transition:opacity 120ms ease"
            >
              <div style="width:100%;border-radius:3px 3px 0 0;background:${C.neutral600};height:${(r.grid / max) * 138}px"></div>
              <div style="width:100%;background:${C.solar};height:${(r.solar / max) * 138}px"></div>
              <div style="width:100%;height:2px;border-radius:0 0 2px 2px;background:${sel === i ? C.accent : "transparent"}"></div>
            </button>
          `;
        })}
        ${tip
          ? html`
              <div
                style="position:absolute;top:0;left:${tipLeft};transform:translateX(-50%);background:#2c2f3d;box-shadow:0 0 0 1px ${C.neutral700},0 6px 18px rgba(0,0,0,0.55);border-radius:8px;padding:8.4px 11.2px;display:flex;flex-direction:column;gap:2.8px;white-space:nowrap;pointer-events:none"
              >
                <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${C.neutral500}">${tip.label}</div>
                <div style="font-size:15px;font-weight:500;color:${C.neutral100}">${tip.headline}</div>
                <div style="font-size:11px;color:${C.neutral400}">${tip.detail}</div>
              </div>
            `
          : nothing}
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:${C.neutral600};margin-top:-8.4px">
        <span>${axisLabel(0)}</span>
        <span>${axisLabel(Math.floor((rows.length - 1) / 2))}</span>
        <span>${axisLabel(rows.length - 1)}</span>
      </div>

      <div style="height:1px;background:linear-gradient(90deg, transparent, ${C.divider} 48px, ${C.divider} calc(100% - 48px), transparent)"></div>

      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:16.8px">
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${C.neutral500}">
            <span style="width:8px;height:8px;border-radius:2px;background:${C.solar}"></span>Solar used
          </div>
          <div style="font-size:18px;font-weight:500;color:${C.text}">
            ${mode === "cost" ? `${fmtMoney(host.config, solarUsed * iRate)} saved` : fmtKwh(solarUsed)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${C.neutral500}">
            <span style="width:8px;height:8px;border-radius:2px;background:${C.neutral600}"></span>From grid
          </div>
          <div style="font-size:18px;font-weight:500;color:${C.text}">
            ${mode === "cost" ? fmtMoney(host.config, cost) : fmtKwh(gridImported)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${C.neutral500}">
            <span style="width:8px;height:8px;border-radius:2px;background:${C.accent}"></span>Exported
          </div>
          <div style="font-size:18px;font-weight:500;color:${C.text}">
            ${mode === "cost" ? fmtMoney(host.config, exported * eRate) : fmtKwh(exported)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="font-size:11px;color:${C.neutral500}">Self-sufficiency</div>
          <div style="display:flex;align-items:center;gap:8.4px">
            <div style="font-size:18px;font-weight:500;color:${C.text}">${fmtPct(selfPct)}</div>
            <div style="flex:1;height:4px;border-radius:2px;background:${C.neutral800};overflow:hidden">
              <div style="height:100%;border-radius:2px;background:${C.accent};width:${fmtPct(selfPct)}"></div>
            </div>
          </div>
        </div>
      </div>

      ${host.config.devices?.length
        ? html`
            <button
              type="button"
              @click=${() => host.toggleDevices()}
              style="align-self:flex-start;font-family:inherit;font-size:12px;font-weight:500;color:${C.accent300};background:transparent;border:1px solid ${C.accent700};border-radius:8px;padding:5.6px 11.2px;cursor:pointer"
            >
              ${host.showDevices ? "Hide device breakdown" : "Show device breakdown"}
            </button>
            ${host.showDevices
              ? html`
                  <div style="display:flex;flex-direction:column;gap:8.4px;padding-top:2.8px">
                    ${devices.map(
                      (d) => html`
                        <div style="display:grid;grid-template-columns:132px 1fr 84px;align-items:center;gap:11.2px">
                          <div style="font-size:13px;color:${C.neutral400}">${d.name}</div>
                          <div style="height:6px;border-radius:3px;background:#1b1d29">
                            <div style="height:100%;border-radius:3px;background:${d.color || C.accent};width:${(d.kwh / devMax) * 100}%"></div>
                          </div>
                          <div style="font-size:13px;text-align:right;color:${C.text};font-variant-numeric:tabular-nums">
                            ${mode === "cost" ? fmtMoney(host.config, d.kwh * iRate) : fmtKwh(d.kwh)}
                          </div>
                        </div>
                      `
                    )}
                  </div>
                `
              : nothing}
          `
        : nothing}
    </div>
  `;
}
