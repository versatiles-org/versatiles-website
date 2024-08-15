import { parse } from 'svelte/compiler'
import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'

async function markdownToHtml(content) {
	return (
		await unified()
			// turn Markdown Ìinto mdast
			.use(remarkParse)
			// turn Markdown (mdast) into HTML (hast)
			.use(remarkRehype, { allowDangerousHtml: true })
			// turn HTML (hast) into HTML string
			.use(rehypeStringify, { allowDangerousHtml: true })
			// process the string
			.process(content)
	).toString()
}

async function md2html(content) {
	const svast = parse(content)
	const { start, end } = svast.html
	const string = content.slice(start, end)
	const html = await markdownToHtml(string)

	return {
		code: content.replace(string, html),
	}
}

function markdown() {
	return {
		name: 'markdown',
		markup: ({ content, filename }) => {
			if (filename.endsWith('.md')) return md2html(content)
		},
	}
}

export default markdown
