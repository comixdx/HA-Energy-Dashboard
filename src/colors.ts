/**
 * Nocturne design-system tokens, inlined from styles.css. The card renders a
 * fixed dark theme by design (the source mockup's `theme_mode: Dark` choice),
 * independent of Home Assistant's own light/dark theme.
 */
export const C = {
  bg: "#161826",
  surface: "#232532",
  text: "#e9e9ed",
  accent: "#9184d9",
  accent2: "#a7a1db",
  divider: "rgba(233,233,237,0.16)",

  neutral100: "#f3f5fe",
  neutral200: "#e4e7f5",
  neutral300: "#cfd3e5",
  neutral400: "#b2b6ca",
  neutral500: "#9397ab",
  neutral600: "#75798c",
  neutral700: "#595d6c",
  neutral800: "#3f424d",
  neutral900: "#292b31",

  accent100: "#f5f4ff",
  accent200: "#e7e5fe",
  accent300: "#d2cefd",
  accent400: "#b5abfc",
  accent500: "#968ae0",
  accent600: "#796cbf",
  accent700: "#5d5294",
  accent800: "#423a6a",
  accent900: "#2b2741",

  solar: "#d1a05e",
  solarStrong: "#ef9f27",
  solarSoft: "#fac775",
  solarRing: "#412402",

  grid: "#75798c",
  gridStrong: "#378add",
  gridSoft: "#85b7eb",
  gridRing: "#042c53",

  inverterStrong: "#1d9e75",
  inverterSoft: "#5dcaa5",
  inverterRing: "#04342c",

  loadStrong: "#639922",
  loadSoft: "#97c459",
  loadRing: "#173404",

  batteryStrong: "#d4537e",
  batterySoft: "#ed93b1",
  batteryRing: "#4b1528",

  shadowMd: "0 0 0 1px #3f424d, 0 6px 18px rgba(0,0,0,0.45)",
} as const;
