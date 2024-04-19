/* eslint-disable @typescript-eslint/prefer-destructuring */
import { readFile, readdir } from 'node:fs/promises';
import type { WrappedProcessor } from './modules.ts';
import { basename, resolve } from 'node:path';
import { generateMenu } from './menu.ts';

export interface Page {
	title: string;
	html: string;
	filename: string;
}

export async function buildPages(srcPath: string, dstPath: string, mdProcessor: WrappedProcessor): Promise<Page[]> {

	const pagesPath = resolve(srcPath, 'pages');
	const filenames = (await readdir(pagesPath, { recursive: true }))
		.filter(filename => filename.endsWith('.md') && !/readme\.md/i.test(filename));

	const pages = await Promise.all(filenames.map(async (filename: string): Promise<Page> => {
		const fullname = resolve(pagesPath, filename);
		const pagename = basename(filename, '.md');

		const content = await readFile(fullname, 'utf8');
		const { text, data } = await mdProcessor(content);

		let title;
		if (('title' in data) && (typeof data.title === 'string')) {
			title = data.title;
		} else {
			title = pagename.replace(/[\s_\-]+/g, ' ').trim();
			console.error('missing title: ' + filename);
		}

		return {
			title,
			filename: filename.replace(/\.md$/i, '.html'),
			html: text,
		};
	}));

	console.log(pages.map(p => p));
	process.exit();

	/*
	const partials = getPartials(srcPath);
	const handlebars = await getHandlebars(srcPath, dstPath);

	await Promise.all(pages)
	let html = [
		partials.header,
		text,
		partials.footer,
	].join('\n');

	html = handlebars.compile(html)({
		...data,
		menu: generateMenu(filename),
		githubLink: `https://github.com/versatiles-org/versatiles-website/blob/main/docs/pages/${filename}`,
	});

	await writeFile(resolve(dstPath, pagename + '.html'), html);
	*/
}
