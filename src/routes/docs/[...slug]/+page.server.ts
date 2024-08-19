import type { EntryGenerator, PageServerLoad } from './$types';
import { getPage, getPages } from '$lib/server/documentation';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return getPages();
};

export const load: PageServerLoad = ({ params }) => {
	try {
		return getPage(params.slug);
	} catch (_e) {
		error(404);
	}
};
