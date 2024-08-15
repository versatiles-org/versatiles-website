<!-- ChartFlow.svelte -->
<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { Chart } from './charts/chart.js';

	export let step: number | undefined = undefined;
	export let style = '';

	const c = new Chart({
		colWidth: 200,
		colStart: 120,
		boxHeight: 40,
		gapHeight: 40
	});

	let steps: { hue: number; opacity: number; text: string; highlight: boolean; end?: boolean }[] = [
		{ hue: 0, opacity: 0.5, text: 'Data', highlight: false, end: true },
		{ hue: 10, opacity: 1.0, text: 'Generator', highlight: true },
		{ hue: 30, opacity: 0.5, text: '.versatiles', highlight: false },
		{ hue: 50, opacity: 1.0, text: 'Server', highlight: true },
		{ hue: 80, opacity: 0.5, text: 'HTTP', highlight: false },
		{ hue: 120, opacity: 1.0, text: 'Network', highlight: true },
		{ hue: 150, opacity: 0.5, text: 'HTTPS', highlight: false },
		{ hue: 200, opacity: 1.0, text: 'Frontend', highlight: true },
		{ hue: 230, opacity: 0.5, text: 'User', highlight: false, end: true }
	];

	const f = c.addFlow();
	if (typeof step === 'string') step = parseInt(step, 10);
	if (typeof step === 'number') steps = [steps[step]];

	steps.forEach((s) => {
		f.add(s.text, s.hue, s.opacity, s.highlight, s.end);
	});

	const bbox = c.getBBox();
	bbox.addPadding(2);
	const svg = c.getSVG();
</script>

<svg
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	viewBox={bbox.viewBox}
	width={bbox.width}
	height={bbox.height}
	{style}>{@html svg}</svg
>
