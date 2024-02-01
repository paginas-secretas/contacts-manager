import { describe, expect, test } from '@jest/globals';
import { EncryptedContactsList } from './model';
import { requestBodyToEncryptedContactsList } from './transform';

describe('requestToEncryptedContactsList', () => {
	test('is able to transform to EncryptedContactsList when contacts is in base64 format', () => {
		const contactsValue = 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=';
		const req = <Partial<EncryptedContactsList>>{
			contacts: contactsValue
		};

		const result: EncryptedContactsList =
			requestBodyToEncryptedContactsList(req);

		expect(result).toEqual({
			contacts: contactsValue
		});
	});

	test('should throw exception when contacts is not in base64 format', () => {
		const contactsValue = 'encryptedContactString';
		const req = <Partial<EncryptedContactsList>>{
			contacts: contactsValue
		};

		const resultCall = () => requestBodyToEncryptedContactsList(req);
		expect(resultCall).toThrow(
			'encrypted contacts list is not in base64 format'
		);
	});

	test('sshould throw exception when contacts when body is empty', () => {
		const req = <Partial<EncryptedContactsList>>{};

		const resultCall = () => requestBodyToEncryptedContactsList(req);
		expect(resultCall).toThrow(
			'encrypted contacts list is not in base64 format'
		);
	});
});
