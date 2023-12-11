import {Request, Response} from "express";
import AuthService from "../../applicaition/services/authService";
import {annotateModelWithIndex} from "sequelize-typescript";
import { SignInModel} from "../../domain/models/SignInModel";
import ContentNegotiation from "../utils/contentNegotiation";
class AuthController {
    public signUp() {

    }
    public async signIn(req: Request, res: Response) {
        const user: SignInModel = req.body
        const result = await AuthService.signIn(user);
        if (result == null) {
            return res.status(401).json("Unauthorized");
        }
        return ContentNegotiation.sendResponse(req, res, 200, result);
    }

    public async refreshToken(req: Request, res: Response) {
        const tokenModel = req.body;
        const tokenEntity = await AuthService.RefreshToken(tokenModel);
        if (tokenEntity == null) {
            return res.status(400).json("Invalid token");
        }
        return ContentNegotiation.sendResponse(req, res, 200, tokenEntity);
    }
}
export default new AuthController();