import { LitElement, html, css, CSSResultGroup, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { C } from "./colors";
import { CARD_VERSION, VARIANT_LABELS } from "./const";
import { CardHost, RangeData } from "./host";
import { renderWidePanel } from "./variants/wide-panel";
import { renderLiveTile } from "./variants/live-tile";
import { renderCompactTile } from "./variants/compact-tile";
import { renderFlowDiagram } from "./variants/flow-diagram";
import { fetchEnergyChange, priorRangeSpec, rangeSpec, sumBuckets, buildSeries } from "./stats";
import { EnergyCardConfig, HassLike, Range } from "./types";
import "./editor";

const WIDTH: Record<string, number> = { "1a": 720, "1b": 340, "1c": 280, "2a": 660 };

@customElement("energy-card")
export class EnergyCard extends LitElement implements CardHost {
  @property({ attribute: false }) hass!: HassLike;

  @state() private _config!: EnergyCardConfig;
  @state() range: Range = "today";
  @state() mode: "cost" | "kwh" = "cost";
  @state() sel: number | null = null;
  @state() showDevices = false;
  @state() loading = false;

  private _dataByRange: Partial<Record<Range, RangeData>> = {};
  private _fetchToken = 0;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  get config(): EnergyCardConfig {
    return this._config;
  }

  get rangeData(): RangeData | undefined {
    return this._dataByRange[this.range];
  }

  static getStubConfig(): Partial<EnergyCardConfig> {
    return {
      variant: "1a",
      entities: {},
      import_rate: 0.28,
      export_rate: 0.155,
    };
  }

  static getConfigElement() {
    return document.createElement("energy-card-editor");
  }

  setConfig(config: EnergyCardConfig): void {
    if (!config?.variant) {
      throw new Error("energy-card: `variant` is required (one of 1a, 1b, 1c, 2a)");
    }
    this._config = { ...config, entities: config.entities ?? {} };
    this._dataByRange = {};
    this.sel = null;
    this.showDevices = false;
    this.range = "today";
    this._loadRange(this.range);
  }

  getCardSize(): number {
    return this._config?.variant === "2a" ? 6 : this._config?.variant === "1a" ? 5 : 3;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this._config) this._loadRange(this.range);
    this._refreshTimer = setInterval(() => this._loadRange(this.range, true), 5 * 60 * 1000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._refreshTimer) clearInterval(this._refreshTimer);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") && this.hass && this._config && !this._dataByRange[this.range]) {
      this._loadRange(this.range);
    }
  }

  setRange(r: Range): void {
    if (this.range === r) return;
    this.range = r;
    this.sel = null;
    this._loadRange(r);
  }

  setMode(m: "cost" | "kwh"): void {
    this.mode = m;
  }

  setSel(i: number | null): void {
    this.sel = i;
  }

  toggleDevices(): void {
    this.showDevices = !this.showDevices;
  }

  private async _loadRange(range: Range, force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    if (!force && this._dataByRange[range]) return;
    const ent = this._config.entities;
    const spec = rangeSpec(range);
    const prior = priorRangeSpec(spec);
    const ids = [ent.solar_energy, ent.grid_import_energy, ent.grid_export_energy];
    const token = ++this._fetchToken;
    this.loading = true;
    const [cur, prev] = await Promise.all([
      fetchEnergyChange(this.hass, ids, spec),
      fetchEnergyChange(this.hass, ids, prior),
    ]);
    if (token !== this._fetchToken) return;

    const solarBuckets = ent.solar_energy ? cur[ent.solar_energy] || [] : [];
    const importBuckets = ent.grid_import_energy ? cur[ent.grid_import_energy] || [] : [];
    const exportBuckets = ent.grid_export_energy ? cur[ent.grid_export_energy] || [] : [];
    const rows = buildSeries(range, spec, solarBuckets, importBuckets, exportBuckets, this.hass.locale?.language);

    const curSolar = sumBuckets(ent.solar_energy ? cur[ent.solar_energy] : undefined);
    const curImport = sumBuckets(ent.grid_import_energy ? cur[ent.grid_import_energy] : undefined);
    const curExport = sumBuckets(ent.grid_export_energy ? cur[ent.grid_export_energy] : undefined);
    const curSolarUsed = Math.max(0, curSolar - curExport);

    const prevSolar = sumBuckets(ent.solar_energy ? prev[ent.solar_energy] : undefined);
    const prevImport = sumBuckets(ent.grid_import_energy ? prev[ent.grid_import_energy] : undefined);
    const prevExport = sumBuckets(ent.grid_export_energy ? prev[ent.grid_export_energy] : undefined);
    const prevSolarUsed = Math.max(0, prevSolar - prevExport);

    const data: RangeData = {
      rows,
      solarUsed: curSolarUsed,
      gridImported: curImport,
      exported: curExport,
      totalKwh: curSolarUsed + curImport,
      prevTotalKwh: prevSolarUsed + prevImport,
    };

    if (this._config.devices?.length) {
      const devIds = this._config.devices.map((d) => d.entity);
      const devChange = await fetchEnergyChange(this.hass, devIds, spec);
      if (token !== this._fetchToken) return;
      data.devices = this._config.devices.map((d) => ({
        name: d.name,
        color: d.color,
        entity: d.entity,
        kwh: sumBuckets(devChange[d.entity]),
      }));
    }

    this._dataByRange = { ...this._dataByRange, [range]: data };
    this.loading = false;
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const variant = this._config.variant;
    let body: TemplateResult;
    switch (variant) {
      case "1a":
        body = renderWidePanel(this);
        break;
      case "1b":
        body = renderLiveTile(this);
        break;
      case "1c":
        body = renderCompactTile(this);
        break;
      case "2a":
        body = renderFlowDiagram(this);
        break;
      default:
        return html`<div style="padding:16px;color:${C.solarStrong}">energy-card: unknown variant "${variant}"</div>`;
    }
    return html`
      <div class="energy-card" style="max-width:${WIDTH[variant]}px">
        ${this._config.title
          ? html`<div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${C.neutral500};padding:0 0 12px">
              ${this._config.title}
            </div>`
          : nothing}
        ${body}
      </div>
    `;
  }

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      font-family: "Inter", system-ui, sans-serif;
    }
    .energy-card {
      width: 100%;
      background: #161826;
      color: #e9e9ed;
      border-radius: 14px;
      box-shadow: 0 0 0 1px #3f424d, 0 6px 18px rgba(0, 0, 0, 0.45);
      padding: 22.4px;
      box-sizing: border-box;
    }
    button {
      font-family: inherit;
    }
    @keyframes fdown {
      0% { transform: translateY(-8px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateY(84px); opacity: 0; }
    }
    @keyframes fup {
      0% { transform: translateY(84px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateY(-8px); opacity: 0; }
    }
    @keyframes fright {
      0% { transform: translateX(-8px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateX(84px); opacity: 0; }
    }
    @keyframes fleft {
      0% { transform: translateX(84px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateX(-8px); opacity: 0; }
    }
    @keyframes idle {
      0%, 100% { opacity: 0; }
    }
  `;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
  interface HTMLElementTagNameMap {
    "energy-card": EnergyCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "energy-card",
  name: "Energy Card",
  description: "Nocturne-themed energy dashboard card — wide panel, live flow tile, compact tile, or an animated PV/grid/inverter/battery/load diagram.",
  preview: true,
  documentationURL: "https://github.com/",
});

console.info(
  `%c ENERGY-CARD %c v${CARD_VERSION} (${Object.keys(VARIANT_LABELS).join(", ")}) `,
  "color:#161826;background:#9184d9;font-weight:700;",
  "color:#9184d9;background:#161826;font-weight:500;"
);
