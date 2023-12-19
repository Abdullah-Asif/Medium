import { Validator} from "fluentvalidation-ts";
import {UserDto} from "../dtos/user.dto";

class UserDtoValidator extends Validator<UserDto> {
    constructor() {
        super();
        this.ruleFor('username')
            .notEmpty()
            .withMessage('user name can not be empty')
            .notNull()
            .withMessage('user name can not be null')
            .minLength(3)
            .withMessage('username must be minimum 3 character')
            .maxLength(30)
            .withMessage('username can contain maximum 50 characters')
            .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/ )
            .withMessage("user name must contain character and may contain number");


        this.ruleFor('name')
            .notNull()
            .notEmpty()
            .withMessage('name can not be empty or null')
            .minLength(3)
            .withMessage('user name must contain minimum 3 characters')
            .maxLength(50)
            .withMessage('user name can contain maximum 50 characters')
            .matches(/^[A-Za-z\s]+$/)
            .withMessage('name can not contain number, minimum 3 and maximum 50 character');

        this.ruleFor('email')
            .notEmpty()
            .notNull()
            .emailAddress()
            .withMessage('Please enter valid email address');

        this.ruleFor('password')
            .notNull()
            .notEmpty()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/)
            .withMessage('Password must contain at least 6 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
    }
}
export default new UserDtoValidator();
