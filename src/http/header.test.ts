import { describe, expect, test } from '@jest/globals';
import { extractDocHash}  from './header';


describe('extractDocHash', () => {
  test('should return null if header does not contain x-doc-hash', () => {
    const headers = new Headers();
    expect(extractDocHash(headers)).toBeNull();
  });

  test('should return the docHash x-doc-hash from headers', () => {
    const headers = new Headers();
    headers.set('x-doc-hash', 'some-hash-value');
    expect(extractDocHash(headers)).toBe('some-hash-value');
  });
});