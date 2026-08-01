# HA Energy Dashboard — Energy Card

A custom card for Home Assistant's dashboards (Lovelace) that shows your
solar, grid, and battery energy in a dark, polished style called
**Nocturne**. It always renders in this dark style, even if the rest of your
Home Assistant uses a light theme.

If you have solar panels, a battery, or just want a clearer view of your
grid usage than the built-in Energy dashboard gives you, this card is for
you. You pick which of your existing sensors to plug in, and the card takes
care of the layout, math, and animation.

## What you get: 4 card styles ("variants")

The card can render in four different layouts. You add one (or several) to
your dashboard and pick which with a `variant` setting. You don't need all
four — pick whichever fits the space you have.

| Variant | Name | What it shows |
|---|---|---|
| `1a` | Wide panel | A big "money/energy spent" number, Today/Week/Month tabs, a bar chart you can tap through, and a breakdown of solar vs. grid vs. exported. Optionally lists individual devices (e.g. "Heat pump", "EV charger") and how much energy each used. |
| `1b` | Live flow tile | What's happening right now: how much power you're drawing, what it's costing per hour, how much is coming from solar/grid/battery, and a ring showing battery charge. |
| `1c` | Compact tile | A small card: today's cost, a mini trend line (sparkline), self-sufficiency %, battery, and exported energy. Good for tight dashboard spaces. |
| `2a` | Energy flow diagram | An animated diagram with solar, grid, battery, and your house load connected to a central inverter — arrows/dots move to show power actually flowing, in real time. |

You can add more than one card and point them all at the same sensors — for
example, the flow diagram (`2a`) for an at-a-glance view, plus the wide panel
(`1a`) for the daily/weekly numbers.

## Before you start: what you need

This card doesn't create any data itself — it displays sensors you already
have in Home Assistant (from your solar inverter integration, a smart meter,
a battery integration, etc.). Nothing is required except picking a
**variant**; every sensor is optional, and each part of the card simply
hides itself if you don't provide the sensor it needs.

That said, here's what unlocks what:

| If you have a sensor for... | You get... |
|---|---|
| Current solar power (W) | Solar production number, and the "%  of supply" figures |
| Current grid power (W, +import / −export) | Grid draw/export numbers |
| Current battery power (W, +charging / −discharging) | Battery charge/discharge numbers and animation |
| Battery state of charge (%) | The battery percentage ring/bar |
| Current house load (W) | House draw number (if you skip this, the card calculates an estimate for you automatically) |
| Cumulative solar/grid-import/grid-export energy (kWh, ever-increasing totals) | The historical bar charts, sparkline, and Today/Week/Month totals in variants `1a` and `1c` |

If you're not sure what sensors your solar/battery integration exposes, open
**Settings → Devices & Services → Entities** in Home Assistant and search for
your inverter or meter's name — most integrations expose both "current
power" and "total energy" sensors like the ones above.

## Installing the card

You have two options. **HACS is strongly recommended** — it's easier and
handles updates for you.

### Option A — HACS (recommended)

If you don't have [HACS](https://hacs.xyz/) installed yet, install that
first (it's a popular Home Assistant add-on for installing community
dashboard cards and integrations).

1. In Home Assistant, go to **HACS**.
2. Click the **⋮** (three dots) menu in the top right → **Custom repositories**.
3. Add this repository's URL, choose category **Dashboard**, and click **Add**.
4. Search for **"Energy Card"** in HACS and click **Download**.
5. Refresh your browser (Home Assistant needs a reload to pick up new cards).

### Option B — Manual install

Use this if you'd rather not install HACS.

1. Download this repository (or build it yourself — see [For developers](#for-developers) below) to get a file named `energy-card.js`.
2. Copy `energy-card.js` into your Home Assistant config folder, inside `www/` — the full path should look like `config/www/energy-card.js`.
   - Don't know where your config folder is? It's the folder that contains `configuration.yaml`.
3. In Home Assistant, go to **Settings → Dashboards**, click the **⋮** menu (top right) → **Resources**.
4. Click **Add Resource** and enter:
   - **URL:** `/local/energy-card.js`
   - **Resource type:** **JavaScript Module** (this exact setting matters — see [Troubleshooting](#troubleshooting) below)
5. Refresh your browser.

## Adding the card to a dashboard

1. Open the dashboard you want to add it to, click **Edit Dashboard** (pencil icon), then **+ Add Card**.
2. Search for **"Energy Card"** and select it.
3. A settings form appears — pick a **Card layout** (one of `1a`/`1b`/`1c`/`2a` from the table above), then use the entity pickers to select your solar/grid/battery/load sensors.
4. Click **Save**.

That's it — no YAML editing needed. The rest of this README covers the YAML
form for people who prefer editing dashboards as code, plus what every
setting means.

### The full YAML version, explained

If you edit dashboards in YAML mode (or want to copy-paste a starting
config), here's a complete example with every field explained:

```yaml
type: custom:energy-card
variant: 1a              # which layout: 1a, 1b, 1c, or 2a
title: Home energy       # optional card title

entities:
  pv_power: sensor.solar_power                     # W, current solar output
  grid_power: sensor.grid_power                    # W, current; positive = importing, negative = exporting
  battery_power: sensor.battery_power               # W, current; positive = charging, negative = discharging
  battery_soc: sensor.battery_state_of_charge       # %, battery charge level
  load_power: sensor.house_load_power               # W, current house draw (optional — the card estimates this if you leave it out)
  solar_energy: sensor.solar_energy_total           # kWh running total, always increasing
  grid_import_energy: sensor.grid_import_energy     # kWh running total, always increasing
  grid_export_energy: sensor.grid_export_energy     # kWh running total, always increasing

import_rate: 0.28        # what you pay per kWh from the grid (defaults to 0.28 if omitted)
export_rate: 0.155       # what you're paid per kWh exported (defaults to 0.155 if omitted)
currency: "$"            # currency symbol shown next to money amounts (defaults to "$")
power_unit: W            # unit your *_power sensors report in: "W" (default) or "kW"
battery_capacity_kwh: 10 # optional — usable battery size in kWh, enables a "full by <time>" estimate on variant 1b

devices:                 # optional — powers the "Show device breakdown" list on variant 1a only
  - name: Heat pump
    entity: sensor.heat_pump_energy   # kWh running total
    color: "#9184d9"                  # optional bar color
  - name: EV charger
    entity: sensor.ev_charger_energy
```

Every entry under `entities:` and everything below it is optional — leave
out whatever you don't have, and that part of the card just won't show. The
only truly required field is `variant`.

To use more than one layout, add a separate card for each `variant` — they
can all reuse the same `entities:` block.

### Where do the numbers actually come from?

- **"Right now" numbers** (variant `1b`'s draw/battery ring, and all of
  variant `2a`'s diagram) come straight from your sensors' current state —
  no delay, updates as fast as your sensors do.
- **Historical numbers** (variant `1a`'s bar chart and device breakdown,
  `1c`'s sparkline, and the Today/Week/Month totals and "vs. last period"
  percentage) come from Home Assistant's built-in long-term statistics — the
  same history mechanism the standard Energy dashboard uses. For these to
  work, your `solar_energy` / `grid_import_energy` / `grid_export_energy` /
  device sensors need to be set up as `state_class: total_increasing` and
  `device_class: energy` (most solar/meter integrations already do this by
  default) and need to have accumulated some history — the card refreshes
  these numbers every 5 minutes.
- "Solar used" is estimated as solar produced minus solar exported over the
  time period shown. House load, when you don't provide `load_power`
  directly, is estimated from the other sensors:
  `solar + battery discharging + grid import − battery charging − grid export`.

## Troubleshooting

**Dashboard editor shows "Configuration error: Custom element doesn't exist:
energy-card"**

This means Home Assistant hasn't loaded the card's file yet — it's a setup
issue, not a broken card. Check, in order:

1. **Settings → Dashboards → ⋮ → Resources** — is there an entry for
   `energy-card.js`? If not, it was never registered; go back through the
   install steps above.
2. Is its **Resource type** set to **JavaScript Module**? This is the most
   common mistake — "JavaScript File" will not work and produces exactly
   this error.
3. If you installed manually, is the file really at `config/www/energy-card.js`
   and does the resource URL say `/local/energy-card.js`?
4. Hard-refresh your browser (Ctrl+Shift+R, or Cmd+Shift+R on Mac) — Home
   Assistant aggressively caches resource files, so an update to the file
   sometimes needs a forced reload to show up.
5. If you use both HACS and a manual resource entry for the same card,
   remove one — duplicate/conflicting entries can also cause this.

**A part of the card isn't showing (e.g. no battery ring)**

That's expected if you haven't provided the sensor it depends on — check the
table under [Before you start](#before-you-start-what-you-need) for what
each sensor unlocks.

## For developers

Building the card from source, or changing it:

```sh
npm install
npm run watch      # rebuilds energy-card.js automatically on save
npm run typecheck  # type-checks without emitting
npm run build      # one-off production build → energy-card.js
```

Source layout, under `src/`:

- `energy-card.ts` — the custom element itself: variant dispatch, config
  handling, statistics fetching/caching.
- `variants/{wide-panel,live-tile,compact-tile,flow-diagram}.ts` — the four
  layouts (`1a`/`1b`/`1c`/`2a`).
- `stats.ts` / `flow.ts` — the Home Assistant recorder-statistics layer and
  the live power-balance math.
- `format.ts` — unit conversion and import/export rate/currency helpers.
- `host.ts` — the `CardHost` interface and range-data shape the variant
  renderers read from.
- `types.ts` — shared config/entity types (`EnergyCardConfig`, `Variant`,
  `Range`, …).
- `colors.ts` / `const.ts` — the Nocturne palette tokens and small shared
  constants (variant labels, card version).
- `editor.ts` — the visual, `ha-form`-based config editor used when you add
  the card through the dashboard UI.
