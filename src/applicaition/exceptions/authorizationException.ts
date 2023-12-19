export class AuthorizationException extends Error {
    statusCode: number;
    details?: string;

    constructor(message: string = 'Unauthorized access', statusCode: number = 403, details?: string) {
        super(message);
        this.name = 'AuthorizationException';
        this.statusCode = statusCode;
        this.details = details;
    }
}
