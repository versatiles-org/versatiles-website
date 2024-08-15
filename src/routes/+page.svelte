<script lang="ts">
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	
	let container: HTMLDivElement;
	onMount(() => {
		const map = new maplibregl.Map({
			container,
			style: 'https://tiles.versatiles.org/assets/styles/colorful.json',
			bounds: [13.09, 52.33, 13.74, 52.68],
			maxZoom: 18,
			attributionControl: false,
			cooperativeGestures: true
		});
		map.addControl(new maplibregl.FullscreenControl());
		map.addControl(new maplibregl.AttributionControl({ compact: true }));
	});
</script>

<svelte:head>
	<title>VersaTiles</title>
	<meta name="description" content="VersaTiles - a complete FLOSS map stack" />
</svelte:head>

<div id="heroblock">
	<img src="/assets/logo/versatiles.svg" alt="VersaTiles logo" />
	<div id="heroline">
		<h1>VersaTiles</h1>
		<p>
			<span>a</span>
			<span>complete</span>
			<span><abbr title="Free, Libre and Open Source Software">FLOSS</abbr></span>
			<span>map</span>
			<span>stack</span>
		</p>
	</div>
</div>

<hero
	>VersaTiles is a completely <a href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
		>FLOSS</a
	> stack for generating, distributing, and using map tiles based on OpenStreetMap data, free of any
	commercial interests.</hero
>

<h2>Try it out</h2>

<div class="map" bind:this={container}></div>

<h2>If you want to know more</h2>

we explain here:

<ul>
	<li><a href="intro">how to use it</a>,</li>
	<li><a href="overview">how it works</a> and</li>
	<li><a href="contribute">how you can help.</a></li>
</ul>

<h2>powered by</h2>

<p style="text-align:center">
	<a
		href="https://www.miz-babelsberg.de/foerderung/foerderprojekte-alumni/details/versatiles-editorial-tools.html"
		><img src="/assets/logo/miz-logo.png" width="281" alt="MIZ logo" /></a
	>
</p>

<small
	>MIZ-Babelsberg is funding the development of the "VersaTiles Editorial Tools", which are
	specifically designed for the use of maps in journalistic newsrooms.</small
>

<style lang="less">
	.map {
		display: block;
		width: 100%;
		max-width: 640px;
		aspect-ratio: 16 / 9;
		min-height: 240px;
		margin: auto;
	}

	#heroblock {
		padding: 2em 0;
		display: flex;
		flex-direction: row;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		gap: 2em;
		font-size: min(1em, 4vw);
		img {
			display: flex;
		}
	}

	#heroline {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			background-clip: text;
			color: #fff;
			font-family: sans-serif;
			font-size: 4em;
			font-weight: 400;
			padding: 0;
			margin: 0;
		}

		p {
			color: #fff5;
			display: flex;
			flex-direction: row;
			font-size: 1em;
			font-weight: 400;
			justify-content: space-between;
			letter-spacing: 0.1em;
			margin: 0.1em 0 0;
			padding: 0;
			text-transform: uppercase;
			width: 100%;

			span {
				margin: 0;
			}
		}
	}
</style>
