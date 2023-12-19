import {NextFunction, Request, Response} from "express";
import AuthService from "../../applicaition/services/authService";
import { SignInDTO} from "../../applicaition/dtos/signIn.dto";
import ContentNegotiation from "../utils/contentNegotiation";
import {SignUpDto} from "../../applicaition/dtos/signUp.dto";

class AuthController{
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const signUpDto: SignUpDto = req.body
            const result = await AuthService.signUp(signUpDto);
            return ContentNegotiation.sendResponse(req, res, 201, result.value);
        }
        catch (err: any) {
            next(err);
        }
    }
    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const user: SignInDTO = req.body
            const result = await AuthService.signIn(user);
            return ContentNegotiation.sendResponse(req, res, 200, result.value);
        }
        catch (err: any) {
            next(err);
        }
    }

    public async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenModel = req.body;
            const result = await AuthService.RefreshToken(tokenModel);
            return ContentNegotiation.sendResponse(req, res, 200, result.value);
        }
        catch (err: any) {
            next(err);
        }
    }
}
export default new AuthController();