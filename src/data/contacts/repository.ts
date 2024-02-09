import upsert, {
	GitHubRepository,
	File,
	isGitHubFile
} from '@web-pacotes/github-upsert';
import {
	DocumentHash,
	DocumentReference,
	EncryptedContactsList,
	PartialEncryptedContactsList
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

	async upsert(
		encryptedContactsList: EncryptedContactsList
	): Promise<PartialEncryptedContactsList> {
		const repo = <GitHubRepository>{
			name: this.config.repo,
			owner: this.config.owner,
			pat: this.config.token
		};

		const data = new TextEncoder().encode(
			JSON.stringify(encryptedContactsList)
		);
		const file = <File>{ data: data };

		const ref = crypto.randomUUID();
		const path = `${ref}.ecsj`;

		const result = await upsert(repo, file, path);

		if (result && isGitHubFile(result)) {
			return <PartialEncryptedContactsList>{
				hash: result.blob,
				ref: path
			};
		}

		throw 'failed to upsert encrypted contacts list';
	}
}
