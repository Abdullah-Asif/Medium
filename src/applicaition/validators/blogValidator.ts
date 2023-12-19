import {NextFunction, Request, Response} from "express";
import {isEmpty} from "@automapper/core";
import ContentNegotiation from "../../webApi/utils/contentNegotiation";
import BlogDtoValidator from "./blogDtoValidator";
import {BlogDto} from "../dtos/blog.dto";
class BlogValidator {
    public validate(req: Request, res: Response, next: NextFunction) {
        const blog: BlogDto= req.body;
        const validationResult = BlogDtoValidator.validate(blog);
        if (!isEmpty(validationResult)) {
            return ContentNegotiation.sendResponse(req, res, 400, validationResult);
        }
        next();
    }
}

export default new BlogValidator();