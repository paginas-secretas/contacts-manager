import { EncryptedContactsList } from './model';

const base64regex =
	/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export function requestBodyToEncryptedContactsList(
	body: Partial<EncryptedContactsList>
): EncryptedContactsList {
	if (body.contacts && base64regex.test(body.contacts)) {
		return <EncryptedContactsList>{
			contacts: body.contacts
		};
	}

	throw 'encrypted contacts list is not in base64 format';
}
