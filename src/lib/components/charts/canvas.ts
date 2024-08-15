import type { BBox } from './bbox.ts';
import { Group, createElement, setAttributes } from './svg.ts';



const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Canvas {
	public readonly root: Group;

	private idIndex = 0;

	public constructor() {
		this.root = new Group(this);
	}

	public getBBox(): BBox {
		return this.root.getBBox();
	}

	public asSVG(padding = 5): string {
		const { root } = this;
		const svg = createElement('svg');
		const bbox = root.getBBox();
		bbox.addPadding(padding);
		svg.append(root.node);

		setAttributes(svg, {
			version: '1.1',
			xmlns: 'http://www.w3.org/2000/svg',
		});
		svg.setAttribute('viewBox', bbox.viewBox);
		return svg.outerHTML();
	}

	public getNewId(): string {
		let i = this.idIndex++;
		let id = '';
		do {
			id += chars[i % chars.length];
			i = Math.floor(i / chars.length);
		} while (i > 0);
		return id;
	}
}
