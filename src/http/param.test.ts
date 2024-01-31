import { describe, expect, test } from '@jest/globals';
import { extractDocRef } from './param';

describe('extractDocRef', () => {
	test('should return undefined if url does not contain ref', () => {
		const url = new URL('http://www.test/contacts/');
		expect(extractDocRef(url)).toBeUndefined();
	});

	test('should return the ref value when the url contains it', () => {
		const url = new URL('http://www.test/contacts/ref/');
		expect(extractDocRef(url)).toBe('ref');
	});
});
