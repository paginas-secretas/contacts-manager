import { Env, fromEnv } from './config';
import { GitHubContactsRepository, GitHubRepoConfig } from './data';
import {
	CORSResponse,
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

		const response = await handleRequestRouting(request, {
			contacts: () =>
				handleFetchEncryptedContactsListRequest(request, repository),
			addContacts: () =>
				handlePostEncryptedContactsListRequest(request, repository),
			default: () => new NotFoundError()
		});

		return new CORSResponse(response);
	}
};
