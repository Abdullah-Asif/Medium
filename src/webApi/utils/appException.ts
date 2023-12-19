export class AppException extends Error{
    statusCode: number;
    message: string;
    details?: string;

    constructor(message: string, statusCode: number, details?: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.details = details;
    }
    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            details: this.details,
        };
    }
}