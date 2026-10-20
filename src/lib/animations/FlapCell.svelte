<script lang="ts">
	import {
		type AccentColor,
		normalizeChar,
		randomAccent,
		randomFlapChar,
	} from "./text-board";

	type Props = {
		target: string;
		delay: number;
		stepMs: number;
		flipDuration: number;
	};

	let { target, delay, stepMs, flipDuration }: Props = $props();

	let current = $state(" ");
	let prev = $state(" ");
	let flipId = $state(0);
	let accent = $state<AccentColor | null>(null);
	let prevAccent = $state<AccentColor | null>(null);

	// Non-reactive bookkeeping, mirrors the refs in the React version.
	let cur = " ";
	let tgt: string | null = null;
	let accentRef: AccentColor | null = null;

	$effect(() => {
		const normalized = normalizeChar(target);
		const startDelay = delay;
		const step = stepMs;

		let startTimer: ReturnType<typeof setTimeout> | null = null;
		let stepTimer: ReturnType<typeof setTimeout> | null = null;

		if (normalized === tgt) return;
		tgt = normalized;

		if (normalized === " " && cur === " ") return;

		const scrambleCount = normalized === " "
			? 8 + Math.floor(Math.random() * 8)
			: 25 + Math.floor(Math.random() * 15);

		const runStep = (i: number) => {
			const isLast = i === scrambleCount;
			const ch = isLast ? normalized : randomFlapChar();
			const newAccent = isLast ? null : randomAccent();

			prev = cur;
			prevAccent = accentRef;
			cur = ch;
			accentRef = newAccent;
			current = ch;
			accent = newAccent;
			flipId += 1;

			if (!isLast) {
				stepTimer = setTimeout(() => runStep(i + 1), step);
			}
		};

		startTimer = setTimeout(() => runStep(1), startDelay);

		return () => {
			if (startTimer) clearTimeout(startTimer);
			if (stepTimer) clearTimeout(stepTimer);
			tgt = null;
		};
	});

	const show = $derived(current === " " ? " " : current);
	const showPrev = $derived(prev === " " ? " " : prev);

	const DEFAULT_BG = "#171717";
	const DEFAULT_FLAP_BG = "#262626";
	const DEFAULT_TEXT = "#ffffff";

	const topBg = $derived(accent?.top ?? DEFAULT_BG);
	const bottomBg = $derived(accent?.bottom ?? DEFAULT_BG);
	const textColor = $derived(accent?.text ?? DEFAULT_TEXT);
	const flapTopBg = $derived(prevAccent?.top ?? DEFAULT_FLAP_BG);
	const flapTextColor = $derived(prevAccent?.text ?? DEFAULT_TEXT);
</script>

<div
	class="cell"
	style:--flip="{flipDuration}s"
	style:--bottom-delay="{flipDuration * 0.5}s"
>
	<div class="flap-area">
		<div class="hinge">
			<div class="hinge-tab left"></div>
			<div class="hinge-line"></div>
			<div class="hinge-tab right"></div>
		</div>

		<!-- Static top – new character top half -->
		<div class="half top" style:background-color={topBg}>
			<div class="glyph glyph-top" style:color={textColor}>{show}</div>
		</div>

		<!-- Static bottom – new character bottom half -->
		<div class="half bottom" style:background-color={bottomBg}>
			<div class="glyph glyph-bottom" style:color={textColor}>{show}</div>
			{#key flipId}
				{#if flipId > 0}
					<div class="overlay settle"></div>
				{/if}
			{/key}
		</div>

		{#key flipId}
			{#if flipId > 0}
				<!-- Flipping top flap – old character top half, drops down -->
				<div class="half top flap flap-top" style:background-color={flapTopBg}>
					<div class="glyph glyph-top" style:color={flapTextColor}>
						{showPrev}
					</div>
					<div class="overlay darken"></div>
				</div>

				<!-- Flipping bottom flap – new character bottom half, rises up -->
				<div class="half bottom flap flap-bottom" style:background-color={bottomBg}>
					<div class="glyph glyph-bottom" style:color={textColor}>{show}</div>
					<div class="overlay shine"></div>
				</div>
			{/if}
		{/key}

		<!-- Split line -->
		<div class="split"></div>
	</div>

	<!-- Bottom stripes – decorative, outside the flap area -->
	<div class="stripes"></div>
</div>

<style>
	.cell {
		display: flex;
		flex-direction: column;
		aspect-ratio: 3 / 6;
		overflow: hidden;
		border: 1px solid #000;
		border-radius: 2px;
	}

	.flap-area {
		position: relative;
		flex: 1;
		perspective: 100px;
	}

	.hinge {
		position: absolute;
		inset: 0;
		z-index: 40;
		display: none;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.hinge-tab {
		width: 1px;
		height: 50%;
		background: #000;
	}

	.hinge-tab.left {
		border-radius: 0 2px 2px 0;
	}

	.hinge-tab.right {
		border-radius: 2px 0 0 2px;
	}

	.hinge-line {
		flex: 1;
		height: 1px;
		background: #000;
	}

	.half {
		position: absolute;
		left: 0;
		right: 0;
		height: calc(50% - 0.5px);
		overflow: hidden;
	}

	.half.top {
		top: 0;
		border-radius: 3px 3px 0 0;
	}

	.half.bottom {
		bottom: 0;
		border-radius: 0 0 3px 3px;
	}

	.glyph {
		position: absolute;
		left: 0;
		right: 0;
		height: 200%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-weight: 700;
		letter-spacing: 0.025em;
		font-size: clamp(6px, 2vw, 22px);
		line-height: 1;
		user-select: none;
	}

	.glyph-top {
		top: 0;
	}

	.glyph-bottom {
		bottom: 0;
	}

	.overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.flap {
		z-index: 10;
		backface-visibility: hidden;
	}

	.flap-top {
		transform-origin: bottom;
		animation: flip-down var(--flip) cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
	}

	.flap-bottom {
		transform-origin: top;
		animation: flip-up calc(var(--flip) * 0.85) cubic-bezier(0.33, 1.55, 0.64, 1)
			var(--bottom-delay) both;
	}

	.settle {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 60%);
		animation: fade-out calc(var(--flip) * 1.3) ease-out forwards;
	}

	.darken {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
		animation: darken var(--flip) linear forwards;
	}

	.shine {
		background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
		animation: shine calc(var(--flip) * 0.85) linear var(--bottom-delay) both;
	}

	.split {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		z-index: 20;
		height: 1px;
		transform: translateY(-0.5px);
		background: rgba(0, 0, 0, 0.5);
		pointer-events: none;
	}

	.stripes {
		width: 100%;
		height: 0.5rem;
		color: #000;
		background: repeating-linear-gradient(
			to bottom,
			currentColor 0,
			currentColor 1px,
			transparent 1px,
			transparent 0.15rem
		);
		mask-image: linear-gradient(to top, black 50%, transparent);
	}

	@media (min-width: 768px) {
		.cell {
			border-width: 2px;
			border-radius: 3px;
		}

		.hinge {
			display: flex;
		}

		.stripes {
			height: 1rem;
			background: repeating-linear-gradient(
				to bottom,
				currentColor 0,
				currentColor 1px,
				transparent 1px,
				transparent 0.2rem
			);
		}
	}

	@keyframes flip-down {
		from {
			transform: rotateX(0deg);
		}
		to {
			transform: rotateX(-100deg);
		}
	}

	@keyframes flip-up {
		from {
			transform: rotateX(90deg);
		}
		to {
			transform: rotateX(0deg);
		}
	}

	@keyframes fade-out {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes darken {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.6;
		}
	}

	@keyframes shine {
		from {
			opacity: 0.4;
		}
		to {
			opacity: 0;
		}
	}
</style>
