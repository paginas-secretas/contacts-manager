import { describe, expect, test } from '@jest/globals';
import { extractDocHash } from './header';

describe('extractDocHash', () => {
	test('should return undefined if x-doc-hash header is not present', () => {
		const headers = new Headers();
		expect(extractDocHash(headers)).toBeUndefined();
	});

	test('should return the value of x-doc-hash header when this is present in the header', () => {
		const headers = new Headers();
		headers.set('x-doc-hash', 'some-hash-value');
		expect(extractDocHash(headers)).toBe('some-hash-value');
	});
});
