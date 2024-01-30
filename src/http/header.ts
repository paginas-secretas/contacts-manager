const docHash = 'x-doc-hash'

export function extractDocHash(headers: Headers): string | null {
    return headers.get(docHash);
}