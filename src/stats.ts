import { HassLike, Range, SeriesPoint } from "./types";

export interface RangeSpec {
  start: Date;
  end: Date;
  period: "hour" | "day";
}

/** Wall-clock window + bucket period for each range, mirroring the mock's Today/Week/Month tabs. */
export function rangeSpec(range: Range, now: Date = new Date()): RangeSpec {
  if (range === "today") {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end, period: "hour" };
  }
  if (range === "week") {
    const dow = (now.getDay() + 6) % 7; // Monday = 0
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - dow);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start, end, period: "day" };
  }
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end, period: "day" };
}

/** The equal-length window immediately preceding `spec`, for the "vs. last period" delta. */
export function priorRangeSpec(spec: RangeSpec): RangeSpec {
  const span = spec.end.getTime() - spec.start.getTime();
  return {
    start: new Date(spec.start.getTime() - span),
    end: new Date(spec.start.getTime()),
    period: spec.period,
  };
}

interface StatBucket {
  start: number;
  value: number;
}

/**
 * Per-bucket energy change (kWh) for each `total_increasing` statistic id,
 * via HA's recorder `statistics_during_period` websocket call.
 */
export async function fetchEnergyChange(
  hass: HassLike,
  entityIds: (string | undefined)[],
  spec: RangeSpec
): Promise<Record<string, StatBucket[]>> {
  const ids = Array.from(new Set(entityIds.filter((x): x is string => !!x)));
  if (!ids.length) return {};
  let result: Record<string, any[]>;
  try {
    result = await hass.callWS({
      type: "recorder/statistics_during_period",
      start_time: spec.start.toISOString(),
      end_time: spec.end.toISOString(),
      statistic_ids: ids,
      period: spec.period,
      types: ["change"],
    });
  } catch (e) {
    console.warn("[energy-card] statistics_during_period failed", e);
    return {};
  }
  const out: Record<string, StatBucket[]> = {};
  for (const id of ids) {
    const rows = result[id] || [];
    out[id] = rows.map((r) => ({
      start: typeof r.start === "number" ? r.start : new Date(r.start).getTime(),
      value: typeof r.change === "number" ? r.change : 0,
    }));
  }
  return out;
}

export function sumBuckets(buckets: StatBucket[] | undefined): number {
  if (!buckets) return 0;
  return buckets.reduce((a, b) => a + (b.value || 0), 0);
}

function slotKey(d: Date, period: "hour" | "day"): string {
  return period === "hour"
    ? `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`
    : `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function slotLabel(range: Range, d: Date, locale: string): string {
  if (range === "today") return String(d.getHours()).padStart(2, "0");
  if (range === "week") return d.toLocaleDateString(locale, { weekday: "short" });
  return d.toLocaleDateString(locale, { month: "short", day: "numeric" }).replace(".", "");
}

/**
 * Builds the fixed-length {label, solar, grid} rows the bar chart / sparkline
 * render, one row per hour (today) or day (week / month). Future slots (past
 * "now") come back as zero, same as the source mock's untouched hours.
 */
export function buildSeries(
  range: Range,
  spec: RangeSpec,
  solarBuckets: StatBucket[],
  gridImportBuckets: StatBucket[],
  gridExportBuckets: StatBucket[],
  locale = "en-US"
): SeriesPoint[] {
  const solarBy = new Map<string, number>();
  for (const b of solarBuckets) {
    const d = new Date(b.start);
    solarBy.set(slotKey(d, spec.period), (solarBy.get(slotKey(d, spec.period)) || 0) + b.value);
  }
  const importBy = new Map<string, number>();
  for (const b of gridImportBuckets) {
    const d = new Date(b.start);
    importBy.set(slotKey(d, spec.period), (importBy.get(slotKey(d, spec.period)) || 0) + b.value);
  }
  const exportBy = new Map<string, number>();
  for (const b of gridExportBuckets) {
    const d = new Date(b.start);
    exportBy.set(slotKey(d, spec.period), (exportBy.get(slotKey(d, spec.period)) || 0) + b.value);
  }

  const rows: SeriesPoint[] = [];
  const cur = new Date(spec.start);
  while (cur < spec.end) {
    const key = slotKey(cur, spec.period);
    const solarProduced = solarBy.get(key) || 0;
    const exported = exportBy.get(key) || 0;
    const solarUsed = Math.max(0, solarProduced - exported);
    const gridImported = importBy.get(key) || 0;
    rows.push({ label: slotLabel(range, cur, locale), solar: solarUsed, grid: gridImported });
    if (spec.period === "hour") cur.setHours(cur.getHours() + 1);
    else cur.setDate(cur.getDate() + 1);
  }
  return rows;
}
