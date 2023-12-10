import {Router} from "express";
import AuthController from "../controllers/authController";

const authRoute = Router();
authRoute.post('/sign-up', AuthController.signUp);
authRoute.post('/sign-in', AuthController.signIn);
authRoute.post('/refresh-token', AuthController.refreshToken);

export { authRoute }