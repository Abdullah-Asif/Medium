//sign up -> Done
//sign in -> Done
//refreshToken


import UserService from "./userService";
import {User} from "../../domain/entities/user";
import JwtTokenService from "../../infrastructure/Identity/jwtTokenService";
import jwtTokenService from "../../infrastructure/Identity/jwtTokenService";
import { SignInModel} from "../../domain/models/SignInModel";
import {TokenModel} from "../../domain/models/tokenModel";

class AuthService {
    public async signUp(user : User) {
        await UserService.createUser(user);
    }

    public async signIn(user: SignInModel){
        const userEntity = await UserService.getUserByName(user.username);
        if (userEntity == null) {
            return null;
        }
        if (user.password != userEntity.password) {
            return null;
        }
        const token = jwtTokenService.createToken({username: userEntity.username});
        return token;
    }
    public async RefreshToken(token: TokenModel) {
        const tokenEntity = await jwtTokenService.RefreshToken(token);
        return tokenEntity;
    }
}

export default new AuthService()