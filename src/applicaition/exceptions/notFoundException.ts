export class NotFoundException extends Error {
    statusCode: number;
    details?: string;

    constructor(message: string = 'Not Found', statusCode: number = 404, details?: string) {
        super(message);
        this.name = 'NotFoundException';
        this.statusCode = statusCode;
        this.details = details;
    }
}