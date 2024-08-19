import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import { Imports, transformBasics, transformLinks } from './lib/markdown';
import matter from 'gray-matter';
import { readZippedFiles } from './lib/zip-container';

interface Page {
	title: string;
	html: string;
	name: string;
}

const baseUrl = new URL('https://versatiles.org/docs/');
const files = await readZippedFiles(
	'https://codeload.github.com/versatiles-org/versatiles-documentation/zip/refs/heads/main',
	'versatiles-documentation-main/'
);

export async function getPage(name: string): Promise<Page> {
	name += '.md';
	const markdown = files.get(name);
	if (!markdown) throw Error(`file not found "${name}"`);
	const { data: metadata, content: markdownContent } = matter(markdown);
	const imports = new Imports();

	let result = (
		await unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(transformBasics(imports))
			.use(transformLinks(baseUrl))
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(markdownContent)
	).toString();

	// Generate the <svelte:head> content
	const headContent = [];
	if (metadata.title) headContent.push(`<title>${metadata.title}</title>`);

	if (headContent) {
		result = ['<svelte:head>', ...headContent, '</svelte:head>', result].join('\n');
	}

	result = imports.getScript(result);

	return {
		title: '?title?',
		html: result,
		name
	};
}

export function getPages(): { slug: string }[] {
	return files
		.getAllFiles()
		.filter((f) => f.endsWith('.md'))
		.map((f) => ({ slug: f.slice(0, -3) }));
}
