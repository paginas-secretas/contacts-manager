import { DocumentReference } from '../data';
import { contactsRoute } from './route';

const refPathParameterRegex = new RegExp(`\/${contactsRoute}([^\/]+)`);

export function extractDocRef(url: URL): DocumentReference | undefined {
	return url.pathname.match(refPathParameterRegex)?.at(1);
}
