export type EncryptedContacts = string;
export type DocumentReference = string;
export type DocumentHash = string;

export interface EncryptedContactsList {
	contacts: EncryptedContacts;
}

export interface PartialEncryptedContactsList {
	ref: DocumentReference;
	hash: DocumentHash
}