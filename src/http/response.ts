export abstract class ErrorResponse extends Response {
	constructor(
		protected readonly message: string | undefined,
		readonly status: number
	) {
		super(message ? JSON.stringify({ message: message }) : undefined, {
			status: status
		});
	}
}

export class NotFoundError extends ErrorResponse {
	constructor() {
		super(undefined, 500);
	}
}
