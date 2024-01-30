import { DocumentHash } from '../data';

const docHash = 'x-doc-hash';

export function extractDocHash(headers: Headers): DocumentHash | null {
	return headers.get(docHash);
}
