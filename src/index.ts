import { Env, fromEnv } from './config';
import {
	NotFoundError,
	handleFetchEncryptedContactsListRequest,
	handleRequestRouting
} from './http';

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const config = fromEnv(env);

		return handleRequestRouting(request, {
			contacts: () => handleFetchEncryptedContactsListRequest(request, config),
			default: () => new NotFoundError()
		});
	}
};
