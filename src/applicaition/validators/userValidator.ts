import {NextFunction, Request, Response} from "express";
import {UserDto} from "../dtos/user.dto";
import UserDtoValidator from "./userDtoValidator";
import {isEmpty} from "@automapper/core";
import ContentNegotiation from "../../webApi/utils/contentNegotiation";

class UserValidator {
    public validate(req: Request, res: Response, next: NextFunction) {
        const user: UserDto= req.body;
        const validationResult = UserDtoValidator.validate(user);
        if (!isEmpty(validationResult)) {
            return ContentNegotiation.sendResponse(req, res, 400, validationResult);
        }
        next();
    }
}

export default new UserValidator();