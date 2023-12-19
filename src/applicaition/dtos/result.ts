export class Result<T> {
    isSuccess: boolean;
    value?: T | null;
    // statusCode?: number;
    error?: string | null;

    constructor(isSuccess: boolean, value?: T | null, error?: string | null) {
        this.isSuccess = isSuccess;
        this.value = value;
        this.error = error;
    }

    static success<T>(value: T | null): Result<T> {
        return new Result<T>(true, value);
    }

    static failure<T>(error: string): Result<T> {
        return new Result<T>(false, undefined, error);
    }
}