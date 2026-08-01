import { html, TemplateResult } from "lit";
import { C } from "../colors";
import { CardHost } from "../host";
import { computeFlowNow, pctOfSupply } from "../flow";
import { fmtKw } from "../format";

interface Leg {
  line: string;
  dot: string;
  anim: string;
  tag: string;
}

function duration(v: number): string {
  return Math.max(0.8, 2.6 - v * 0.4).toFixed(2);
}

function leg(v: number, dir: "fdown" | "fup" | "fright" | "fleft", color: string, supply: number): Leg {
  if (v <= 0.02) return { line: C.neutral800, dot: "transparent", anim: "idle 3s linear infinite", tag: "idle" };
  return {
    line: color,
    dot: color,
    anim: `${dir} ${duration(v)}s linear infinite`,
    tag: `${fmtKw(v)} · ${pctOfSupply(v, supply)}`,
  };
}

function legDots(l: Leg, axis: "v" | "h"): TemplateResult {
  const base =
    axis === "v"
      ? "position:absolute;left:50%;top:0;margin-left:-3.5px;width:7px;height:7px;border-radius:50%"
      : "position:absolute;top:50%;left:0;margin-top:-3.5px;width:7px;height:7px;border-radius:50%";
  return html`
    <div style="${base};background:${l.dot};animation:${l.anim}"></div>
    <div style="${base};background:${l.dot};animation:${l.anim};animation-delay:-0.55s"></div>
    <div style="${base};background:${l.dot};animation:${l.anim};animation-delay:-1.1s"></div>
  `;
}

export function renderFlowDiagram(host: CardHost): TemplateResult {
  const f = computeFlowNow(host.config, host.hass);
  const pctSupply = (v: number) => pctOfSupply(v, f.supply);

  const pvLeg = leg(f.pv, "fdown", C.solarStrong, f.supply);
  const gridLeg = f.imp > 0.02 ? leg(f.imp, "fright", C.gridStrong, f.supply) : leg(f.exp, "fleft", C.gridSoft, f.supply);
  const loadLeg = leg(f.load, "fright", C.loadStrong, f.supply);
  const battLeg = f.charge > 0.02 ? leg(f.charge, "fdown", C.batteryStrong, f.supply) : leg(f.discharge, "fup", C.batteryStrong, f.supply);

  const flowSummary =
    f.exp > 0.02
      ? "Solar covers the house and charges the battery — surplus is going back to the grid."
      : f.discharge > 0.02 && f.imp > 0.02
        ? "Battery is carrying most of the load; the grid tops up the rest."
        : f.pv > 0.02 && f.imp <= 0.02
          ? "Solar is covering the house."
          : "Drawing from the grid.";

  const selfNow = f.selfSufficiencyNow !== undefined ? `${Math.round(f.selfSufficiencyNow)}%` : "—";
  const soc = f.soc ?? 0;

  const gridVal = f.imp > 0.02 ? fmtKw(f.imp) : f.exp > 0.02 ? fmtKw(f.exp) : fmtKw(0);
  const gridSub = f.exp > 0.02 ? "exporting" : f.imp > 0.02 ? "importing" : "idle";
  const battVal = f.charge > 0.02 ? `+${fmtKw(f.charge)}` : f.discharge > 0.02 ? `−${fmtKw(f.discharge)}` : fmtKw(0);
  const battSub = f.charge > 0.02 ? "charging" : f.discharge > 0.02 ? "discharging" : "idle";

  return html`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${C.neutral500}">Energy flow</div>
        <div style="font-size:13px;color:${C.neutral400}">${flowSummary}</div>
      </div>

      <div style="overflow-x:auto;overflow-y:visible">
      <div
        style="display:grid;grid-template-columns:25% 12.5% 25% 12.5% 25%;grid-template-rows:minmax(132px,auto) 74px 148px 74px minmax(132px,auto);justify-content:center;align-items:start;padding:5.6px 0;width:100%;margin:0 auto"
      >
        <div style="grid-column:3;grid-row:1;align-self:end;display:flex;flex-direction:column-reverse;align-items:center;gap:4px;min-width:0">
          <svg viewBox="12 14 116 116" style="width:57%;height:auto;overflow:visible">
            <circle cx="68" cy="70" r="52" fill="${C.solarRing}" stroke="${C.solarStrong}" stroke-width="3"></circle>
            <circle cx="68" cy="48" r="8" fill="none" stroke="${C.solarSoft}" stroke-width="2"></circle>
            <line x1="68" y1="35" x2="68" y2="31" stroke="${C.solarSoft}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="79" y1="39" x2="82" y2="36" stroke="${C.solarSoft}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="83" y1="53" x2="87" y2="53" stroke="${C.solarSoft}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="57" y1="39" x2="54" y2="36" stroke="${C.solarSoft}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="53" y1="53" x2="49" y2="53" stroke="${C.solarSoft}" stroke-width="1.8" stroke-linecap="round"></line>
            <rect x="46" y="62" width="44" height="20" rx="3" fill="none" stroke="${C.solarSoft}" stroke-width="1.8"></rect>
            <line x1="61" y1="62" x2="61" y2="82" stroke="${C.solarSoft}" stroke-width="1.2" opacity="0.7"></line>
            <line x1="75" y1="62" x2="75" y2="82" stroke="${C.solarSoft}" stroke-width="1.2" opacity="0.7"></line>
            <line x1="46" y1="72" x2="90" y2="72" stroke="${C.solarSoft}" stroke-width="1.2" opacity="0.7"></line>
            <circle cx="112" cy="102" r="11" fill="${C.solarStrong}"></circle>
            <text x="112" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">PV</text>
          </svg>
          <div style="font-size:11px;color:${C.neutral600}">${f.pv > 0.02 ? `${pctSupply(f.pv)} of supply` : "no production"}</div>
          <div style="font-size:20px;font-weight:500;color:${C.neutral100};font-variant-numeric:tabular-nums;line-height:1.1">${fmtKw(f.pv)}</div>
          <div style="font-size:12px;font-weight:500;color:${C.solarSoft}">Solar PV</div>
        </div>

        <div style="grid-column:3;grid-row:2;height:74px;position:relative;display:flex;justify-content:center">
          <div style="width:2px;height:100%;background:linear-gradient(180deg, transparent, ${pvLeg.line} 22%, ${pvLeg.line} 78%, transparent)"></div>
          ${legDots(pvLeg, "v")}
          <div style="position:absolute;left:50%;top:50%;margin-left:14px;transform:translateY(-50%);font-size:11px;color:${C.neutral500};font-variant-numeric:tabular-nums;white-space:nowrap">${pvLeg.tag}</div>
        </div>

        <div style="grid-column:1;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="148 14 116 116" style="width:57%;height:auto;margin-top:6px;overflow:visible">
            <circle cx="204" cy="70" r="52" fill="${C.gridRing}" stroke="${C.gridStrong}" stroke-width="3"></circle>
            <g fill="none" stroke="${C.gridSoft}" stroke-width="2" stroke-linecap="round">
              <line x1="192" y1="94" x2="192" y2="60"></line>
              <line x1="184" y1="70" x2="200" y2="70"></line>
              <line x1="185" y1="78" x2="199" y2="78"></line>
              <line x1="184" y1="70" x2="192" y2="60"></line>
              <line x1="200" y1="70" x2="192" y2="60"></line>
              <line x1="216" y1="94" x2="216" y2="60"></line>
              <line x1="208" y1="70" x2="224" y2="70"></line>
              <line x1="209" y1="78" x2="223" y2="78"></line>
              <line x1="208" y1="70" x2="216" y2="60"></line>
              <line x1="224" y1="70" x2="216" y2="60"></line>
            </g>
            <path d="M184 70 Q204 80 224 70" fill="none" stroke="${C.gridSoft}" stroke-width="1.4"></path>
            <path d="M185 78 Q204 87 223 78" fill="none" stroke="${C.gridSoft}" stroke-width="1.4"></path>
            <circle cx="248" cy="102" r="11" fill="${C.gridStrong}"></circle>
            <text x="248" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">AC</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#b5d4f4">Grid</div>
          <div style="font-size:20px;font-weight:500;color:${C.neutral100};font-variant-numeric:tabular-nums;line-height:1.1">${gridVal}</div>
          <div style="font-size:11px;color:${C.neutral600}">${gridSub}</div>
        </div>

        <div style="grid-column:2;grid-row:3;height:95px;position:relative;display:flex;align-items:center">
          <div style="height:2px;width:100%;background:linear-gradient(90deg, transparent, ${gridLeg.line} 22%, ${gridLeg.line} 78%, transparent)"></div>
          ${legDots(gridLeg, "h")}
          <div style="position:absolute;left:50%;top:50%;margin-top:11px;transform:translateX(-50%);font-size:11px;color:${C.neutral500};font-variant-numeric:tabular-nums;white-space:nowrap">${gridLeg.tag}</div>
        </div>

        <div style="grid-column:3;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="278 8 132 132" style="width:64%;height:auto;overflow:visible">
            <circle cx="340" cy="70" r="58" fill="${C.inverterRing}" stroke="${C.inverterStrong}" stroke-width="3"></circle>
            <rect x="308" y="54" width="64" height="34" rx="6" fill="none" stroke="${C.inverterSoft}" stroke-width="2"></rect>
            <polyline points="315,80 315,64 323,64 323,80 329,80" fill="none" stroke="${C.inverterSoft}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
            <line x1="340" y1="57" x2="340" y2="85" stroke="${C.inverterSoft}" stroke-width="1" stroke-dasharray="2.5 2" opacity="0.45"></line>
            <path d="M348,71 Q353,60 358,71 Q363,82 368,71" fill="none" stroke="${C.inverterSoft}" stroke-width="2" stroke-linecap="round"></path>
            <circle cx="392" cy="106" r="12" fill="${C.inverterStrong}"></circle>
            <text x="392" y="110" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">INV</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#9fe1cb">Hybrid inverter</div>
          <div style="font-size:20px;font-weight:500;color:${C.neutral100};font-variant-numeric:tabular-nums;line-height:1.1">${fmtKw(f.supply)}</div>
          <div style="font-size:11px;color:${C.neutral600}">throughput</div>
        </div>

        <div style="grid-column:4;grid-row:3;height:95px;position:relative;display:flex;align-items:center">
          <div style="height:2px;width:100%;background:linear-gradient(90deg, transparent, ${loadLeg.line} 22%, ${loadLeg.line} 78%, transparent)"></div>
          ${legDots(loadLeg, "h")}
          <div style="position:absolute;left:50%;top:50%;margin-top:11px;transform:translateX(-50%);font-size:11px;color:${C.neutral500};font-variant-numeric:tabular-nums;white-space:nowrap">${loadLeg.tag}</div>
        </div>

        <div style="grid-column:5;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="420 14 116 116" style="width:57%;height:auto;margin-top:6px;overflow:visible">
            <circle cx="476" cy="70" r="52" fill="${C.loadRing}" stroke="${C.loadStrong}" stroke-width="3"></circle>
            <polygon points="476,46 500,60 500,90 452,90 452,60" fill="none" stroke="${C.loadSoft}" stroke-width="2" stroke-linejoin="round"></polygon>
            <rect x="468" y="72" width="16" height="18" rx="2" fill="none" stroke="${C.loadSoft}" stroke-width="1.8"></rect>
            <rect x="457" y="66" width="10" height="9" rx="1.5" fill="none" stroke="${C.loadSoft}" stroke-width="1.4"></rect>
            <line x1="462" y1="66" x2="462" y2="75" stroke="${C.loadSoft}" stroke-width="1"></line>
            <line x1="457" y1="70.5" x2="467" y2="70.5" stroke="${C.loadSoft}" stroke-width="1"></line>
            <circle cx="490" cy="66" r="6" fill="none" stroke="${C.loadSoft}" stroke-width="1.6"></circle>
            <line x1="487" y1="71.5" x2="493" y2="71.5" stroke="${C.loadSoft}" stroke-width="1.6" stroke-linecap="round"></line>
            <line x1="487.5" y1="75" x2="492.5" y2="75" stroke="${C.loadSoft}" stroke-width="1.2" stroke-linecap="round"></line>
            <circle cx="520" cy="102" r="11" fill="${C.loadStrong}"></circle>
            <text x="520" y="106" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">~W</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#c0dd97">House load</div>
          <div style="font-size:20px;font-weight:500;color:${C.neutral100};font-variant-numeric:tabular-nums;line-height:1.1">${fmtKw(f.load)}</div>
          <div style="font-size:11px;color:${C.neutral600}">current draw</div>
        </div>

        <div style="grid-column:3;grid-row:4;height:74px;position:relative;display:flex;justify-content:center">
          <div style="width:2px;height:100%;background:linear-gradient(180deg, transparent, ${battLeg.line} 22%, ${battLeg.line} 78%, transparent)"></div>
          ${legDots(battLeg, "v")}
          <div style="position:absolute;left:50%;top:50%;margin-left:14px;transform:translateY(-50%);font-size:11px;color:${C.neutral500};font-variant-numeric:tabular-nums;white-space:nowrap">${battLeg.tag}</div>
        </div>

        <div style="grid-column:3;grid-row:5;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="556 14 116 116" style="width:57%;height:auto;overflow:visible">
            <circle cx="612" cy="70" r="52" fill="${C.batteryRing}" stroke="${C.batteryStrong}" stroke-width="3"></circle>
            <rect x="588" y="60" width="38" height="22" rx="4" fill="none" stroke="${C.batterySoft}" stroke-width="2"></rect>
            <rect x="626" y="66" width="6" height="10" rx="2.5" fill="none" stroke="${C.batterySoft}" stroke-width="1.8"></rect>
            <rect x="592" y="64" width="8" height="14" rx="1.8" fill="${C.batterySoft}"></rect>
            <rect x="602" y="64" width="8" height="14" rx="1.8" fill="${C.batterySoft}" opacity="0.55"></rect>
            <rect x="612" y="64" width="6" height="14" rx="1.8" fill="${C.batterySoft}" opacity="0.22"></rect>
            <polygon points="608,42 602,53 607,53 604,66 615,51 609,51 613,42" fill="${C.batterySoft}" opacity="0.85"></polygon>
            <circle cx="656" cy="102" r="11" fill="${C.batteryStrong}"></circle>
            <text x="656" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">DC</text>
          </svg>
          <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline;gap:5.6px">
            <div style="font-size:12px;font-weight:500;color:#f4c0d1">Battery</div>
            <div style="font-size:12px;color:${C.batterySoft};font-variant-numeric:tabular-nums">${Math.round(soc)}%</div>
          </div>
          <div style="width:64%;height:4px;border-radius:2px;background:${C.neutral800};overflow:hidden">
            <div style="height:100%;border-radius:2px;background:${C.batteryStrong};width:${soc}%"></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline;gap:5.6px">
            <div style="font-size:20px;font-weight:500;color:${C.neutral100};font-variant-numeric:tabular-nums;line-height:1.1">${battVal}</div>
            <div style="font-size:11px;color:${C.neutral600}">${battSub}</div>
          </div>
        </div>
      </div>
      </div>

      <div style="height:1px;background:linear-gradient(90deg, transparent, ${C.divider} 48px, ${C.divider} calc(100% - 48px), transparent)"></div>

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:${C.neutral500}">
        <div style="display:flex;align-items:center;gap:16.8px">
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${C.solarStrong}"></span>solar DC</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${C.gridStrong}"></span>grid AC</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${C.batteryStrong}"></span>battery</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${C.loadStrong}"></span>house</span>
        </div>
        <div>Self-sufficiency now <span style="color:${C.text}">${selfNow}</span></div>
      </div>
    </div>
  `;
}
