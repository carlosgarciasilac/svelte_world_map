import worldMapSvg from "./world.svg?raw";

export type Country = {
  id: string;
  name: string;
  gdp: number;
  path: string;
  x: number;
  y: number;
  fill?: string;
};

const GDP_BY_ID: Record<string, number> = {
  usa: 14_964_000_000_000,
  canada: 1_610_000_000_000,
  mexico: 894_000_000_000,
  brazil: 2_208_000_000_000,
  uk: 2_251_000_000_000,
  germany: 3_417_000_000_000,
  france: 2_574_000_000_000,
  italy: 2_154_000_000_000,
  russia: 1_524_000_000_000,
  india: 1_708_000_000_000,
  china: 6_085_000_000_000,
  japan: 5_700_000_000_000,
  australia: 1_141_000_000_000,
  "south-africa": 375_000_000_000,
};

const SVG_ID_ALIASES: Record<string, string> = {
  us: "usa",
  ca: "canada",
  mx: "mexico",
  br: "brazil",
  gb: "uk",
  de: "germany",
  fr: "france",
  it: "italy",
  ru: "russia",
  in: "india",
  cn: "china",
  jp: "japan",
  au: "australia",
  za: "south-africa",
};

const FALLBACK_COUNTRIES: Country[] = [
  {
    id: "usa",
    name: "United States",
    gdp: GDP_BY_ID.usa,
    path:
      "M60 105 L116 98 L148 107 L162 120 L154 142 L125 154 L88 170 L64 150 L52 128 Z",
    x: 100,
    y: 128,
    fill: "#7dd3fc",
  },
  {
    id: "canada",
    name: "Canada",
    gdp: GDP_BY_ID.canada,
    path: "M120 70 L196 52 L220 64 L212 87 L178 96 L146 100 L128 88 Z",
    x: 170,
    y: 74,
    fill: "#a5f3fc",
  },
  {
    id: "mexico",
    name: "Mexico",
    gdp: GDP_BY_ID.mexico,
    path: "M90 170 L146 168 L162 186 L150 220 L110 225 L82 208 Z",
    x: 118,
    y: 194,
    fill: "#67e8f9",
  },
  {
    id: "brazil",
    name: "Brazil",
    gdp: GDP_BY_ID.brazil,
    path: "M210 235 L286 245 L323 282 L298 334 L238 360 L196 326 L188 280 Z",
    x: 250,
    y: 292,
    fill: "#34d399",
  },
  {
    id: "uk",
    name: "United Kingdom",
    gdp: GDP_BY_ID.uk,
    path: "M338 82 L356 79 L365 92 L356 106 L341 104 Z",
    x: 350,
    y: 92,
    fill: "#fde68a",
  },
  {
    id: "germany",
    name: "Germany",
    gdp: GDP_BY_ID.germany,
    path: "M370 104 L402 96 L418 104 L410 122 L382 128 L364 116 Z",
    x: 390,
    y: 112,
    fill: "#fcd34d",
  },
  {
    id: "france",
    name: "France",
    gdp: GDP_BY_ID.france,
    path: "M356 120 L388 118 L398 138 L382 152 L350 146 L342 130 Z",
    x: 372,
    y: 136,
    fill: "#fbbf24",
  },
  {
    id: "italy",
    name: "Italy",
    gdp: GDP_BY_ID.italy,
    path: "M390 144 L410 142 L424 154 L420 170 L398 178 L382 160 Z",
    x: 404,
    y: 160,
    fill: "#f59e0b",
  },
  {
    id: "russia",
    name: "Russia",
    gdp: GDP_BY_ID.russia,
    path: "M420 70 L520 62 L588 84 L604 126 L560 148 L492 166 L434 122 Z",
    x: 505,
    y: 108,
    fill: "#c4b5fd",
  },
  {
    id: "india",
    name: "India",
    gdp: GDP_BY_ID.india,
    path: "M520 175 L572 170 L610 188 L598 228 L556 242 L518 220 Z",
    x: 560,
    y: 206,
    fill: "#f9a8d4",
  },
  {
    id: "china",
    name: "China",
    gdp: GDP_BY_ID.china,
    path:
      "M578 145 L648 138 L686 150 L706 176 L694 220 L648 240 L592 220 L572 180 Z",
    x: 640,
    y: 180,
    fill: "#fca5a5",
  },
  {
    id: "japan",
    name: "Japan",
    gdp: GDP_BY_ID.japan,
    path: "M694 176 L722 170 L736 188 L728 212 L698 210 L684 194 Z",
    x: 712,
    y: 188,
    fill: "#fda4af",
  },
  {
    id: "australia",
    name: "Australia",
    gdp: GDP_BY_ID.australia,
    path: "M720 318 L806 312 L838 332 L822 380 L756 386 L706 348 Z",
    x: 772,
    y: 345,
    fill: "#86efac",
  },
  {
    id: "south-africa",
    name: "South Africa",
    gdp: GDP_BY_ID["south-africa"],
    path: "M438 312 L470 304 L486 330 L472 356 L440 350 L430 326 Z",
    x: 456,
    y: 330,
    fill: "#93c5fd",
  },
];

export function normalizeCountryId(rawId: string): string {
  const value = rawId.trim().toLowerCase();
  return SVG_ID_ALIASES[value] ??
    value.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildCountriesFromSvg(): Country[] {
  if (typeof DOMParser === "undefined") {
    return FALLBACK_COUNTRIES;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(worldMapSvg, "image/svg+xml");
  const groups = Array.from(doc.querySelectorAll("g[id]"));
  const countriesById = new Map<string, Country>();

  for (const group of groups) {
    const svgId = group.getAttribute("id") ?? "";
    const title = group.querySelector("title")?.textContent?.trim();
    if (!svgId || !title) continue;

    const paths = Array.from(group.querySelectorAll("path"))
      .map((path) => path.getAttribute("d"))
      .filter((d): d is string => !!d && d.length > 0);
    if (paths.length === 0) continue;

    const countryId = normalizeCountryId(svgId);
    const countryName = title.replace(/\s+/g, " ").trim();
    const existing = countriesById.get(countryId) ?? {
      id: countryId,
      name: countryName,
      gdp: GDP_BY_ID[countryId] ?? 0,
      path: "",
      x: 0,
      y: 0,
    };

    existing.name = countryName;
    existing.path = existing.path
      ? `${existing.path} ${paths.join(" ")}`
      : paths.join(" ");
    existing.gdp = GDP_BY_ID[countryId] ?? existing.gdp ?? 0;
    countriesById.set(countryId, existing);
  }

  return Array.from(countriesById.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function formatGdp(value: number): string {
  if (value === 0) {
    return "$0";
  }
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  return `$${(value / 1_000_000).toFixed(2)}M`;
}

export const countries: Country[] = buildCountriesFromSvg();
