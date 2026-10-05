<script>
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
</script>

<div>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="2754" height="1398">
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
	</svg>
</div>
