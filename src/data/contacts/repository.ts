import {
	DocumentHash,
	DocumentReference,
	EncryptedContactsList
} from '../model';
import { requestBodyToEncryptedContactsList } from '../transform';
import { GitHubRepoConfig } from './model';
import { rawGitHubServerBaseUrl } from './url';

export interface ContactsRepository {
	fetch(
		ref: DocumentReference,
		hash: DocumentHash
	): Promise<EncryptedContactsList>;
}

export class GitHubContactsRepository implements ContactsRepository {
	private config: GitHubRepoConfig;

	constructor(config: GitHubRepoConfig) {
		this.config = config;
	}

	async fetch(ref: string, hash: string): Promise<EncryptedContactsList> {
		const endpointUrl = new URL(
			`/${this.config.owner}/${this.config.repo}/${hash}/${ref}`,
			rawGitHubServerBaseUrl
		);
		const headers = { Authorization: `Bearer ${this.config.token}` };

		const response = await fetch(endpointUrl, { headers: headers });

		if (response.status != 200) {
			throw `failed to fetch document with reference: ${ref} (status: ${response.status})`;
		}

		const bodyJson = await response.json();

		return requestBodyToEncryptedContactsList(Object.assign({}, bodyJson));
	}
}
