import { describe, expect, test } from '@jest/globals';
import { buildRouteRegex } from './route';

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
			const expectedRegex = new RegExp(`^/(foo)/?([^/\n]*)?/?(bar)?/?([^/\n]*)?/?$`);

			expect(regex).toEqual(expectedRegex);
		});
	});
});
