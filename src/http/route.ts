export const contactsRoute = '/contacts/';

interface RoutingTable {
    contacts: () => Response,
    default: () => Response
};

export function handleRequestRouting(
    request: Request,
    routing: RoutingTable
) {
    const endpoint = extractEndpointFromRequest(request);

    switch (endpoint) {
        case contactsRoute:
            return routing.contacts();
        default:
            return routing.default();
    }
};

function extractEndpointFromRequest(
    request: Request
) {
    let endpoint = new URL(request.url).pathname;

    if (!endpoint.endsWith('/')) {
        endpoint = `${endpoint}/`
    }

    return endpoint;
}