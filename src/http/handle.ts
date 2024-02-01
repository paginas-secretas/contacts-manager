import { extractDocRef } from './param';
import { extractDocHash } from './header';
import { GitHubContactsRepository, GitHubRepoConfig } from '../data';
import { Config } from '../config';
import { NotFoundError } from './response';

export async function handleFetchEncryptedContactsListRequest(
	request: Request,
	config: Config
): Promise<Response> {
	const ref = extractDocRef(new URL(request.url));
	const hash = extractDocHash(request.headers);

	if (!ref || !hash) {
		return new NotFoundError();
	}

	try {
		const repository = new GitHubContactsRepository(
			config.contactsManagerDB satisfies GitHubRepoConfig
		);

		const encryptedContactsList = await repository.fetch(ref, hash);

		return new Response(JSON.stringify(encryptedContactsList));
	} catch (error) {
		console.error(error);

		return new NotFoundError();
	}
}
