<script lang="ts">
	import { Chart } from './charts/chart.js';

	export let step: number | undefined = undefined;

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

	const svg = c.asSVG(2);
	console.log(svg);
</script>

{@html svg}
