import { describe, expect, it } from "vitest";
import { countries, formatGdp } from "./country-gdp";

describe("world GDP data", () => {
  it("uses lowercase ISO2 ids and exposes 2020 GDP values", () => {
    expect(countries.some((country) => country.id === "us")).toBe(true);
    expect(countries.some((country) => country.id === "cn")).toBe(true);
    expect(countries.some((country) => country.id === "de")).toBe(true);
    expect(countries.find((country) => country.id === "us")?.gdp)
      .toBeGreaterThan(10_000_000_000_000);
  });

  it("keeps polio fields and uses null for missing GDP", () => {
    const pakistan = countries.find((country) => country.id === "pk");
    expect(pakistan?.name).toBe("Pakistan");
    expect(pakistan?.WildPoliovirusCasesByCountry_2025).toBe(31);
    expect(pakistan?.DateCountryDeclaredPolioFree).toBeNull();
    expect(countries.find((country) => country.id === "kp")?.gdp).toBeNull();
  });

  it("formats values for readable GDP labels", () => {
    expect(formatGdp(0)).toBe("$0");
    expect(formatGdp(14_960_000_000_000)).toBe("$14.96T");
    expect(formatGdp(2_570_000_000_000)).toBe("$2.57T");
    expect(formatGdp(1_200_000_000)).toBe("$1.20B");
  });
});
