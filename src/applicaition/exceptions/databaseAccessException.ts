export class DatabaseAccessException extends Error {
    statusCode: number;
    details?: string;

    constructor(message: string = 'Database access error', statusCode: number = 500, details?: string) {
        super(message);
        this.name = 'DatabaseAccessException';
        this.statusCode = statusCode;
        this.details = details;
    }
}
