import jwt, {JwtPayload} from 'jsonwebtoken'
import {RefreshToken} from "../../domain/entities/refreshToken";
import {TokenModel} from "../../domain/models/tokenModel";
import {RefreshTokenModel} from "../../domain/models/refreshTokenModel";

class JwtTokenService{

    algorithm =  "HS256" as jwt.Algorithm
    constructor() {
    }
    public validate(accessToken: string, secretKey: any): JwtPayload | null  {
        try {
            const decoded = jwt.verify(accessToken, secretKey, {
                algorithms: [this.algorithm]
            }) as JwtPayload
            if (decoded && typeof decoded === 'object' && 'username' in decoded) {
                return decoded;
            } else {
                return null;
            }
        }
        catch (err: any) {
            console.log(err.message);
            return null;
        }
    }
    public createToken(payload: any): TokenModel {
        const username = payload.username;
        const accessToken = jwt.sign(
            { username: username },
            process.env.SECRET_KEY as string,
            { algorithm: this.algorithm, expiresIn: '10m' }
        );
        const refreshTokenModel = this.createRefreshToken();
        RefreshToken.create(
            {refreshToken: refreshTokenModel.refreshToken,
            expiresAt: refreshTokenModel.expiresAt,
            valid: refreshTokenModel.valid}
            );
       return { accessToken: accessToken, refreshToken: refreshTokenModel.refreshToken };
    }

    public async RefreshToken(token: TokenModel) {
        const refreshToken = token.refreshToken;
        const refreshTokenModel = await RefreshToken.findOne({where: {refreshToken}});
        if (refreshTokenModel == null) {
            return null;
        }
        if (!refreshTokenModel?.valid) {
            return null;
        }
        if (new Date() > refreshTokenModel.expiresAt) {
            return null;
        }
        refreshTokenModel.valid = false;
        await RefreshToken.update(refreshTokenModel.dataValues,{where: {refreshToken}});
        const decodedToken = jwt.decode(token.accessToken);
        return this.createToken(decodedToken);

    }
    private createRefreshToken(): RefreshTokenModel {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        const stringLength = 26;

        for (let i = 0; i < stringLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }
        const expirationTime = new Date(new Date().getTime() + 30 * 60000);
        return {
            refreshToken: token,
            expiresAt: expirationTime,
            valid: true
        };
    }
}

export default new JwtTokenService()