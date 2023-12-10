import {PaginationQueryRequest} from "../../domain/models/paginationQueryRequest";
import { Request, Response} from "express";

export function createPaginationQueryObject(req: Request, res: Response): PaginationQueryRequest {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const limitNumber = limit?parseInt(limit as string, 10) : 5;
    const offsetNumber = offset?parseInt(offset as string, 10) : 1;
    return new PaginationQueryRequest(limitNumber, offsetNumber);
}