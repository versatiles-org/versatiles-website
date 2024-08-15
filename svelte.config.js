import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import markdown from './src/lib/markdown.js';

/** @type {import('@sveltejs/kit').Config} */
export default {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [markdown(), vitePreprocess()],
	extensions: ['.svelte', '.md'],

	kit: { adapter: adapter() }
};
