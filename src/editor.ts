import { LitElement, html, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DeviceEntityConfig, EnergyCardConfig, HassLike } from "./types";

const SCHEMA = [
  {
    name: "variant",
    required: true,
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "1a", label: "1A — Wide panel (cost headline, bars, device breakdown)" },
          { value: "1b", label: "1B — Live flow tile (battery ring)" },
          { value: "1c", label: "1C — Compact cost tile (sparkline)" },
          { value: "2a", label: "2A — Energy flow diagram (PV/grid/inverter/battery/load)" },
        ],
      },
    },
  },
  { name: "title", selector: { text: {} } },
  {
    name: "entities",
    type: "expandable",
    title: "Entities",
    schema: [
      { name: "pv_power", selector: { entity: { domain: "sensor" } } },
      { name: "grid_power", selector: { entity: { domain: "sensor" } } },
      { name: "battery_power", selector: { entity: { domain: "sensor" } } },
      { name: "battery_soc", selector: { entity: { domain: "sensor" } } },
      { name: "load_power", selector: { entity: { domain: "sensor" } } },
      { name: "solar_energy", selector: { entity: { domain: "sensor" } } },
      { name: "grid_import_energy", selector: { entity: { domain: "sensor" } } },
      { name: "grid_export_energy", selector: { entity: { domain: "sensor" } } },
    ],
  },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "import_rate", selector: { number: { mode: "box", step: 0.001, min: 0 } } },
      { name: "export_rate", selector: { number: { mode: "box", step: 0.001, min: 0 } } },
      { name: "currency", selector: { text: {} } },
      { name: "power_unit", selector: { select: { mode: "dropdown", options: ["W", "kW"] } } },
      { name: "battery_capacity_kwh", selector: { number: { mode: "box", step: 0.1, min: 0 } } },
    ],
  },
] as const;

const LABELS: Record<string, string> = {
  variant: "Card layout",
  title: "Title (optional)",
  pv_power: "Solar power (W)",
  grid_power: "Grid power, signed: + import / − export (W)",
  battery_power: "Battery power, signed: + charging / − discharging (W)",
  battery_soc: "Battery state of charge (%)",
  load_power: "House load (W) — optional, derived if omitted",
  solar_energy: "Solar energy, cumulative (kWh)",
  grid_import_energy: "Grid import energy, cumulative (kWh)",
  grid_export_energy: "Grid export energy, cumulative (kWh)",
  import_rate: "Import rate (currency/kWh)",
  export_rate: "Export rate (currency/kWh)",
  currency: "Currency symbol",
  power_unit: "Power entity unit",
  battery_capacity_kwh: "Battery capacity (kWh)",
};

function computeLabel(schema: { name: string }): string {
  return LABELS[schema.name] || schema.name;
}

@customElement("energy-card-editor")
export class EnergyCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HassLike;
  @state() private _config?: EnergyCardConfig;

  setConfig(config: EnergyCardConfig): void {
    this._config = config;
  }

  private _fire(config: EnergyCardConfig): void {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  private _valueChanged = (ev: CustomEvent): void => {
    ev.stopPropagation();
    this._fire(ev.detail.value as EnergyCardConfig);
  };

  private _addDevice(): void {
    const devices = [...(this._config!.devices || []), { name: "New device", entity: "" }];
    this._fire({ ...this._config!, devices });
  }

  private _removeDevice(i: number): void {
    const devices = (this._config!.devices || []).filter((_, idx) => idx !== i);
    this._fire({ ...this._config!, devices });
  }

  private _updateDevice(i: number, patch: Partial<DeviceEntityConfig>): void {
    const devices = (this._config!.devices || []).map((d, idx) => (idx === i ? { ...d, ...patch } : d));
    this._fire({ ...this._config!, devices });
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const hasHaForm = !!customElements.get("ha-form");
    return html`
      ${hasHaForm
        ? html`<ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${SCHEMA}
            .computeLabel=${computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>`
        : this._fallbackForm()}

      <div class="devices">
        <div class="devices-title">Device breakdown (1A only, optional)</div>
        ${(this._config.devices || []).map(
          (d, i) => html`
            <div class="device-row">
              <input
                .value=${d.name}
                placeholder="Name"
                @change=${(e: Event) => this._updateDevice(i, { name: (e.target as HTMLInputElement).value })}
              />
              <input
                .value=${d.entity}
                placeholder="sensor.device_energy"
                @change=${(e: Event) => this._updateDevice(i, { entity: (e.target as HTMLInputElement).value })}
              />
              <button type="button" title="Remove" @click=${() => this._removeDevice(i)}>✕</button>
            </div>
          `
        )}
        <button type="button" class="add" @click=${() => this._addDevice()}>+ Add device</button>
      </div>
    `;
  }

  private _fallbackForm(): TemplateResult {
    const c = this._config!;
    const text = (label: string, path: string, value: string | undefined, onInput: (v: string) => void) => html`
      <label class="row">
        <span>${label}</span>
        <input .value=${value ?? ""} @change=${(e: Event) => onInput((e.target as HTMLInputElement).value)} />
      </label>
    `;
    return html`
      <div class="fallback-note">Entity pickers unavailable outside the Home Assistant frontend — using plain text fields.</div>
      ${text("Card layout (1a/1b/1c/2a)", "variant", c.variant, (v) => this._fire({ ...c, variant: v as EnergyCardConfig["variant"] }))}
      ${text("Solar power entity", "pv_power", c.entities.pv_power, (v) => this._fire({ ...c, entities: { ...c.entities, pv_power: v } }))}
      ${text("Grid power entity", "grid_power", c.entities.grid_power, (v) => this._fire({ ...c, entities: { ...c.entities, grid_power: v } }))}
      ${text("Battery power entity", "battery_power", c.entities.battery_power, (v) => this._fire({ ...c, entities: { ...c.entities, battery_power: v } }))}
      ${text("Battery SoC entity", "battery_soc", c.entities.battery_soc, (v) => this._fire({ ...c, entities: { ...c.entities, battery_soc: v } }))}
      ${text("Solar energy entity", "solar_energy", c.entities.solar_energy, (v) => this._fire({ ...c, entities: { ...c.entities, solar_energy: v } }))}
      ${text("Grid import energy entity", "grid_import_energy", c.entities.grid_import_energy, (v) => this._fire({ ...c, entities: { ...c.entities, grid_import_energy: v } }))}
      ${text("Grid export energy entity", "grid_export_energy", c.entities.grid_export_energy, (v) => this._fire({ ...c, entities: { ...c.entities, grid_export_energy: v } }))}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .devices {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color, #444);
    }
    .devices-title {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--secondary-text-color);
    }
    .device-row {
      display: grid;
      grid-template-columns: 1fr 1.4fr auto;
      gap: 8px;
      margin-bottom: 6px;
    }
    input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: var(--card-background-color, transparent);
      color: var(--primary-text-color, inherit);
    }
    button {
      font: inherit;
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: transparent;
      color: inherit;
    }
    button.add {
      padding: 6px 10px;
    }
    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .fallback-note {
      font-size: 12px;
      opacity: 0.7;
      margin-bottom: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "energy-card-editor": EnergyCardEditor;
  }
}
