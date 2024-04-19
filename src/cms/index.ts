import { existsSync } from 'node:fs';
import { cp, mkdir, rm } from 'node:fs/promises';
import {  resolve } from 'node:path';
import type { WrappedProcessor } from './modules.ts';
import { getProcessor } from './modules.ts';
import { buildPages } from './pages.ts';

export default class CMS {
	private readonly srcPath: string;

	private readonly dstPath: string;

	private readonly mdProcessor: WrappedProcessor;

	public constructor(srcPath: string, dstPath: string) {
		this.srcPath = srcPath;
		this.dstPath = dstPath;
		this.mdProcessor = getProcessor();
	}

	public async build(): Promise<void> {
		await this.clearFolder();
		await Promise.all([
			this.copyAssets(),
			this.buildPages(),
		]);
	}

	private async clearFolder(): Promise<void> {
		if (existsSync(this.dstPath)) await rm(this.dstPath, { recursive: true });
		await mkdir(this.dstPath);
	}

	private async copyAssets(): Promise<void> {
		await cp(
			resolve(this.srcPath, 'assets'),
			resolve(this.dstPath, 'assets'),
			{ recursive: true },
		);
	}

	private async buildPages(): Promise<void> {
		await buildPages(this.srcPath, this.dstPath, this.mdProcessor);

		// #################
		process.exit();

		/*
				const { srcPath, dstPath, mdProcessor } = this;
		
		
				await Promise.all(filenames.map(async filename => {
					await buildPage(resolve(path, filename));
				}));
		
				async function buildPage(fullname: string): Promise<void> {
					const filename = basename(fullname);
					const pagename = basename(filename, '.md');
		
					try {
						const content = await readFile(fullname, 'utf8');
						const { text, data } = await mdProcessor(content);
		
						if (!('title' in data) || (typeof data.title !== 'string')) throw Error('missing title');
		
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
		
					} catch (error) {
						console.error('Error for page ' + pagename);
						throw error;
					}
				}
			*/

	}

}
