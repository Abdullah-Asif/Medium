export class DuplicateUserException extends Error {
    statusCode: number;
    details?: string;

    constructor(message: string = 'User already exists', statusCode: number = 409, details?: string) {
        super(message);
        this.name = 'DuplicateUserException';
        this.statusCode = statusCode;
        this.details = details;
    }
}
