import { Env, fromEnv } from './config';
import { GitHubContactsRepository, GitHubRepoConfig } from './data';
import {
	NotFoundError,
	handleFetchEncryptedContactsListRequest,
	handlePostEncryptedContactsListRequest,
	handleRequestRouting
} from './http';

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const config = fromEnv(env);

		const repository = new GitHubContactsRepository(
			config.contactsManagerDB satisfies GitHubRepoConfig
		);

		return handleRequestRouting(request, {
			contacts: () =>
				handleFetchEncryptedContactsListRequest(request, repository),
			addContacts: () =>
				handlePostEncryptedContactsListRequest(request, repository),
			default: () => new NotFoundError()
		});
	}
};
