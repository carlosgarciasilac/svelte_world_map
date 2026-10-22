<script lang="ts">
	import { countries, formatGdp } from '$lib/country-gdp';
	import polioEradicationData from '$lib/countries-with-polio-2026.json';
	import {
		applyGuess,
		createRound,
		ongoingTargets,
		roundScore,
		type RoundState
	} from '$lib/polio-game';
	import World from '$lib/world.svelte';

	type CountrySelectDetail = {
		id: string;
		name: string;
	};

	type PolioCountryRecord = {
		flagCode: string;
		country: string;
		DateCountryDeclaredPolioFree: number | null;
		WildPoliovirusCasesByCountry_2025: number | null;
	};

	const polioByCountry = new Map(
		(polioEradicationData as PolioCountryRecord[]).map((entry) => [entry.country, entry])
	);
	const POLIO_NAME_ALIASES: Record<string, string> = {
		'The United Kingdom': 'United Kingdom',
		'United Kingdom': 'United Kingdom',
		'Congo': 'Republic of the Congo',
		'Republic of Congo': 'Republic of the Congo',
		'Macedonia': 'North Macedonia',
		'North Macedonia': 'North Macedonia'
	};

	let round = $state<RoundState>(createRound());
	const winner = $derived(countries.find((country) => country.id === round.winnerId) ?? null);
	const winnerPolioStatus = $derived(winner ? getPolioStatus(winner.name) : null);
	const score = $derived(roundScore(round));
	const lastMessage = $derived(getLastMessage(round));
	const lastCountry = $derived(countries.find((country) => country.id === round.lastGuess?.countryId) ?? null);
	const lastCountryPolioStatus = $derived(lastCountry ? getPolioStatus(lastCountry.name) : null);

	function getPolioStatus(countryName: string): string {
		const lookupName = POLIO_NAME_ALIASES[countryName] ?? countryName;
		const record = polioByCountry.get(lookupName) ?? null;

		if (record?.WildPoliovirusCasesByCountry_2025 !== null && record?.WildPoliovirusCasesByCountry_2025 !== undefined) {
			const caseCount = record.WildPoliovirusCasesByCountry_2025;
			if (caseCount !== null && caseCount > 0) {
				return 'Eradication is ongoing';
			}
		}

		if (record?.DateCountryDeclaredPolioFree === null || record?.DateCountryDeclaredPolioFree === undefined) {
			return 'No eradication year available';
		}

		return `Eradicated in ${record.DateCountryDeclaredPolioFree}`;
	}

	function getCountryName(countryId: string): string {
		return countries.find((country) => country.id === countryId)?.name ?? countryId;
	}

	function getLastMessage(state: RoundState): string | null {
		const guess = state.lastGuess;
		if (!guess) {
			return null;
		}

		const name = getCountryName(guess.countryId);

		switch (guess.result) {
			case 'hit':
				return `${name} still has wild polio cases. Target found!`;
			case 'miss':
				return `${name} is not an active target. Attempts left: ${state.attemptsLeft}.`;
			case 'bonus':
				return `${name} was declared polio-free within the last 10 years. +1 attempt, no cost.`;
			case 'repeat':
				return `You already tried ${name}.`;
			case 'ignored':
				return "That country isn't part of this game.";
		}
	}

	function handleCountrySelect(detail: CountrySelectDetail) {
		round = applyGuess(round, detail.id);
	}

	function startNewRound() {
		round = createRound();
	}
</script>

<svelte:head>
	<title>World GDP Map</title>
</svelte:head>

<div class="page">
	<header class="header">
		<p class="eyebrow">how are we doing with polio eradication?</p>
		<h1>Countries and Polio Eradication Status</h1>
		<p class="note">
			Click a country on the map. Countries declared polio-free within the last 10 years give you an
			extra attempt.
		</p>
	</header>

	<div class="layout">
		<div class="map-panel">
			<World onCountrySelect={handleCountrySelect}></World>
		</div>

		<aside class="sidebar">
			{#if round.status === 'playing'}
				<h2>Find a country with ongoing polio eradication</h2>
				<div class="country-card">
					<span class="label">Attempts left</span>
					<p class="score">{round.attemptsLeft}</p>
					{#if lastMessage}
						<p class="polio-status">{lastMessage}</p>
					{/if}
					{#if lastCountry}
						<h3>{lastCountry.name}</h3>
						<p class="polio-status">{lastCountryPolioStatus}</p>
					{/if}
				</div>
			{:else if round.status === 'won' && winner}
				<h2>Round won</h2>
				<div class="country-card">
					<span class="label">Score</span>
					<p class="score">{score}</p>
					<p class="note">{round.attemptsLeft} attempts left × 100, capped at 500</p>
					<h3>{winner.name}</h3>
					{#if winner.gdp !== null}
						<p class="gdp">{formatGdp(winner.gdp)}</p>
					{:else}
						<p class="gdp">GDP not available</p>
					{/if}
					<p class="note">2020 nominal GDP</p>
					<p class="polio-status">{winnerPolioStatus}</p>
				</div>
			{:else}
				<h2>Round lost</h2>
				<div class="country-card">
					<span class="label">Score</span>
					<p class="score">{score}</p>
					<p class="note">Out of attempts. Countries still reporting wild polio cases in 2025:</p>
					<ul class="targets">
						{#each ongoingTargets as target (target.id)}
							<li>{target.name}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<button type="button" class="new-round" onclick={startNewRound}>New round</button>
		</aside>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Inter, 'Segoe UI', sans-serif;
		background: #020817;
		color: #e2e8f0;
	}

	.page {
		min-height: 100vh;
		padding: 2rem;
		background: radial-gradient(circle at top, #111827 0%, #020817 45%);
	}

	.header {
		max-width: 1200px;
		margin: 0 auto 1.5rem;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #7dd3fc;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3.5rem);
	}

	.layout {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: minmax(0, 2.2fr) minmax(260px, 0.9fr);
		gap: 1.5rem;
		align-items: start;
	}

	.map-panel,
	.sidebar {
		background: rgba(15, 23, 42, 0.9);
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 1.25rem;
		box-shadow: 0 20px 35px rgba(15, 23, 42, 0.25);
	}

	.map-panel {
		padding: 1rem;
	}

	:global(svg) {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 1rem;
	}

	.sidebar {
		padding: 1.25rem;
	}

	.sidebar h2 {
		margin-top: 0;
		font-size: 1.05rem;
		color: #cbd5e1;
	}

	.country-card {
		padding: 1rem;
		border-radius: 0.9rem;
		background: rgba(30, 41, 59, 0.9);
		border: 1px solid rgba(125, 211, 252, 0.25);
	}

	.label {
		display: block;
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #7dd3fc;
		margin-bottom: 0.4rem;
	}

	.country-card h3 {
		margin: 0 0 0.35rem;
		font-size: 1.6rem;
	}

	.gdp,
	.score {
		margin: 0;
		font-size: 1.9rem;
		font-weight: 700;
		color: #f8fafc;
	}

	.note {
		margin: 0.45rem 0 0;
		color: #94a3b8;
	}

	.polio-status {
		margin: 0.9rem 0 0;
		font-size: 0.98rem;
		color: #bae6fd;
	}

	.targets {
		margin: 0.5rem 0 0;
		padding-left: 1.2rem;
		color: #bae6fd;
	}

	.new-round {
		margin-top: 1rem;
		width: 100%;
		padding: 0.7rem 1rem;
		border: 1px solid rgba(125, 211, 252, 0.4);
		border-radius: 0.75rem;
		background: rgba(14, 116, 144, 0.35);
		color: #e0f2fe;
		font: inherit;
		cursor: pointer;
	}

	.new-round:hover {
		background: rgba(14, 116, 144, 0.55);
	}

	.new-round:focus-visible {
		outline: 2px solid rgba(125, 211, 252, 0.75);
		outline-offset: 2px;
	}

	@media (max-width: 820px) {
		.page {
			padding: 1.25rem;
		}

		.layout {
			grid-template-columns: 1fr;
		}
	}
</style>
