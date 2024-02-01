export const contactsRoute = '/contacts/';

const routeRegex = buildRouteRegex(['contacts']);

/**
 * Types supported routes.
 */
export interface RoutingTable {
	contacts: () => Promise<Response>;
	addContacts: () => Promise<Response>;
	default: () => Response;
}

/**
 * Handles a request by calling the appropriate function that matches the route for such request.
 * Use this function as the entry call when a new request is received.
 *
 * @param request - the incoming request to be handled
 * @param routing - the routing table that provides the outgoing responses each route
 * @returns the response returned by the matched routing callback.
 */
export function handleRequestRouting(request: Request, routing: RoutingTable) {
	const endpoint = new URL(request.url).pathname;
	const matches = endpoint.match(routeRegex)?.filter((x) => x != undefined);

	if (!matches) {
		return routing.default();
	} else if (matches.length <= 3) {
		if (request.method === 'GET') {
			return routing.contacts();
		} else if (request.method === 'POST') {
			return routing.addContacts();
		}
		return routing.default();
	} else {
		return routing.default();
	}
}

/**
 * 
 * curl -X POST http://localhost:8787/contacts \
   -H "Content-Type: application/json" \
   -d '{"contacts": "U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ="}'  
 * Builds a regular expression that is able to match REST routes (based on collections) through group values.
 *
 * Example: to match collection "foo" and resources associated to it, the function will return the following expression:
 *
 * `^/(foo)/?([^/\n]*)?/?$`
 *
 * The first group value matches "foo" and the second group the collection resources.
 *
 * @param collections
 * @returns a regular expression able to match collections and sub-collections.
 */
export function buildRouteRegex(collections: string[]): RegExp {
	return new RegExp(
		`^/${collections
			.map((x, idx) => `(${x})${idx > 0 ? '?' : ''}/?([^/\n]*)?/?`)
			.join('')}$`
	);
}
