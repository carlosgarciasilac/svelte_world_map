<script lang="ts">
	import { normalizeCountryId } from './country-gdp';
	import { resolveCountrySelection } from './country-target';

	type CountrySelectDetail = {
		id: string;
		name: string;
	};

	let { onCountrySelect }: { onCountrySelect?: (detail: CountrySelectDetail) => void } = $props();

	import Ocean from './countries/ocean.svelte';
	import Sd from './countries/sd.svelte';
	import Ss from './countries/ss.svelte';
	import Pe from './countries/pe.svelte';
	import Bf from './countries/bf.svelte';
	import Ly from './countries/ly.svelte';
	import By from './countries/by.svelte';
	import Id from './countries/id.svelte';
	import Ge from './countries/ge.svelte';
	import Pk from './countries/pk.svelte';
	import Ye from './countries/ye.svelte';
	import Mg from './countries/mg.svelte';
	import Bo from './countries/bo.svelte';
	import Rs from './countries/rs.svelte';
	import Ci from './countries/ci.svelte';
	import Dz from './countries/dz.svelte';
	import Ch from './countries/ch.svelte';
	import Cm from './countries/cm.svelte';
	import Mk from './countries/mk.svelte';
	import Bw from './countries/bw.svelte';
	import Ke from './countries/ke.svelte';
	import Jo from './countries/jo.svelte';
	import Ae from './countries/ae.svelte';
	import Bz from './countries/bz.svelte';
	import Sl from './countries/sl.svelte';
	import Mx from './countries/mx.svelte';
	import Br from './countries/br.svelte';
	import Ml from './countries/ml.svelte';
	import Cd from './countries/cd.svelte';
	import Af from './countries/af.svelte';
	import It from './countries/it.svelte';
	import So from './countries/so.svelte';
	import Bd from './countries/bd.svelte';
	import Do from './countries/do.svelte';
	import Gw from './countries/gw.svelte';
	import Gh from './countries/gh.svelte';
	import At from './countries/at.svelte';
	import Se from './countries/se.svelte';
	import Tr from './countries/tr.svelte';
	import Lv from './countries/lv.svelte';
	import Ro from './countries/ro.svelte';
	import Zm from './countries/zm.svelte';
	import Et from './countries/et.svelte';
	import Gt from './countries/gt.svelte';
	import Sr from './countries/sr.svelte';
	import Cz from './countries/cz.svelte';
	import Td from './countries/td.svelte';
	import Al from './countries/al.svelte';
	import Fi from './countries/fi.svelte';
	import Sy from './countries/sy.svelte';
	import Kg from './countries/kg.svelte';
	import Sb from './countries/sb.svelte';
	import Om from './countries/om.svelte';
	import Pa from './countries/pa.svelte';
	import Za from './countries/za.svelte';
	import Eg from './countries/eg.svelte';
	import Tz from './countries/tz.svelte';
	import Sa from './countries/sa.svelte';
	import Vn from './countries/vn.svelte';
	import Ru from './countries/ru.svelte';
	import Ht from './countries/ht.svelte';
	import Ba from './countries/ba.svelte';
	import In from './countries/in.svelte';
	import Ca from './countries/ca.svelte';
	import Ar from './countries/ar.svelte';
	import Gb from './countries/gb.svelte';
	import Cr from './countries/cr.svelte';
	import Py from './countries/py.svelte';
	import Gn from './countries/gn.svelte';
	import Ie from './countries/ie.svelte';
	import Ng from './countries/ng.svelte';
	import Tn from './countries/tn.svelte';
	import Pl from './countries/pl.svelte';
	import Na from './countries/na.svelte';
	import Ug from './countries/ug.svelte';
	import Mz from './countries/mz.svelte';
	import Jp from './countries/jp.svelte';
	import Nz from './countries/nz.svelte';
	import Pt from './countries/pt.svelte';
	import Co from './countries/co.svelte';
	import Mr from './countries/mr.svelte';
	import Ao from './countries/ao.svelte';
	import De from './countries/de.svelte';
	import Th from './countries/th.svelte';
	import Pg from './countries/pg.svelte';
	import Iq from './countries/iq.svelte';
	import Hr from './countries/hr.svelte';
	import Gl from './countries/gl.svelte';
	import Ne from './countries/ne.svelte';
	import Dk from './countries/dk.svelte';
	import Mm from './countries/mm.svelte';
	import Sv from './countries/sv.svelte';
	import Gy from './countries/gy.svelte';
	import Be from './countries/be.svelte';
	import Us from './countries/us.svelte';
	import Gq from './countries/gq.svelte';
	import Cu from './countries/cu.svelte';
	import Ve from './countries/ve.svelte';
	import Am from './countries/am.svelte';
	import Aq from './countries/aq.svelte';
	import Au from './countries/au.svelte';
	import Bg from './countries/bg.svelte';
	import Bi from './countries/bi.svelte';
	import Bj from './countries/bj.svelte';
	import Bt from './countries/bt.svelte';
	import Cf from './countries/cf.svelte';
	import Cg from './countries/cg.svelte';
	import Cl from './countries/cl.svelte';
	import Cn from './countries/cn.svelte';
	import Dj from './countries/dj.svelte';
	import Ec from './countries/ec.svelte';
	import Ee from './countries/ee.svelte';
	import Er from './countries/er.svelte';
	import Es from './countries/es.svelte';
	import Ga from './countries/ga.svelte';
	import Gr from './countries/gr.svelte';
	import Hn from './countries/hn.svelte';
	import Hu from './countries/hu.svelte';
	import Ir from './countries/ir.svelte';
	import Is from './countries/is.svelte';
	import Kh from './countries/kh.svelte';
	import Kp from './countries/kp.svelte';
	import Kr from './countries/kr.svelte';
	import Kz from './countries/kz.svelte';
	import La from './countries/la.svelte';
	import Lk from './countries/lk.svelte';
	import Lr from './countries/lr.svelte';
	import Ls from './countries/ls.svelte';
	import Lt from './countries/lt.svelte';
	import Mn from './countries/mn.svelte';
	import Mw from './countries/mw.svelte';
	import My from './countries/my.svelte';
	import Ni from './countries/ni.svelte';
	import No from './countries/no.svelte';
	import Np from './countries/np.svelte';
	import Ph from './countries/ph.svelte';
	import Rw from './countries/rw.svelte';
	import Si from './countries/si.svelte';
	import Sk from './countries/sk.svelte';
	import Sn from './countries/sn.svelte';
	import Tg from './countries/tg.svelte';
	import Tj from './countries/tj.svelte';
	import Tm from './countries/tm.svelte';
	import Uy from './countries/uy.svelte';
	import Uz from './countries/uz.svelte';
	import Zw from './countries/zw.svelte';
	import Fr from './countries/fr.svelte';

	type Point = {
		x: number;
		y: number;
	};

	const VIEW_BOX_WIDTH = 2754;
	const VIEW_BOX_HEIGHT = 1398;
	const MIN_SCALE = 1;
	const MAX_SCALE = 8;
	const ZOOM_STEP = 1.15;
	const DRAG_THRESHOLD = 6;

	let svgElement: SVGSVGElement | null = null;
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);
	let isPanning = $state(false);
	let suppressClick = $state(false);
	let hoveredCountryElement: Element | null = null;

	const pointerPositions = new Map<number, Point>();
	let panPointerId: number | null = null;
	let panLastPoint: Point | null = null;
	let pointerDownPoint: Point | null = null;
	let pinchStartDistance = 0;
	let pinchStartScale = 1;
	let pinchStartTranslate: Point = { x: 0, y: 0 };
	let pinchWorldPoint: Point | null = null;

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}

	function clampScale(nextScale: number): number {
		return clamp(nextScale, MIN_SCALE, MAX_SCALE);
	}

	function clampTranslation(nextScale: number, nextX: number, nextY: number): Point {
		const minX = VIEW_BOX_WIDTH * (1 - nextScale);
		const minY = VIEW_BOX_HEIGHT * (1 - nextScale);

		return {
			x: clamp(nextX, minX, 0),
			y: clamp(nextY, minY, 0)
		};
	}

	function applyTransform(nextScale: number, nextX: number, nextY: number) {
		const constrainedScale = clampScale(nextScale);
		const constrainedPosition = clampTranslation(constrainedScale, nextX, nextY);

		scale = constrainedScale;
		translateX = constrainedPosition.x;
		translateY = constrainedPosition.y;
	}

	function getSvgPoint(clientX: number, clientY: number): Point | null {
		if (!svgElement) {
			return null;
		}

		const screenMatrix = svgElement.getScreenCTM();
		if (!screenMatrix) {
			return null;
		}

		const point = svgElement.createSVGPoint();
		point.x = clientX;
		point.y = clientY;

		const transformedPoint = point.matrixTransform(screenMatrix.inverse());
		return { x: transformedPoint.x, y: transformedPoint.y };
	}

	function toWorldPoint(point: Point, currentScale: number, currentTranslate: Point): Point {
		return {
			x: (point.x - currentTranslate.x) / currentScale,
			y: (point.y - currentTranslate.y) / currentScale
		};
	}

	function zoomAt(point: Point, nextScale: number) {
		const worldPoint = toWorldPoint(point, scale, { x: translateX, y: translateY });
		const constrainedScale = clampScale(nextScale);
		const nextX = point.x - worldPoint.x * constrainedScale;
		const nextY = point.y - worldPoint.y * constrainedScale;

		applyTransform(constrainedScale, nextX, nextY);
	}

	function resetView() {
		applyTransform(1, 0, 0);
	}

	function midpoint(first: Point, second: Point): Point {
		return {
			x: (first.x + second.x) / 2,
			y: (first.y + second.y) / 2
		};
	}

	function distance(first: Point, second: Point): number {
		return Math.hypot(second.x - first.x, second.y - first.y);
	}

	function initializePinch() {
		const points = [...pointerPositions.values()];
		if (points.length < 2) {
			return;
		}

		const [first, second] = points;
		pinchStartDistance = distance(first, second);
		if (!pinchStartDistance) {
			return;
		}

		pinchStartScale = scale;
		pinchStartTranslate = { x: translateX, y: translateY };
		pinchWorldPoint = toWorldPoint(midpoint(first, second), pinchStartScale, pinchStartTranslate);
		panPointerId = null;
		panLastPoint = null;
		pointerDownPoint = null;
		isPanning = false;
		suppressClick = true;
	}

	function emitCountrySelection(target: EventTarget | null) {
		const country = resolveCountrySelection(target);
		if (!country) {
			return;
		}

		onCountrySelect?.({
			id: normalizeCountryId(country.id),
			name: country.name
		});
	}

	function setHoveredCountry(target: EventTarget | null) {
		const country = resolveCountrySelection(target);
		const nextHoveredCountryElement = country?.element ?? null;

		if (hoveredCountryElement === nextHoveredCountryElement) {
			return;
		}

		hoveredCountryElement?.classList.remove('country-hover');
		nextHoveredCountryElement?.classList.add('country-hover');
		hoveredCountryElement = nextHoveredCountryElement;
	}

	function clearHoveredCountry() {
		hoveredCountryElement?.classList.remove('country-hover');
		hoveredCountryElement = null;
	}

	function handleMapClick(event: MouseEvent) {
		if (suppressClick) {
			suppressClick = false;
			return;
		}

		emitCountrySelection(event.target);
	}

	function handlePointerDown(event: PointerEvent) {
		const point = getSvgPoint(event.clientX, event.clientY);
		if (!point) {
			return;
		}

		svgElement?.focus();
		svgElement?.setPointerCapture(event.pointerId);
		pointerPositions.set(event.pointerId, point);

		if (pointerPositions.size === 1) {
			panPointerId = event.pointerId;
			panLastPoint = point;
			pointerDownPoint = point;
			isPanning = false;
			suppressClick = false;
			setHoveredCountry(event.target);
			return;
		}

		if (pointerPositions.size === 2) {
			clearHoveredCountry();
			initializePinch();
		}
	}

	function handlePointerMove(event: PointerEvent) {
		if (!pointerPositions.has(event.pointerId)) {
			return;
		}

		const point = getSvgPoint(event.clientX, event.clientY);
		if (!point) {
			return;
		}

		pointerPositions.set(event.pointerId, point);

		if (pointerPositions.size >= 2 && pinchWorldPoint) {
			clearHoveredCountry();
			const points = [...pointerPositions.values()];
			const [first, second] = points;
			const nextDistance = distance(first, second);
			if (!nextDistance || !pinchStartDistance) {
				return;
			}

			const nextScale = pinchStartScale * (nextDistance / pinchStartDistance);
			const constrainedScale = clampScale(nextScale);
			const nextMidpoint = midpoint(first, second);
			const nextX = nextMidpoint.x - pinchWorldPoint.x * constrainedScale;
			const nextY = nextMidpoint.y - pinchWorldPoint.y * constrainedScale;

			applyTransform(constrainedScale, nextX, nextY);
			event.preventDefault();
			return;
		}

		if (panPointerId !== event.pointerId || !panLastPoint) {
			return;
		}

		const deltaX = point.x - panLastPoint.x;
		const deltaY = point.y - panLastPoint.y;

		if (!isPanning && pointerDownPoint) {
			const dragDistance = Math.hypot(point.x - pointerDownPoint.x, point.y - pointerDownPoint.y);
			if (dragDistance >= DRAG_THRESHOLD) {
				isPanning = true;
				suppressClick = true;
				clearHoveredCountry();
			}
		}

		if (isPanning) {
			applyTransform(scale, translateX + deltaX, translateY + deltaY);
			event.preventDefault();
		}

		setHoveredCountry(event.target);

		panLastPoint = point;
	}

	function handlePointerUp(event: PointerEvent) {
		pointerPositions.delete(event.pointerId);
		svgElement?.releasePointerCapture(event.pointerId);

		if (pointerPositions.size === 1) {
			const [[pointerId, point]] = [...pointerPositions.entries()];
			panPointerId = pointerId;
			panLastPoint = point;
			pointerDownPoint = point;
			pinchWorldPoint = null;
			pinchStartDistance = 0;
			return;
		}

		if (pointerPositions.size === 0) {
			panPointerId = null;
			panLastPoint = null;
			pointerDownPoint = null;
			pinchWorldPoint = null;
			pinchStartDistance = 0;
			isPanning = false;
		}
	}

	function handlePointerCancel(event: PointerEvent) {
		handlePointerUp(event);
	}

	function handleWheel(event: WheelEvent) {
		const point = getSvgPoint(event.clientX, event.clientY);
		if (!point) {
			return;
		}

		event.preventDefault();
		suppressClick = true;

		const direction = event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
		zoomAt(point, scale * direction);
	}

	function handleDoubleClick() {
		resetView();
		suppressClick = true;
	}

	function handlePointerLeave() {
		if (!pointerPositions.size) {
			clearHoveredCountry();
		}
	}

	function handleMapKeydown(event: KeyboardEvent) {
		if (event.key === '0') {
			event.preventDefault();
			resetView();
			return;
		}

		if (event.key === '+' || event.key === '=') {
			event.preventDefault();
			zoomAt({ x: VIEW_BOX_WIDTH / 2, y: VIEW_BOX_HEIGHT / 2 }, scale * ZOOM_STEP);
			return;
		}

		if (event.key === '-' || event.key === '_') {
			event.preventDefault();
			zoomAt({ x: VIEW_BOX_WIDTH / 2, y: VIEW_BOX_HEIGHT / 2 }, scale / ZOOM_STEP);
			return;
		}

		if (event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		event.preventDefault();
		emitCountrySelection(event.target);
	}
</script>

<div class="world-map-frame">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<svg
		bind:this={svgElement}
		class="world-map"
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		width="2754"
		height="1398"
		viewBox="0 0 2754 1398"
		preserveAspectRatio="xMidYMid meet"
		role="application"
		aria-label="World map"
		tabindex="0"
		onclick={handleMapClick}
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		onpointercancel={handlePointerCancel}
		onpointerleave={handlePointerLeave}
		onwheel={handleWheel}
		ondblclick={handleDoubleClick}
		onkeydown={handleMapKeydown}
	>
		<title>World Map</title>
		<style id="style_css_sheet" type="text/css">
			/*
 * Below are Cascading Style Sheet (CSS) definitions in use in this file,
 * which allow easily changing how countries are displayed.
 *
 * The styles are applied in the order in which they are defined (and re-defined) here in the preamble.
 */

			/*
 * Circles around small countries and territories
 *
 * Change opacity to 1 to display all circles
 */
			.circlexx {
				opacity: 0;
				fill: #c0c0c0;
				stroke: #000000;
				stroke-width: 0.5;
			}

			/*
 * Smaller circles around subnational territories: Australian external territories, Chinese SARs, Dutch special municipalities, and French DOMs (overseas regions/departments) [but not French COMs (overseas collectivities)]
 *
 * Change opacity to 1 to display all circles
 */
			.subxx {
				opacity: 0;
				fill: #c0c0c0;
				stroke: #000000;
				stroke-width: 0.3;
			}

			/*
 * Land
 * (all land, as opposed to water, should belong to this class; in order to modify the coastline for land pieces with no borders on them a special class "coastxx" has been added below)
 */
			.landxx {
				fill: #c0c0c0;
				stroke: #ffffff;
				stroke-width: 0.5;
				fill-rule: evenodd;
			}

			.country-hover,
			.country-hover path,
			.country-hover circle,
			.country-hover ellipse,
			.country-hover polygon {
				fill: #f59e0b;
				stroke: #1f2937;
				stroke-width: 1.1;
			}

			/*
 * Styles for coastlines of islands and continents with no borders on them
 * (all of them should also belong to the class "landxx" - to allow for all land to be modified at once by refining "landxx" style's definition further down)
 */
			.coastxx {
				stroke-width: 0.2;
			}

			/*
 * Styles for territories without permanent population (the largest of which is Antarctica)
 *
 * Change opacity to 0 to hide all territories
 */
			.antxx {
				opacity: 1;
				fill: #c0c0c0;
			}

			/*
 * Circles around small countries without permanent population
 *
 * Change opacity to 1 to display all circles
 */
			.noxx {
				opacity: 0;
				fill: #c0c0c0;
				stroke: #000000;
				stroke-width: 0.5;
			}

			/*
 * Styles for territories with limited or no recognition
 * (all of them - including Taiwan - are overlays (i.e. duplicate layers) over their "host" countries, and so not showing them doesn't leave any gaps on the map)
 *
 * Change opacity to 1 to display all territories
 */
			.limitxx {
				opacity: 0;
				fill: #c0c0c0;
				stroke: #ffffff;
				stroke-width: 0.2;
				fill-rule: evenodd;
			}

			/*
 * Smaller circles around small territories with limited or no recognition
 *
 * Change opacity to 1 to display all circles
 */
			.unxx {
				opacity: 0;
				fill: #c0c0c0;
				stroke: #000000;
				stroke-width: 0.3;
			}

			/*
 * Oceans, seas, and large lakes
 */
			.oceanxx {
				opacity: 1;
				fill: #ffffff;
				stroke: #000000;
				stroke-width: 0.5;
			}

			/*
 * Reserved class names:
 *
 * .eu - for members of European Union
 * .eaeu - for members of Eurasian Economic Union
 */

			/*
 * Additional style rules
 *
 * The following are examples of colouring countries.
 * These can be substituted with custom styles to colour the countries on the map.
 *
 * Colour a few countries:
 *
 * .gb, .au, .nc
 * {
 * 	fill: #ff0000;
 * }
 *
 * Colour a few small-country circles (along with the countries):
 *
 * .ms, .ky
 * {
 * 	opacity: 1;
 * 	fill: #ff0000;
 * }
 *
 */
		</style>

		<g class="map-content" transform={`matrix(${scale} 0 0 ${scale} ${translateX} ${translateY})`}>
			<Ocean></Ocean>
			<Sd></Sd>
			<Ss></Ss>
			<Ge></Ge>
			<Pe></Pe>
			<Bf></Bf>
			<Ly></Ly>
			<By></By>
			<Pk></Pk>
			<Id></Id>
			<Ye></Ye>
			<Mg></Mg>
			<Bo></Bo>
			<Rs></Rs>
			<Ci></Ci>
			<Dz></Dz>
			<Ch></Ch>
			<Cm></Cm>
			<Mk></Mk>
			<Bw></Bw>
			<Ke></Ke>
			<Jo></Jo>
			<Mx></Mx>
			<Ae></Ae>
			<Bz></Bz>
			<Br></Br>
			<Sl></Sl>
			<Ml></Ml>
			<Cd></Cd>
			<It></It>
			<So></So>
			<Af></Af>
			<Bd></Bd>
			<Do></Do>
			<Gw></Gw>
			<Gh></Gh>
			<At></At>
			<Se></Se>
			<Tr></Tr>
			<Ug></Ug>
			<Mz></Mz>
			<Jp></Jp>
			<Nz></Nz>
			<Cu></Cu>
			<Ve></Ve>
			<Pt></Pt>
			<Co></Co>
			<Mr></Mr>
			<Ao></Ao>
			<De></De>
			<Th></Th>
			<Pg></Pg>
			<Iq></Iq>
			<Hr></Hr>
			<Gl></Gl>
			<Ne></Ne>
			<Dk></Dk>
			<Lv></Lv>
			<Ro></Ro>
			<Zm></Zm>
			<Mm></Mm>
			<Et></Et>
			<Gt></Gt>
			<Sr></Sr>
			<Cz></Cz>
			<Td></Td>
			<Al></Al>
			<Fi></Fi>
			<Sy></Sy>
			<Kg></Kg>
			<Sb></Sb>
			<Om></Om>
			<Pa></Pa>
			<Ar></Ar>
			<Gb></Gb>
			<Cr></Cr>
			<Py></Py>
			<Gn></Gn>
			<Ie></Ie>
			<Ng></Ng>
			<Tn></Tn>
			<Pl></Pl>
			<Na></Na>
			<Za></Za>
			<Eg></Eg>
			<Tz></Tz>
			<Sa></Sa>
			<Vn></Vn>
			<Ru></Ru>
			<Ht></Ht>
			<Ba></Ba>
			<In></In>
			<Ca></Ca>
			<Sv></Sv>
			<Gy></Gy>
			<Be></Be>
			<Gq></Gq>
			<Ls></Ls>
			<Bg></Bg>
			<Bi></Bi>
			<Dj></Dj>
			<Ir></Ir>
			<My></My>
			<Ph></Ph>
			<Uy></Uy>
			<Cg></Cg>
			<Ee></Ee>
			<Rw></Rw>
			<Am></Am>
			<Sn></Sn>
			<Tg></Tg>
			<Es></Es>
			<Ga></Ga>
			<Hu></Hu>
			<Mw></Mw>
			<Tj></Tj>
			<Kh></Kh>
			<Kr></Kr>
			<Hn></Hn>
			<Is></Is>
			<Ni></Ni>
			<Cl></Cl>
			<Lr></Lr>
			<Cf></Cf>
			<Sk></Sk>
			<Lt></Lt>
			<Zw></Zw>
			<Lk></Lk>
			<La></La>
			<Kp></Kp>
			<Gr></Gr>
			<Tm></Tm>
			<Ec></Ec>
			<Bj></Bj>
			<Si></Si>
			<No></No>
			<Np></Np>
			<Er></Er>
			<Us></Us>
			<Kz></Kz>
			<Uz></Uz>
			<Mn></Mn>
			<Bt></Bt>
			<Aq></Aq>
			<Au></Au>
			<Cn></Cn>
			<Fr></Fr>
		</g>
	</svg>
</div>

<style>
	.world-map-frame {
		width: 100%;
	}

	.world-map {
		display: block;
		width: 100%;
		height: auto;
		max-width: 100%;
		touch-action: none;
		cursor: grab;
		outline: none;
	}

	.world-map:active,
	.world-map:focus-visible {
		cursor: grabbing;
	}

	.world-map:focus-visible {
		outline: 2px solid rgba(125, 211, 252, 0.75);
		outline-offset: 0.35rem;
	}
</style>
