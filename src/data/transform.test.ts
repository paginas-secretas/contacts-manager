import { describe, expect, test } from '@jest/globals';
import { EncryptedContactsList } from './model';
import { requestToEncryptedContactsList } from './transform';

describe('requestToEncryptedContactsList', () => {
	test('should return EncryptedContactsList with correct contacts', () => {
		const contactsValue = 'encryptedContactString';
		const req: any = {
			body: {
				contacts: contactsValue
			}
		};

		const result: EncryptedContactsList = requestToEncryptedContactsList(req);

		expect(result).toEqual({
			contacts: contactsValue
		});
	});

	test('should return EncryptedContactsList with empty contacts if body is empty', () => {
		const req: any = {
			body: {}
		};

		const result: EncryptedContactsList = requestToEncryptedContactsList(req);

		expect(result).toEqual({
			contacts: undefined
		});
	});
});
