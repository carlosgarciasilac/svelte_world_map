import { describe, expect, it } from "vitest";
import { countries, formatGdp } from "./country-gdp";

describe("world GDP data", () => {
  it("includes major economies and exposes the 2010 GDP values", () => {
    expect(countries.some((country) => country.id === "usa")).toBe(true);
    expect(countries.some((country) => country.id === "china")).toBe(true);
    expect(countries.some((country) => country.id === "germany")).toBe(true);
    expect(countries.find((country) => country.id === "usa")?.gdp)
      .toBeGreaterThan(10_000_000_000_000);
  });

  it("includes SVG-derived countries and keeps missing GDP entries at zero", () => {
    expect(countries.some((country) => country.gdp === 0)).toBe(true);
    expect(
      countries.some((country) =>
        country.id === "canada" && country.gdp === 1_610_000_000_000
      ),
    ).toBe(true);
    expect(
      countries.some((country) =>
        country.name === "United States" && country.path.length > 0
      ),
    ).toBe(true);
  });

  it("formats values for readable GDP labels", () => {
    expect(formatGdp(0)).toBe("$0");
    expect(formatGdp(14_960_000_000_000)).toBe("$14.96T");
    expect(formatGdp(2_570_000_000_000)).toBe("$2.57T");
    expect(formatGdp(1_200_000_000)).toBe("$1.20B");
  });
});
