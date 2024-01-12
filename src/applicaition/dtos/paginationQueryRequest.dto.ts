export class PaginationQueryRequest {
    private _limit: number = 5;
    private _offset: number = 1;
    private _maxLimit: number = 50;

    constructor(limit?: number, offset?: number) {
        if (limit !== undefined) {
            this.limit = limit;
        }
        if (offset !== undefined) {
            this.offset = offset;
        }
    }

    public get limit(): number {
        return this._limit;
    }

    public set limit(value: number) {
        // Apply a max limit to prevent exceeding the allowed maximum
        this._limit = Math.min(value, this.maxLimit);
    }

    public get offset(): number {
        return this._offset;
    }

    public set offset(value: number) {
        this._offset = Math.max(1, value);
    }

    public get maxLimit(): number {
        return this._maxLimit;
    }
}
