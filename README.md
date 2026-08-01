# HA Energy Dashboard — Energy Card

A Home Assistant Lovelace custom card for an energy dashboard, in the
**Nocturne** dark theme. It implements four layouts, each addressable as its
own `variant`:

- **1a** — wide panel: cost/kWh headline, Today / Week / Month tabs, a cost↔kWh
  toggle, tappable hourly (or daily) bars with a tooltip, solar/grid/export/
  self-sufficiency summary, and an expandable device breakdown.
- **1b** — live flow tile: current draw, cost/hour, a solar/grid/battery split,
  a battery state-of-charge ring, and today's running total.
- **1c** — compact tile: today's cost headline, a sparkline, self-sufficiency,
  battery and export summary.
- **2a** — energy flow diagram: an animated PV → inverter → house / grid /
  battery cross-layout, with flow direction and dot speed following live power,
  a battery SoC bar, and per-leg kW + % of supply.

The card renders a fixed dark palette by design rather than following Home
Assistant's light/dark theme.

## Install

### Manual

```sh
npm install
npm run build
```

This produces `energy-card.js` in the repo root. Copy it into your Home
Assistant `config/www/` folder (e.g. `config/www/energy-card.js`), then add it
as a Lovelace resource:

Settings → Dashboards → ⋮ → Resources → Add resource

- URL: `/local/energy-card.js`
- Resource type: JavaScript module

### HACS

Add this repository to HACS as a custom repository (category: Dashboard),
then install "Energy Card" — `hacs.json` is already set up for that.

## Configure

Add a card with `type: custom:energy-card`. Every entity is optional except
`variant`; omit what you don't have and that part of the card degrades
gracefully (e.g. no `battery_soc` hides the battery ring).

```yaml
type: custom:energy-card
variant: 1a
title: Home energy
entities:
  pv_power: sensor.solar_power               # W, current
  grid_power: sensor.grid_power               # W, current; + import / − export
  battery_power: sensor.battery_power         # W, current; + charging / − discharging
  battery_soc: sensor.battery_state_of_charge # %
  load_power: sensor.house_load_power         # W, current (optional — derived if omitted)
  solar_energy: sensor.solar_energy_total          # kWh, total_increasing
  grid_import_energy: sensor.grid_import_energy    # kWh, total_increasing
  grid_export_energy: sensor.grid_export_energy    # kWh, total_increasing
import_rate: 0.28     # currency / kWh
export_rate: 0.155    # currency / kWh
currency: "$"
devices:               # 1A's "Show device breakdown" — each is a kWh total_increasing sensor
  - name: Heat pump
    entity: sensor.heat_pump_energy
    color: "#9184d9"
  - name: EV charger
    entity: sensor.ev_charger_energy
```

The `power_unit` field (`W`, the default, or `kW`) tells the card what unit
the four `*_power` entities report in. `battery_capacity_kwh` (kWh) enables
1B's "charging to 100% by …" estimate.

Add one card per variant (`1a`, `1b`, `1c`, `2a`) — they can all point at the
same `entities` block.

### Where the numbers come from

- **Live values** (1B's draw/battery ring, 2A's whole diagram) read the
  `*_power` and `battery_soc` entities directly off `hass.states` — no history
  lookups, updates as fast as your sensors do.
- **Historical values** (1A's bars/device breakdown, 1C's sparkline, the
  Today/Week/Month totals and the "vs. last period" delta) come from Home
  Assistant's recorder long-term statistics
  (`recorder/statistics_during_period`) for the `solar_energy`,
  `grid_import_energy`, `grid_export_energy` and `devices[].entity` sensors —
  the same mechanism the built-in Energy dashboard uses. Those sensors need to
  be `state_class: total_increasing`, `device_class: energy` and have recorder
  history for the stats to populate; the card refreshes them every 5 minutes.
- Solar "used" is approximated as `solar produced − grid exported` for the
  selected window; house load (when `load_power` isn't configured) is derived
  from the instantaneous energy balance
  `pv + battery discharge + grid import − battery charge − grid export`.

## Develop

```sh
npm install
npm run watch      # rebuild on change
npm run typecheck
```

Source lives under `src/`:

- `energy-card.ts` — the custom element: variant dispatch, config, statistics
  fetching/caching
- `variants/{wide-panel,live-tile,compact-tile,flow-diagram}.ts` — the four
  layouts (1a/1b/1c/2a)
- `stats.ts` / `flow.ts` — the HA recorder-statistics layer and the live
  power-balance math
- `editor.ts` — the `ha-form`-based Lovelace config editor
