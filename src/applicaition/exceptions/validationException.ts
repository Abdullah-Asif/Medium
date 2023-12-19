export class ValidationException extends Error {
    statusCode: number;
    details?: string;

    constructor(message: string = 'Validation failed', statusCode: number = 422, details?: string) {
        super(message);
        this.name = 'ValidationException';
        this.statusCode = statusCode;
        this.details = details;
    }
}
