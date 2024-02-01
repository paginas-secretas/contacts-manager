import { Env, fromEnv } from './config';
import { GitHubContactsRepository, GitHubRepoConfig } from './data';
import { handleRequestRouting } from './http/route';

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const config = fromEnv(env);

		return handleRequestRouting(request, {
			contacts: () => new Response(undefined),
			default: () => new Response(undefined, { status: 404 })
		});
	}
};
