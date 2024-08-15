<!-- CodeBlock.svelte -->
<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import Highlight from 'svelte-highlight';
	import { bash, xml, json, javascript, typescript, css } from 'svelte-highlight/languages';
	import github from 'svelte-highlight/styles/github-dark';

	const languages = {
		bash,
		html: xml,
		json,
		js: javascript,
		javascript,
		ts: typescript,
		typescript,
		css
	} as const;

	type LanguageName = keyof typeof languages;
	type LanguageType = (typeof languages)[LanguageName];

	export let code = '';
	export let languageName: LanguageName = 'bash';
	let language: LanguageType = bash;
	let copySuccess = false;

	$: {
		language = languages[languageName] || languages['bash']; // Fallback to bash
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(code).then(() => {
			copySuccess = true;
			setTimeout(() => (copySuccess = false), 2000); // Reset after 2 seconds
		});
	}
</script>

<svelte:head>
	{@html github}
</svelte:head>

<section>
	<Highlight {language} {code} />
	<button on:click={copyToClipboard}>
		{#if copySuccess}
			Copied!
		{:else}
			Copy
		{/if}
	</button>
</section>

<style>
	section {
		position: relative;
		margin: 0 auto 1em;
		font-size: 0.7em;
		text-align: left;
	}
	button {
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 0.8rem;
		padding: 0.5em;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		cursor: pointer;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.4rem;
		opacity: 0.5;
		transition: opacity 0.2s ease;
	}
	button:hover {
		background-color: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.8);
		opacity: 1;
		transition: opacity 0s;
	}
</style>
