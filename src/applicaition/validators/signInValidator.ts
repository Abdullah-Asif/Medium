import { Validator} from "fluentvalidation-ts";
import {SignInDTO} from "../dtos/signIn.dto";

class SignInValidator extends Validator<SignInDTO> {
    constructor() {
        super();
        this.ruleFor('username')
            .notEmpty()
            .withMessage('user name can not be empty')
            .notNull()
            .withMessage('user name can not be empty or null');

        this.ruleFor('password')
            .notNull()
            .notEmpty()
            .withMessage('password can not be empty');
    }
}
export default new SignInValidator();
