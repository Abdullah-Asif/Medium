import { Request, Response, NextFunction} from "express";
import {AppException} from "../utils/appException";
import {AuthorizationException} from "../../applicaition/exceptions/authorizationException";
import {NotFoundException} from "../../applicaition/exceptions/notFoundException";
import {DatabaseAccessException} from "../../applicaition/exceptions/databaseAccessException";
import {AuthenticationException} from "../../applicaition/exceptions/authenticationException";
import {DuplicateUserException} from "../../applicaition/exceptions/duplicateUserException";
import ContentNegotiation from "../utils/contentNegotiation";
import {ValidationException} from "../../applicaition/exceptions/validationException";
export function globalExceptionMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    res.status(500);

    const isDevelopment = process.env.NODE_ENV === 'development';

    let response: AppException;

    if (err instanceof NotFoundException) {
        response = new AppException(err.message, 404, err.stack);
    } else if (err instanceof AuthorizationException) {
        response = new AppException(err.message, 403, err.stack);
    }else if (err instanceof AuthenticationException) {
        response = new AppException(err.message, 401, err.stack);
    }else if (err instanceof ValidationException) {
        response = new AppException(err.message, 422, err.stack);
    }else if (err instanceof DuplicateUserException) {
        response = new AppException(err.message, 409, err.stack);
    }else if (err instanceof DatabaseAccessException) {
        response = new AppException(err.message, 500, err.stack);
    } else {
        response = new AppException('Server Error', 500, err.stack);
    }

    res.setHeader('Content-Type', 'application/json');
    const json = JSON.stringify(response, null, isDevelopment ? 2 : undefined);
    const jsonObject = JSON.parse(json);
    return ContentNegotiation.sendResponse(req, res, response.statusCode, jsonObject);
}