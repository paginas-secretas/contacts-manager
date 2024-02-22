export abstract class ErrorResponse extends Response {
	constructor(protected readonly message: string | undefined, status: number) {
		super(message ? JSON.stringify({ message: message }) : undefined, {
			status: status
		});
	}
}

export class NotFoundError extends ErrorResponse {
	constructor() {
		super(undefined, 404);
	}
}

export class CORSResponse extends Response {
	constructor(protected readonly response: Response) {
		super(response.body, response);
		this.headers.set('Access-Control-Allow-Origin', '*');
		this.headers.append('Vary', 'Origin');
	}
}
