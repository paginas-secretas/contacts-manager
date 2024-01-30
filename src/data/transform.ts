import { EncryptedContactsList } from './model';

export function requestToEncryptedContactsList(
	req: Request
): EncryptedContactsList {
	const requestBody: any = req.body;

	return <EncryptedContactsList>{
		contacts: requestBody.contacts
	};
}
