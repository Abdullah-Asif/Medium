import jwt, {JwtPayload} from 'jsonwebtoken'
import {RefreshToken} from "../../domain/models/refreshToken.model";
import {TokenDTO} from "../../applicaition/dtos/token.dto";
import {RefreshTokenDTO} from "../../applicaition/dtos/refreshToken.dto";
import {throws} from "assert";
import {AuthenticationException} from "../../applicaition/exceptions/authenticationException";
import {Result} from "../../applicaition/dtos/result";
import {NotFoundException} from "../../applicaition/exceptions/notFoundException";

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
    public createToken(payload: any): TokenDTO {
        const username = payload.username;
        const accessToken = this.createAccessToken(username);
        const refreshToken = this.createRefreshToken(username);
        return { accessToken: accessToken, refreshToken: refreshToken };
    }

    public async RefreshToken(token: RefreshTokenDTO): Promise<string> {
        const refreshToken = token.refreshToken;
        const refreshTokenModel = await RefreshToken.findOne({where: {refreshToken}});
        if (!refreshTokenModel) {
            throw new AuthenticationException("Invalid refresh token");
        }
        const decoded = this.validate(refreshToken,  process.env.SECRET_KEY)
        if (!decoded || !decoded.username) {
            throw new AuthenticationException("Invalid refresh token");
        }
        const expiryTime = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp format
        if (expiryTime && currentTime > expiryTime) {
            await RefreshToken.destroy({where: {refreshToken}});
            throw new AuthenticationException("Refresh token has expired. Please log in");
        }
        const accessToken = this.createAccessToken(decoded.username);
        return accessToken;
    }
    private createAccessToken(username: string): string {
        const accessToken = jwt.sign(
            { username: username },
            process.env.SECRET_KEY as string,
            { algorithm: this.algorithm, expiresIn: '1 h' }
        );
        return accessToken;
    }

    private createRefreshToken(username: string): string {
        const refreshToken = jwt.sign(
            { username: username },
            process.env.SECRET_KEY as string,
            { algorithm: this.algorithm, expiresIn: '1 d' }
        );
        RefreshToken.create(
            {refreshToken: refreshToken}
        );
        return refreshToken;
    }
}

export default new JwtTokenService()