import { describe, expect, test } from '@jest/globals';
import { EncryptedContactsList } from './model';
import { requestToEncryptedContactsList } from './transform';

describe('requestToEncryptedContactsList', () => {
	test('should return EncryptedContactsList with correct contacts', () => {
		const contactsValue = 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=';
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

	test('should throw exception when contacts is not in base 64', () => {
		const contactsValue = 'encryptedContactString';
		const req: any = {
			body: {
				contacts: contactsValue
			}
		};

		expect(() => requestToEncryptedContactsList(req)).toThrow(
			'encrypted contacts list is not in base64 format'
		);
	});

	test('should return EncryptedContactsList with empty contacts if body is empty', () => {
		const req: any = {
			body: {}
		};

		expect(() => requestToEncryptedContactsList(req)).toThrowError(
			'encrypted contacts list is not in base64 format'
		);
	});
});
