import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { handlePostEncryptedContactsListRequest } from './handle';
import {
	PartialEncryptedContactsList,
	GitHubContactsRepository,
	GitHubRepoConfig
} from '../data';

describe('handlePostEncryptedContactsListRequest', () => {
	const mockUpsert = jest.fn<() => Promise<PartialEncryptedContactsList>>();

	const mockConfig: GitHubRepoConfig = {
		branch: 'branch',
		owner: 'owner',
		repo: 'repo',
		token: 'token'
	};

	const mockRepository = new GitHubContactsRepository(mockConfig);
	mockRepository.upsert = mockUpsert;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should handle post request and return response', async () => {
		const mockRequestBody = {
			contacts: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ='
		};
		const mockRequest = new Request(
			'https://paginassecretas.fun/contacts/:ref/',
			{ method: 'POST', body: JSON.stringify(mockRequestBody) }
		);

		const expectedResponse = { hash: 'hash', ref: 'ref' };

		mockUpsert.mockResolvedValue({ hash: 'hash', ref: 'ref' });

		const response = await handlePostEncryptedContactsListRequest(
			mockRequest,
			mockRepository
		);

		expect(mockUpsert).toHaveBeenCalledWith(mockRequestBody);
		expect(response).toBeDefined();
		expect(response.status).toEqual(200);
		expect(await response.json()).toEqual(expectedResponse);
	});

	test('should handle errors and return NotFoundError', async () => {
		const mockRequestBody = {
			contacts: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ='
		};
		const mockRequest = new Request(
			'https://paginassecretas.fun/contacts/:ref/',
			{ method: 'POST', body: JSON.stringify(mockRequestBody) }
		);

		mockUpsert.mockRejectedValueOnce(new Error('error'));

		const response = await handlePostEncryptedContactsListRequest(
			mockRequest,
			mockRepository
		);

		expect(mockUpsert).toHaveBeenCalledWith(mockRequestBody);
		expect(response).toBeDefined();
		expect(response.status).toEqual(404);
	});
});
