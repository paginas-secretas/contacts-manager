import { DocumentHash } from '../data';

const docHash = 'x-doc-hash';

export function extractDocHash(headers: Headers): DocumentHash | undefined {
	return headers.get(docHash) ?? undefined;
}
