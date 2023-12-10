import {Request, Response} from "express";
import AuthService from "../../applicaition/services/authService";
import {annotateModelWithIndex} from "sequelize-typescript";
import { SignInModel} from "../../domain/models/SignInModel";
import authService from "../../applicaition/services/authService";

class AuthController {
    public signUp() {

    }
    public async signIn(req: Request, res: Response) {
        const user: SignInModel = req.body
        const result = await AuthService.signIn(user);
        if (result == null) {
            return res.status(401).json("Unauthorized");
        }
        return res.status(200).json(result);
    }

    public async refreshToken(req: Request, res: Response) {
        const tokenModel = req.body;
        const tokenEntity = await AuthService.RefreshToken(tokenModel);
        if (tokenEntity == null) {
            return res.status(400).json("Invalid token");
        }
        return res.status(200).json(tokenEntity);
    }
}
export default new AuthController();