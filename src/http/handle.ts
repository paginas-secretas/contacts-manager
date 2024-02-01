import { extractDocRef } from './param';
import { extractDocHash } from './header';
import { GitHubContactsRepository, GitHubRepoConfig } from '../data';
import { Config } from '../config';

export async function handleFetchEncryptedContactsList(
	request: Request,
	config: Config
): Promise<Response> {
	const ref = extractDocRef(new URL(request.url));
	const hash = extractDocHash(request.headers);

	if (!ref || !hash) {
		return new Response(undefined, { status: 404 });
	}

	try {
		const repository = new GitHubContactsRepository(
			config.contactsManagerDB satisfies GitHubRepoConfig
		);

		const encryptedContactsList = await repository.fetch(ref, hash);

		return new Response(JSON.stringify(encryptedContactsList));
	} catch (error) {
		console.error(error);

		return new Response(undefined, { status: 404 });
	}
}
