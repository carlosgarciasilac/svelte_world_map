import { describe, expect, it } from 'vitest';
import {
	applyGuess,
	createRound,
	isRecentlyEradicated,
	MAX_SCORE,
	ongoingTargets,
	roundScore,
	scoreFor
} from './polio-game';
import { countries } from './country-gdp';

const YEAR = 2026;
const MISS_IDS = countries
	.filter((country) => !ongoingTargets.includes(country) && !isRecentlyEradicated(country, YEAR))
	.map((country) => country.id);

function playMisses(count: number) {
	return MISS_IDS.slice(0, count).reduce(
		(round, id) => applyGuess(round, id, YEAR),
		createRound()
	);
}

describe('polio hunt game', () => {
	it('starts a round with 6 attempts', () => {
		const round = createRound();

		expect(round.status).toBe('playing');
		expect(round.attemptsLeft).toBe(6);
	});

	it('lists Afghanistan and Pakistan as the ongoing targets', () => {
		expect(ongoingTargets.map((country) => country.id).sort()).toEqual(['af', 'pk']);
	});

	it('costs one attempt for a miss and keeps the round going', () => {
		const round = applyGuess(createRound(), MISS_IDS[0], YEAR);

		expect(round.attemptsLeft).toBe(5);
		expect(round.status).toBe('playing');
		expect(round.lastGuess?.result).toBe('miss');
	});

	it('loses the round with a score of 0 after six misses', () => {
		const round = playMisses(6);

		expect(round.status).toBe('lost');
		expect(round.attemptsLeft).toBe(0);
		expect(roundScore(round)).toBe(0);
	});

	it('ends the round on a target and scores 100 per unused attempt', () => {
		const round = applyGuess(playMisses(2), 'pk', YEAR);

		expect(round.status).toBe('won');
		expect(round.winnerId).toBe('pk');
		expect(round.attemptsLeft).toBe(4);
		expect(roundScore(round)).toBe(400);
	});

	it('caps the score at 500', () => {
		const round = applyGuess(createRound(), 'af', YEAR);

		expect(roundScore(round)).toBe(MAX_SCORE);
		expect(scoreFor(9)).toBe(MAX_SCORE);
	});

	it('grants a free extra attempt for a country eradicated in the last 10 years', () => {
		const round = applyGuess(createRound(), 'ng', YEAR);

		expect(round.attemptsLeft).toBe(7);
		expect(round.status).toBe('playing');
		expect(round.lastGuess?.result).toBe('bonus');
	});

	it('grants the recent-eradication bonus only once per country', () => {
		const first = applyGuess(createRound(), 'ng', YEAR);
		const second = applyGuess(first, 'ng', YEAR);

		expect(second.attemptsLeft).toBe(7);
		expect(second.lastGuess?.result).toBe('repeat');
	});

	it('does not cost an attempt when a tried country is clicked again', () => {
		const first = applyGuess(createRound(), MISS_IDS[0], YEAR);
		const second = applyGuess(first, MISS_IDS[0], YEAR);

		expect(second.attemptsLeft).toBe(5);
		expect(second.lastGuess?.result).toBe('repeat');
	});

	it('ignores countries that are not part of the game', () => {
		const round = applyGuess(createRound(), 'not-a-country', YEAR);

		expect(round.attemptsLeft).toBe(6);
		expect(round.lastGuess?.result).toBe('ignored');
	});

	it('does not change a round that has already ended', () => {
		const lost = playMisses(6);
		const after = applyGuess(lost, 'af', YEAR);

		expect(after.status).toBe('lost');
		expect(after.winnerId).toBeNull();
	});

	it('treats 2016 as inside the 10-year window for the current year', () => {
		const nigeria = countries.find((country) => country.id === 'ng');

		expect(nigeria && isRecentlyEradicated(nigeria, 2026)).toBe(true);
		expect(nigeria && isRecentlyEradicated(nigeria, 2027)).toBe(false);
	});
});
