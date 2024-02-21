import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import {
	handleFetchEncryptedContactsListRequest,
	handleOptions,
	handlePostEncryptedContactsListRequest
} from './handle';
import {
	PartialEncryptedContactsList,
	EncryptedContactsList,
	GitHubContactsRepository,
	GitHubRepoConfig,
	DocumentHash,
	DocumentReference
} from '../data';

describe('handleFetchEncryptedContactsListRequest', () => {
	const mockDocHash = jest.fn<() => DocumentHash>();
	jest.mock('./header', () => ({
		extractDocHash: mockDocHash
	}));

	const mockDocRef = jest.fn<() => DocumentReference>();
	jest.mock('./param', () => ({
		extractDocRef: mockDocRef
	}));

	const mockFetch = jest.fn<() => Promise<EncryptedContactsList>>();

	const mockConfig: GitHubRepoConfig = {
		branch: 'branch',
		owner: 'owner',
		repo: 'repo',
		token: 'token'
	};

	const mockRepository = new GitHubContactsRepository(mockConfig);
	mockRepository.fetch = mockFetch;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should handle post request and return response', async () => {
		const hash = 'hash';
		const ref = 'ref';
		const headers = new Headers();
		headers.set('x-doc-hash', hash);

		const mockRequest = new Request(
			`https://paginassecretas.fun/contacts/${ref}/`,
			{ method: 'GET', headers: headers }
		);

		const expectedResponse = {
			contacts: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ='
		};

		mockDocHash.mockReturnValue(hash);
		mockDocRef.mockReturnValue(ref);
		mockFetch.mockResolvedValue(expectedResponse);

		const response = await handleFetchEncryptedContactsListRequest(
			mockRequest,
			mockRepository
		);

		expect(mockFetch).toHaveBeenCalledWith(ref, hash);
		expect(response).toBeDefined();
		expect(response.status).toEqual(200);
		expect(await response.json()).toEqual(expectedResponse);
	});

	test('should handle errors and return NotFoundError', async () => {
		const hash = 'hash';
		const ref = 'ref';
		const headers = new Headers();
		headers.set('x-doc-hash', hash);

		const mockRequest = new Request(
			`https://paginassecretas.fun/contacts/${ref}/`,
			{ method: 'GET', headers: headers }
		);

		mockFetch.mockRejectedValueOnce(new Error('error'));

		const response = await handleFetchEncryptedContactsListRequest(
			mockRequest,
			mockRepository
		);

		expect(mockFetch).toHaveBeenCalledWith(ref, hash);
		expect(response).toBeDefined();
		expect(response.status).toEqual(404);
	});
});

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

describe('handleOptions', () => {
	test('should return response without cors headers when headers is empty', async () => {
		const mockRequest = new Request(
			'https://paginassecretas.fun/contacts/:ref/',
			{ method: 'POST', body: null }
		);

		const response = await handleOptions(mockRequest);

		expect(response).toBeDefined();
		expect(response.headers).toBeDefined();
		expect(response.body).toBeNull();
		expect(response.headers.keys()).toContain('allow');
		expect(response.headers.get('Allow')).toEqual('GET, HEAD, POST, OPTIONS');
	});

	test('should return response with cors headers when headers access control info', async () => {
		const accessControlRequestHeaders = 'Access-Control-Request-Headers';
		const mockRequest = new Request(
			'https://paginassecretas.fun/contacts/:ref/',
			{
				method: 'POST',
				body: null,
				headers: {
					Origin: 'https://paginassecretas.fun/contacts/',
					'Access-Control-Request-Method': 'Access-Control-Request-Method',
					'Access-Control-Request-Headers': accessControlRequestHeaders
				}
			}
		);

		const response = await handleOptions(mockRequest);

		expect(response).toBeDefined();
		expect(response.headers).toBeDefined();
		expect(response.body).toBeNull();
		expect(response.headers.keys()).toContain('access-control-allow-headers');
		expect(response.headers.keys()).toContain('access-control-allow-origin');
		expect(response.headers.keys()).toContain('access-control-allow-methods');
		expect(response.headers.keys()).toContain('access-control-max-age');
		expect(response.headers.get('Access-Control-Allow-Headers')).toEqual(
			accessControlRequestHeaders
		);
		expect(response.headers.get('Access-Control-Allow-Origin')).toEqual('*');
		expect(response.headers.get('Access-Control-Allow-Methods')).toEqual(
			'GET,HEAD,POST,OPTIONS'
		);
		expect(response.headers.get('Access-Control-Max-Age')).toEqual(
			'86400'
		);
	});
});
