export class AuthenticationException extends Error {
    statusCode: number;
    details?: string;

    constructor(message: string = 'Authentication failed', statusCode: number = 401, details?: string) {
        super(message);
        this.name = 'AuthenticationException';
        this.statusCode = statusCode;
        this.details = details;
    }
}
