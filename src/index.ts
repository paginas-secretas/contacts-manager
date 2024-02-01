import { Env, fromEnv } from './config';
import { handleFetchEncryptedContactsList, handleRequestRouting } from './http';

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const config = fromEnv(env);

		return handleRequestRouting(request, {
			contacts: () => handleFetchEncryptedContactsList(request, config),
			default: () => new Response(undefined, { status: 404 })
		});
	}
};
