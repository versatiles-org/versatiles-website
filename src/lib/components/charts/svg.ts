import { BBox } from './bbox.ts';
import type { Canvas } from './canvas.ts';

export type BBoxType = [number, number, number, number];
export type RectType = [number, number, number, number];
export type PointType = [number, number];
export type Style = Record<string, string>;

export class Group {
	public readonly node: SVGElement;

	protected readonly bbox: BBox;

	protected readonly subGroups: Group[] = [];

	private readonly canvas: Canvas;

	public constructor(canvas: Canvas) {
		this.node = createElement('g');
		this.bbox = new BBox();
		this.canvas = canvas;
	}

	public getBBox(): BBox {
		const bbox = this.bbox.clone();
		this.subGroups.forEach(g => {
			bbox.include(g.getBBox());
		});
		return bbox;
	}

	public appendGroup(): Group {
		const group = new Group(this.canvas);
		this.append(group.node);
		this.subGroups.push(group);
		return group;
	}

	public drawText(rect: RectType, text: string, style: Style): SVGElement {
		const node = this.appendElement('text');
		setAttributes(node, {
			x: Math.round(rect[0] + rect[2] / 2),
			y: Math.round(rect[1] + rect[3] / 2),
		});
		this.setMultiStyle(node, { dominantBaseline: 'central', textAnchor: 'middle', ...style });
		node.textContent = text;
		this.bbox.includeRect(rect);
		return node;
	}

	public drawFlowBox(rect: RectType, style: Style): SVGElement {
		const strength = 0.5;

		const node = this.appendElement('path');
		const x0 = rect[0];
		const x1 = rect[0] + rect[3] * strength;
		const x2 = rect[0] + rect[2];
		const x3 = rect[0] + rect[2] + rect[3] * strength;
		const y0 = rect[1];
		const y1 = rect[1] + rect[3] / 2;
		const y2 = rect[1] + rect[3];

		const d = `M${x0},${y0}L${x1},${y1}L${x0},${y2}L${x2},${y2}L${x3},${y1}L${x2},${y0}z`;
		setAttributes(node, { d });
		this.setMultiStyle(node, style);
		this.bbox.includeRect([rect[0], rect[1], rect[2] + rect[3] * strength, rect[3]]);
		return node;
	}

	public setMultiStyle(node: SVGElement, style: Style): void {
		Object.entries(style).forEach(([key, value]) => {
			node.style[key] = value;
		})
	}

	private append(node: SVGElement): SVGElement {
		this.node.append(node);
		return node;
	}

	private appendElement(tagName: string): SVGElement {
		return this.append(createElement(tagName));
	}
}

export function createElement(tagName: string): SVGElement {
	return new SVGElement(tagName);
}

export function setAttributes(node: SVGElement, attributeObj: Record<string, number | string | null>): void {
	for (const key in attributeObj) {
		const value = attributeObj[key];
		if (value == null) {
			node.removeAttribute(key);
		} else {
			node.setAttribute(key, String(value));
		}
	}
}

export class SVGElement {
	tagName: string;
	public textContent: string | undefined;
	public style: Style = {};
	attributes = new Map<string, string>;
	children: SVGElement[] = [];
	constructor(tagName: string) {
		this.tagName = tagName;
	}
	public setAttribute(key: string, value: string) {
		this.attributes.set(key, value);
	}
	public removeAttribute(key: string) {
		this.attributes.delete(key);
	}
	public append(node: SVGElement) {
		this.children.push(node);
	}
	public outerHTML(): string {
		let content: string = '';
		if (this.children.length > 0) {
			content = this.children.map(c => c.outerHTML()).join('');
		}
		if (this.textContent) {
			if (content) throw Error();
			content = this.textContent;
		}

		let properties = Array.from(this.attributes.entries()).map(([k, v]) => ` ${k}="${v}"`).join('');
		const style = Object.entries(this.style).map(([key, value]) => {
			key = key.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
			if (value.includes('"')) throw Error();
			if (value.includes(';')) throw Error();
			if (value.includes(':')) throw Error();
			return key + ':' + value
		}).join(';');
		if (style) {
			properties += ` style="${style}"`;
		}
		if (content) {
			return `<${this.tagName}${properties} >${content}</${this.tagName}>`;
		} else {
			return `<${this.tagName}${properties} />`;
		}
	}
}
