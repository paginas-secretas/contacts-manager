import { extractDocRef } from './param';
import { extractDocHash } from './header';
import {
	GitHubContactsRepository,
	requestBodyToEncryptedContactsList
} from '../data';
import { NotFoundError } from './response';
import { corsHeaders } from './cors';

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

export async function handleOptions(request: Request) {
	const requestHeader = request.headers.get('Access-Control-Request-Headers');
	if (
		request.headers.get('Origin') !== null &&
		request.headers.get('Access-Control-Request-Method') !== null &&
		requestHeader !== null
	) {
		// Handle CORS preflight requests.
		return new Response(null, {
			headers: {
				...corsHeaders,
				'Access-Control-Allow-Headers': requestHeader
			}
		});
	} else {
		// Handle standard OPTIONS request.
		return new Response(null, {
			headers: {
				Allow: 'GET, HEAD, POST, OPTIONS'
			}
		});
	}
}
