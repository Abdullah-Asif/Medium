import { Request, Response} from "express";
import {Result} from "../../applicaition/dtos/result";
export class BaseApiController {
    public handleResult<T>(result: Result<T>, res: Response): Response {
        if (!result) {
            return res.status(404).send('Not Found');
        }

        if (result.isSuccess && result.value !== null) {
            return res.status(200).json(result.value);
        }

        if (result.isSuccess && result.value === null) {
            return res.status(404).send('Not Found');
        }
        return res.status(400).send(result.error);
    }
}
