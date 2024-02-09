import { extractDocRef } from './param';
import { extractDocHash } from './header';
import {
	GitHubContactsRepository,
	requestBodyToEncryptedContactsList
} from '../data';
import { NotFoundError } from './response';

export async function handleFetchEncryptedContactsListRequest(
	request: Request,
	repository: GitHubContactsRepository
): Promise<Response> {
	const ref = extractDocRef(new URL(request.url));
	const hash = extractDocHash(request.headers);

	if (!ref || !hash) {
		return new NotFoundError();
	}

	try {
		const encryptedContactsList = await repository.fetch(ref, hash);

		return new Response(JSON.stringify(encryptedContactsList));
	} catch (error) {
		console.error(error);

		return new NotFoundError();
	}
}

export async function handlePostEncryptedContactsListRequest(
	request: Request,
	repository: GitHubContactsRepository
): Promise<Response> {
	try {
		const bodyJson = await request.json();
		const encryptedContactsList = requestBodyToEncryptedContactsList(
			Object.assign({}, bodyJson)
		);

		const response = await repository.upsert(encryptedContactsList);

		return new Response(JSON.stringify(response));
	} catch (error) {
		console.error(error);

		return new NotFoundError();
	}
}
