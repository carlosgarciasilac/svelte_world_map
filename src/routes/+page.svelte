<script lang="ts">
	import { countries, formatGdp } from '$lib/country-gdp';
	import World from '$lib/world.svelte';

	let selectedId = $state<string | null>(null);
	const activeCountry = $derived(countries.find((country) => country.id === selectedId) ?? null);

	function getCountryFill(gdp: number): string {
		if (gdp <= 0) {
			return '#94a3b8';
		}

		const ratio = Math.min(gdp / 15_000_000_000_000, 1);
		const hue = 210 - ratio * 150;
		return `hsl(${hue} 82% 62%)`;
	}

	function toggleCountry(countryId: string) {
		selectedId = selectedId === countryId ? null : countryId;
	}
</script>

<svelte:head>
	<title>World GDP Map</title>
</svelte:head>

<div class="page">
	<header class="header">
		<p class="eyebrow">Interactive world economy</p>
		<h1>2010 GDP by country</h1>
	</header>

	<div class="layout">
		<div class="map-panel">
			<World></World>
		</div>

		<aside class="sidebar">
			<h2>Selected country</h2>
			{#if activeCountry}
				<div class="country-card">
					<span class="label">Country</span>
					<h3>{activeCountry.name}</h3>
					<p class="gdp">{formatGdp(activeCountry.gdp)}</p>
					<p class="note">2010 nominal GDP</p>
				</div>
			{:else}
				<div class="country-card empty">
					<p>Click any country to reveal its 2010 GDP.</p>
				</div>
			{/if}
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

	svg {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 1rem;
	}

	.country {
		cursor: pointer;
		transition: fill 0.18s ease, stroke 0.18s ease, filter 0.18s ease;
	}

	.country:hover,
	.country:focus-visible {
		filter: brightness(1.08);
		outline: none;
	}

	.selected {
		filter: brightness(1.18) saturate(1.2);
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

	.gdp {
		margin: 0;
		font-size: 1.9rem;
		font-weight: 700;
		color: #f8fafc;
	}

	.note {
		margin: 0.45rem 0 0;
		color: #94a3b8;
	}

	.empty {
		min-height: 150px;
		display: grid;
		place-items: center;
		text-align: center;
		color: #cbd5e1;
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
