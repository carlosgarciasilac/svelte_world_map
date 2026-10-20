export type CountrySelection = {
	id: string;
	name: string;
	element: Element;
};

export function resolveCountrySelection(target: EventTarget | null): CountrySelection | null {
	if (!(target instanceof Element)) {
		return null;
	}

	let current: Element | null = target;
	while (current) {
		const id = current.getAttribute('id')?.trim();
		if (id) {
			const title = current.querySelector('title')?.textContent?.trim();
			if (title) {
				return { id, name: title, element: current };
			}
		}

		current = current.parentElement;
	}

	return null;
}
