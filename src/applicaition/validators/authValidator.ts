import {Request, Response, NextFunction, json} from "express";
import {SignUpDto} from "../dtos/signUp.dto";
import SignUpValidator from "./signUpValidator";
import {isEmpty} from "@automapper/core";
import ContentNegotiation from "../../webApi/utils/contentNegotiation";
import {SignInDTO} from "../dtos/signIn.dto";
import SignInValidator from "./signInValidator";
import {ValidationError} from "sequelize";
import {ValidationErrors} from "fluentvalidation-ts";

class AuthValidator {
    signUp(req: Request, res: Response, next: NextFunction) {
        const signUpDto: SignUpDto = req.body
        const validationResult =  SignUpValidator.validate(signUpDto);
        if (!isEmpty(validationResult)) {
            return ContentNegotiation.sendResponse(req, res, 400, validationResult);
        }
        next();
    }
    signIn(req: Request, res: Response, next: NextFunction) {
        const signInDTO: SignInDTO = req.body
        const validationResult =  SignInValidator.validate(signInDTO);
        if (!isEmpty(validationResult)) {
            return ContentNegotiation.sendResponse(req, res, 400, validationResult);
        }
        next();
    }
}

export default new AuthValidator();

