<script>
	export let title = 'How to Use';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>How to use VersaTiles?</h1>

<p>There are multiple ways to use VersaTiles:</p>

<h2>Use our map server</h2>

<p>Just copy & paste the following code into your website.</p>

<pre>
<!-- add MapLibre JavaScript and CSS -->
<script src="https://tiles.versatiles.org/assets/maplibre-gl/maplibre-gl.js"></script>
<link href="https://tiles.versatiles.org/assets/maplibre-gl/maplibre-gl.css" rel="stylesheet" />

<!-- add container for the map -->
<div id="map" style="width:100%;aspect-ratio:16/9"></div>

<!-- start map -->
<script>
		new maplibregl.Map({
			container: 'map',
			style: 'https://tiles.versatiles.org/assets/styles/colorful.json'
		}).addControl(new maplibregl.NavigationControl());
	</script>
</pre>

<p><a href="https://jsfiddle.net/2hLenq3b/" target="_blank">Try it at JSFiddle</a></p>

<p>
	<strong>Pros:</strong> simple and free<br /><strong>Cons:</strong> we can't guarantee 24/7 availability,
	yet
</p>

<p>
	If you want to learn more about the MapLibre framework, take a look at their <a
		href="https://maplibre.org/maplibre-gl-js/docs/"
		target="_blank">documentation</a
	>
	and their
	<a href="https://maplibre.org/maplibre-gl-js/docs/examples/" target="_blank">examples</a>
	of how to add
	<a href="https://maplibre.org/maplibre-gl-js/docs/examples/add-a-marker/" target="_blank"
		>markers</a
	>,
	<a href="https://maplibre.org/maplibre-gl-js/docs/examples/set-popup/" target="_blank">popups</a>
	or
	<a href="https://maplibre.org/maplibre-gl-js/docs/examples/geojson-polygon/" target="_blank"
		>GeoJSON</a
	>.
</p>

<h2>Use a CDN in front of our map server</h2>

<p>
	Commercial providers prohibit the caching of map tiles to ensure that you always have to pay for
	the full traffic. However, our map tiles are free and not subject to any additional conditions
	(except attribution to OSM contributors). We even encourage you to cache tiles with your own CDN.
	This takes the load off our servers and improves the performance and stability of your map
	applications.
</p>

<p>Use a CDN like:</p>

<ul>
	<li><a href="https://bunny.net/" target="_blank">bunny.net</a></li>
	<li>Akamai</li>
	<li>Cloudflare CDN</li>
	<li>Google Cloud CDN</li>
	<li>Amazon Cloudfront</li>
	<li>Fastly</li>
	<li>…</li>
</ul>

<p>
	<strong>Pros:</strong> relatively simple, greatly improves availability and performance<br
	/><strong>Cons:</strong> Costs money
</p>

<p>
	Please help us to improve the <a
		href="https://github.com/versatiles-org/versatiles-documentation"
		target="_blank">documentation</a
	>.
</p>

<h2>Run your own server</h2>

<p>
	You can <a href="https://download.versatiles.org/" target="_blank">download</a> the latest planet
	and serve it using your own server. We are still testing this approach and working on a
	<a href="https://github.com/versatiles-org/versatiles-documentation" target="_blank"
		>documentation</a
	>. But you can already use our
	<a href="https://github.com/versatiles-org/versatiles-rs" target="_blank">Rust server</a>, a
	<a href="https://github.com/versatiles-org/node-versatiles" target="_blank"
		>Node.js implementation</a
	>
	or one of the
	<a href="https://github.com/versatiles-org/versatiles-docker" target="_blank">Docker containers</a
	>.
</p>

<h2>Run your own cloud service</h2>

<p>
	You can <a href="https://download.versatiles.org/" target="_blank">download</a> the latest planet and
	serve it using your own cloud service on Google Cloud, AWS, Microsoft Azure, DigitalOcean, …
</p>

<p>
	We are still testing this approach and working on a <a
		href="https://github.com/versatiles-org/versatiles-documentation"
		target="_blank">documentation</a
	>.
</p>
