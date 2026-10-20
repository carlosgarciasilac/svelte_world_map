<script lang="ts">
	import FlapCell from "./FlapCell.svelte";
	import {
		BASE_COL_DELAY,
		BASE_FLIP_S,
		BASE_ROW_DELAY,
		BASE_STEP_MS,
		BASE_TOTAL_S,
		BOARD_COLS,
		buildBoard,
	} from "./text-board";

	type Props = {
		text?: string;
		rows?: string[];
		/** Total animation duration in seconds. Defaults to ~1.2s. */
		duration?: number;
		class?: string;
	};

	let {
		text,
		rows,
		duration = BASE_TOTAL_S,
		class: className = "",
	}: Props = $props();

	const scale = $derived(duration / BASE_TOTAL_S);
	const colDelay = $derived(BASE_COL_DELAY * scale);
	const rowDelay = $derived(BASE_ROW_DELAY * scale);
	const stepMs = $derived(BASE_STEP_MS * scale);
	const flipDur = $derived(Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale)));

	const board = $derived(buildBoard(text, rows));
</script>

<div class="board {className}">
	<div class="grid" style:grid-template-columns="repeat({BOARD_COLS}, 1fr)">
		{#each board as row, r (r)}
			{#each row as cell, c (`${r}-${c}`)}
				{#if cell.type === "color"}
					<div class="color-cell" style:background-color={cell.hex}></div>
				{:else}
					<FlapCell
						target={cell.value}
						delay={c * colDelay + r * rowDelay}
						{stepMs}
						flipDuration={flipDur}
					/>
				{/if}
			{/each}
		{/each}
	</div>
</div>

<style>
	.board {
		position: relative;
		width: 100%;
		max-width: 48rem;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0.5rem;
		border-radius: 0.75rem;
		background: #171717;
		box-shadow: 0 20px 70px -15px rgba(0, 0, 0, 0.6);
	}

	.grid {
		display: grid;
		gap: 1px;
	}

	.color-cell {
		aspect-ratio: 3 / 5;
		border: 2px solid #000;
		border-radius: 3px;
	}

	@media (min-width: 768px) {
		.board {
			padding: 1rem;
			border-radius: 1rem;
		}

		.grid {
			gap: 3px;
		}
	}
</style>
