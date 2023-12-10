export class PaginationQueryRequest {
    private _limit: number = 5;
    private _offset: number = 1;
    private readonly maxLimit: number = 50;

    constructor(limit?: number, offset?: number) {
        if (limit !== undefined) {
            this._limit = limit;
        }
        if (offset !== undefined) {
            this._offset = offset;
        }
    }

    public get limit(): number {
        return this._limit;
    }
    public set limit(value: number) {
        this._limit = Math.min(value, this.maxLimit);
    }
    public get offset(): number {
        return this._offset
    }

    public set offset(value: number) {
        this._offset = value;
    }
}