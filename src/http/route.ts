export const contactsRoute = '/contacts/';

const routeRegex = buildRouteRegex(['contacts']);

interface RoutingTable {
	contacts: () => Response;
	default: () => Response;
}

export function handleRequestRouting(request: Request, routing: RoutingTable) {
	const endpoint = new URL(request.url).pathname;
	const matches = endpoint.match(routeRegex)?.filter((x) => x != undefined);

	if (!matches) {
		return routing.default();
	} else if (matches.length <= 3) {
		return routing.contacts();
	} else {
		return routing.default();
	}
}

export function buildRouteRegex(
	collections: string[]
): RegExp {
	return new RegExp(`^/${collections.map((x, idx) => `(${x})${idx > 0 ? '?' : ''}/?([^/\n]*)?/?`).join('')}$`);
}