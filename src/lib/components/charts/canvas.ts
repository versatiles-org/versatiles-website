import type { BBox } from './bbox.ts';
import { Group, createElement, setAttributes } from './svg.ts';


export class Canvas {
	public readonly root: Group;

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
			viewBox: bbox.viewBox,
			width: bbox.width,
			height: bbox.height,
		});
		return svg.outerHTML();
	}
}
