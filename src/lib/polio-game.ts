import { countries, type Country } from "./country-gdp";

export const STARTING_ATTEMPTS = 6;
export const POINTS_PER_ATTEMPT = 100;
export const MAX_SCORE = 500;
const RECENT_YEARS = 10;

export type GuessResult = "hit" | "miss" | "bonus" | "repeat" | "ignored";

export type RoundState = {
  status: "playing" | "won" | "lost";
  attemptsLeft: number;
  tried: ReadonlySet<string>;
  winnerId: string | null;
  lastGuess: { countryId: string; result: GuessResult } | null;
};

const countryById = new Map(countries.map((country) => [country.id, country]));

export const ongoingTargets = countries.filter(isOngoingTarget);

export function createRound(): RoundState {
  return {
    status: "playing",
    attemptsLeft: STARTING_ATTEMPTS,
    tried: new Set(),
    winnerId: null,
    lastGuess: null,
  };
}

export function isOngoingTarget(country: Country): boolean {
  return (country.WildPoliovirusCasesByCountry_2025 ?? 0) > 0;
}

export function isRecentlyEradicated(
  country: Country,
  currentYear = new Date().getFullYear(),
): boolean {
  const year = country.DateCountryDeclaredPolioFree;
  return year !== null && year >= currentYear - RECENT_YEARS;
}

export function scoreFor(attemptsLeft: number): number {
  return Math.min(attemptsLeft * POINTS_PER_ATTEMPT, MAX_SCORE);
}

export function roundScore(round: RoundState): number {
  return round.status === "won" ? scoreFor(round.attemptsLeft) : 0;
}

export function applyGuess(
  round: RoundState,
  countryId: string,
  currentYear = new Date().getFullYear(),
): RoundState {
  if (round.status !== "playing") {
    return round;
  }

  const country = countryById.get(countryId);
  if (!country) {
    return { ...round, lastGuess: { countryId, result: "ignored" } };
  }

  if (round.tried.has(countryId)) {
    return { ...round, lastGuess: { countryId, result: "repeat" } };
  }

  const tried = new Set(round.tried).add(countryId);

  if (isOngoingTarget(country)) {
    return {
      ...round,
      status: "won",
      tried,
      winnerId: countryId,
      lastGuess: { countryId, result: "hit" },
    };
  }

  if (isRecentlyEradicated(country, currentYear)) {
    return {
      ...round,
      attemptsLeft: round.attemptsLeft + 1,
      tried,
      lastGuess: { countryId, result: "bonus" },
    };
  }

  const attemptsLeft = round.attemptsLeft - 1;
  return {
    ...round,
    attemptsLeft,
    status: attemptsLeft === 0 ? "lost" : "playing",
    tried,
    lastGuess: { countryId, result: "miss" },
  };
}
