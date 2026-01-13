const API_BASE = "http://localhost:8000/?rest_route=/wp/v2/pages";

export async function fetchPages() {
	const res = await fetch(`${API_BASE}&per_page=100`);
	if (!res.ok) return [];
	return await res.json();
}

export function buildFullPath(page, pageMap) {
	const segments = [page.slug];
	let current = page;

	while (current.parent && pageMap.has(current.parent)) {
		current = pageMap.get(current.parent);
		segments.unshift(current.slug);
	}

	return segments.join("/");
}
