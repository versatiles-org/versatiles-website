import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import { visit } from 'unist-util-visit';

function escapeCurlyBracesInCodeBlocks(content) {
	return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
}

function transformCodeBlocks() {
	return () => (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'pre' && node.children.length && node.children[0].tagName === 'code') {
				const codeNode = node.children[0];
				const language = codeNode.properties.className ? codeNode.properties.className[0].replace('language-', '') : 'plaintext';
				const codeContent = escapeCurlyBracesInCodeBlocks(codeNode.children[0].value);

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

async function markdownToHtml(content) {
	const processedContent = (
		await unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(transformCodeBlocks())
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(content)
	).toString();

	// Inject the import statement at the top
	return `<script lang="ts">\nimport CodeBlock from "$lib/components/CodeBlock.svelte";\n</script>\n${processedContent}`;
}

function markdown() {
	return {
		name: 'markdown',
		markup: ({ content, filename }) => {
			if (filename.endsWith('.md')) {
				return markdownToHtml(content).then((code) => ({ code }));
			}
			return { code: content };
		},
	};
}

export default markdown;
