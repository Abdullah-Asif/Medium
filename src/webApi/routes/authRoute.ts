import {Router} from "express";
import AuthController from "../controllers/authController";
import AuthValidator from "../../applicaition/validators/authValidator";

const authRoute = Router();
authRoute.post('/sign-up', AuthValidator.signUp, AuthController.signUp);
authRoute.post('/sign-in', AuthValidator.signIn, AuthController.signIn);
authRoute.post('/refresh-token', AuthController.refreshToken);

export { authRoute }