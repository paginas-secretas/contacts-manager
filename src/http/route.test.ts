import { describe, expect, test, jest } from '@jest/globals';
import { RoutingTable, buildRouteRegex, handleRequestRouting } from './route';

describe('route', () => {
	describe('buildRouteRegex', () => {
		test('empty collections should build a regex that matches ^/$', () => {
			const collections: string[] = [];
			const regex = buildRouteRegex(collections);
			const expectedRegex = new RegExp('^/$');

			expect(regex).toEqual(expectedRegex);
		});

		test('collections with element "foo" should build a regex that matches ^/(foo)/?([^/\n]*)?/?$', () => {
			const collections = ['foo'];
			const regex = buildRouteRegex(collections);
			const expectedRegex = new RegExp(`^/(foo)/?([^/\n]*)?/?$`);

			expect(regex).toEqual(expectedRegex);
		});

		test('collections with element "foo" and "bar" should build a regex that matches ^/(foo)/?([^/\n]*)?/?(bar)?/?([^/\n]*)?/?$', () => {
			const collections = ['foo', 'bar'];
			const regex = buildRouteRegex(collections);
			const expectedRegex = new RegExp(
				`^/(foo)/?([^/\n]*)?/?(bar)?/?([^/\n]*)?/?$`
			);

			expect(regex).toEqual(expectedRegex);
		});
	});

	describe('handleRequestRouting', () => {
		test('a request with / endpoint should match the default route', () => {
			const request = new Request('https://paginassecretas.fun');
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(defaultCallback).toBeCalled();
		});

		test('a request with /anything endpoint should match the default route', () => {
			const request = new Request('https://paginassecretas.fun/anything');
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(defaultCallback).toBeCalled();
		});

		test('a request with /contacts endpoint should match the contacts route', () => {
			const request = new Request('https://paginassecretas.fun/contacts');
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(contactsCallback).toBeCalled();
		});

		test('a request with /contacts/ endpoint should match the contacts route', () => {
			const request = new Request('https://paginassecretas.fun/contacts/');
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(contactsCallback).toBeCalled();
		});

		test('a request with /contacts/:ref endpoint should match the contacts route', () => {
			const request = new Request('https://paginassecretas.fun/contacts/:ref');
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(contactsCallback).toBeCalled();
		});

		test('a GET request with /contacts/:ref/ endpoint should match the contacts route', () => {
			const request = new Request(
				'https://paginassecretas.fun/contacts/:ref/',
				{ method: 'GET' }
			);
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(contactsCallback).toBeCalled();
		});

		test('a POST request with /contacts/:ref/ endpoint should match the add contacts route', () => {
			const request = new Request(
				'https://paginassecretas.fun/contacts/:ref/',
				{ method: 'POST' }
			);
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(addContactsCallback).toBeCalled();
		});

		test('a PUT request with /contacts/:ref/ endpoint should match the default route', () => {
			const request = new Request(
				'https://paginassecretas.fun/contacts/:ref/',
				{ method: 'PUT' }
			);
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(defaultCallback).toBeCalled();
		});

		test('a request with /contacts/:ref/anything endpoint should match the default route', () => {
			const request = new Request(
				'https://paginassecretas.fun/contacts/:ref/anything'
			);
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(defaultCallback).toBeCalled();
		});

		test('a OPTIONS request with /contacts/:ref/ endpoint should match the preflight route', () => {
			const request = new Request(
				'https://paginassecretas.fun/contacts/:ref/',
				{ method: 'OPTIONS' }
			);
			const defaultCallback = jest.fn<() => Response>();
			const contactsCallback = jest.fn<() => Promise<Response>>();
			const addContactsCallback = jest.fn<() => Promise<Response>>();
			const preflightCallback = jest.fn<() => Promise<Response>>();
			const routingTable = <RoutingTable>{
				default: defaultCallback,
				contacts: contactsCallback,
				addContacts: addContactsCallback,
				preflight: preflightCallback
			};

			handleRequestRouting(request, routingTable);

			expect(preflightCallback).toBeCalled();
		});
	});
});
