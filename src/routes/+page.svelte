<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import TextBoard from '$lib/animations/TextBoard.svelte';

	/** Default board text. Override at runtime with `?text=...`. */
	const HEADLINE = 'POLIO ERADICATION \nWHERE ARE WE NOW?';

	// Read on the client only: the page is prerendered, so the query string is not available at build time.
	let boardText = $state(HEADLINE);

	$effect(() => {
		const override = page.url.searchParams.get('text');
		boardText = override?.trim() ? override : HEADLINE;
	});
</script>

<svelte:head>
	<title>Polio Eradication</title>
</svelte:head>

<main class="landing">
	<p class="eyebrow">Polio Awareness Day 2026</p>

	<TextBoard text={boardText} />

	<p class="subtitle">
		Explore which countries have been declared polio-free, and where wild poliovirus is still
		circulating.
	</p>

	<a class="cta" href={resolve('/map')}>Explore the map →</a>
</main>

<style>
	.landing {
		min-height: 100vh;
		box-sizing: border-box;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.75rem;
		text-align: center;
		background: radial-gradient(circle at top, #111827 0%, #020817 45%);
	}

	.eyebrow {
		margin: 0;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #7dd3fc;
	}

	.subtitle {
		max-width: 36rem;
		margin: 0;
		color: #94a3b8;
		line-height: 1.5;
	}

	.cta {
		padding: 0.75rem 1.5rem;
		border-radius: 999px;
		border: 1px solid rgba(125, 211, 252, 0.4);
		background: rgba(15, 23, 42, 0.9);
		color: #bae6fd;
		font-weight: 600;
		text-decoration: none;
		transition:
			background 150ms ease,
			border-color 150ms ease;
	}

	.cta:hover,
	.cta:focus-visible {
		background: rgba(30, 41, 59, 0.95);
		border-color: #7dd3fc;
	}

	@media (max-width: 820px) {
		.landing {
			padding: 1.25rem;
		}
	}
</style>
