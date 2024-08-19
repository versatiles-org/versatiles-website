import { getPage } from '$lib/server/documentation';
export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export function load() {
	return getPage('README');
}
