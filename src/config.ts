export interface Env {
	CONTACTS_DB_GITHUB_REPOSITORY_OWNER: string;
	CONTACTS_DB_GITHUB_REPOSITORY_REPO: string;
	CONTACTS_DB_GITHUB_REPOSITORY_BRANCH: string;
	CONTACTS_DB_GITHUB_REPOSITORY_TOKEN: string;
}

interface ContactsManagerDBGitHubConfig {
	owner: string;
	repo: string;
	branch: string;
	token: string;
}

export interface Config {
	contactsManagerDB: ContactsManagerDBGitHubConfig;
}

export function fromEnv(env: Env): Config {
	return {
		contactsManagerDB: {
			branch: env.CONTACTS_DB_GITHUB_REPOSITORY_BRANCH,
			owner: env.CONTACTS_DB_GITHUB_REPOSITORY_OWNER,
			repo: env.CONTACTS_DB_GITHUB_REPOSITORY_REPO,
			token: env.CONTACTS_DB_GITHUB_REPOSITORY_TOKEN,
		}
	};
}
