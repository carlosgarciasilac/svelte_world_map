import polioData from "./countries-with-polio-2026.json" with { type: "json" };
import gdpByCode from "./gdp-2020.json" with { type: "json" };

export type Country = {
  id: string;
  name: string;
  gdp: number | null;
  DateCountryDeclaredPolioFree: number | null;
  WildPoliovirusCasesByCountry_2025: number | null;
};

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

export function normalizeCountryId(rawId: string): string {
  const value = rawId.trim().toLowerCase();
  return value.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// GDP: World Bank NY.GDP.MKTP.CD (current US$), 2020
const gdp2020: Record<string, number | null> = gdpByCode;

export const countries: Country[] = polioData.map((entry) => ({
  id: entry.flagCode.toLowerCase(),
  name: entry.country,
  gdp: gdp2020[entry.flagCode] ?? null,
  DateCountryDeclaredPolioFree: entry.DateCountryDeclaredPolioFree,
  WildPoliovirusCasesByCountry_2025: entry.WildPoliovirusCasesByCountry_2025,
}));
