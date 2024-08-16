import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	return [
		{ slug: 'hello-world' },
		{ slug: 'another-blog-post' }
	];
}

export function load({ params }) {
	console.log({ params });
	if (params.slug === 'hello-world') {
		return {
			title: 'Hello world!',
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}

	error(404, 'Not found');
}
