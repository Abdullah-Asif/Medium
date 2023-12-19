import { Validator} from "fluentvalidation-ts";
import {BlogDto} from "../dtos/blog.dto";

class BlogDtoValidator extends Validator<BlogDto> {
    constructor() {
        super();
        this.ruleFor('title')
            .notEmpty()
            .withMessage('title can not be empty')
            .notNull()
            .withMessage('title can not be empty or null');

        this.ruleFor('content')
            .notNull()
            .withMessage('content can not be null')
            .notEmpty()
            .withMessage('content can not be empty');
    }
}

export default new BlogDtoValidator();