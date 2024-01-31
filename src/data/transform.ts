import { EncryptedContactsList } from './model';

const base64regex =
	/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export function requestToEncryptedContactsList(
	req: Request
): EncryptedContactsList {
	const requestBody: any = req.body;

	if (base64regex.test(requestBody.contacts)) {
		return <EncryptedContactsList>{
			contacts: requestBody.contacts
		};
	}

	throw 'encrypted contacts list is not in base64 format';
}
