import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resolveCountrySelection } from './country-target';

class FakeElement {
	private readonly _id?: string;
	private readonly _tagName: string;
	private readonly _title?: string;
	parentElement: FakeElement | null = null;
	private readonly children: FakeElement[] = [];

	get textContent(): string | null {
		return this._title ?? null;
	}

	constructor(tagName: string, id?: string, title?: string) {
		this._tagName = tagName;
		this._id = id;
		this._title = title;
	}

	appendChild(child: FakeElement): FakeElement {
		this.children.push(child);
		child.parentElement = this;
		return child;
	}

	getAttribute(name: string): string | null {
		if (name === 'id') {
			return this._id ?? null;
		}
		return null;
	}

	querySelector(selector: string): FakeElement | null {
		if (selector !== 'title') {
			return null;
		}
		return this.children.find((child) => child._tagName === 'title') ?? null;
	}

}

const OriginalElement = globalThis.Element;

describe('country selection resolution', () => {
	beforeEach(() => {
		Object.defineProperty(globalThis, 'Element', {
			value: FakeElement,
			configurable: true,
			writable: true
		});
	});

	afterEach(() => {
		Object.defineProperty(globalThis, 'Element', {
			value: OriginalElement,
			configurable: true,
			writable: true
		});
	});

	it('finds a country when the clicked element is a direct path without a surrounding group', () => {
		const path = new FakeElement('path', 'gt');
		const title = new FakeElement('title', undefined, 'Guatemala');
		path.appendChild(title);

		expect(resolveCountrySelection(path as unknown as EventTarget)).toEqual({
			id: 'gt',
			name: 'Guatemala',
			element: path
		});
	});

	it('prefers the owning country group when the clicked shape is a nested path inside a grouped country', () => {
		const group = new FakeElement('g', 'bd');
		const title = new FakeElement('title', undefined, 'Bangladesh');
		group.appendChild(title);

		const nestedPath = new FakeElement('path', 'path3240');
		group.appendChild(nestedPath);

		expect(resolveCountrySelection(nestedPath as unknown as EventTarget)).toEqual({
			id: 'bd',
			name: 'Bangladesh',
			element: group
		});
	});
});
