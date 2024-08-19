import { visit } from 'unist-util-visit';

export function transformBasics(imports: Imports) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return () => (tree: any) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'chartflow') {
				imports.add('import ChartFlow from "$lib/components/ChartFlow.svelte";');
				node.tagName = 'ChartFlow';
				node.children = [];
			}
			if (node.tagName === 'pre' && node.children.length && node.children[0].tagName === 'code') {
				const codeNode = node.children[0];
				const language = codeNode.properties.className
					? codeNode.properties.className[0].replace('language-', '')
					: 'plaintext';
				const codeContent = codeNode.children[0].value
					.replace(/{/g, '&#123;')
					.replace(/}/g, '&#125;');

				imports.add('import CodeBlock from "$lib/components/CodeBlock.svelte";');
				// Replace the <pre><code> block with the <CodeBlock> component
				node.tagName = 'CodeBlock';
				node.properties = {
					code: codeContent,
					languageName: language
				};
				node.children = []; // No children needed for the custom component
			}
		});
	};
}

export class Imports {
	set: Set<string> = new Set();
	add(entry: string) {
		this.set.add(entry);
	}
	getScript(result: string): string {
		if (this.set.size == 0) return result;
		return ['<script lang="ts">', ...Array.from(this.set.values()), '</script>', result].join('\n');
	}
}

export function transformLinks(baseUrl: URL) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return () => (tree: any) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'a' && node.properties.href) {
				let href = String(node.properties.href);
				href = new URL(href, baseUrl).pathname;
				href = href.replace(/\.md$/i, '');
				node.properties.href = href;
			}
		});
	};
}
