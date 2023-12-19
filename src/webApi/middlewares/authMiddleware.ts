import {NextFunction, Request, Response} from "express";
import JwtTokenService from "../../infrastructure/Identity/jwtTokenService";
import {User} from "../../domain/models/user.model";
import exp from "constants";
import {UserDto} from "../../applicaition/dtos/user.dto";
class AuthMiddleware{
    public verify(req: Request, res: Response, next: NextFunction) {
        const authHeaderValue = req.headers.authorization || req.headers.Authorization;
        const authHeader = Array.isArray(authHeaderValue) ? authHeaderValue[0] : authHeaderValue;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json("Unauthorized user");
        }
        const accessToken = authHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json('You are not logged in. Please log in to get access');
        }
        const decoded = JwtTokenService.validate(accessToken, process.env.SECRET_KEY);
        if (decoded) {
            if (!req.user) {
                req.user = new UserDto();
            }
            req.user.username = decoded.username;
            next();
        }
        else {
            return res.status(401).json("Invalid token");
        }
    }
}

export default new AuthMiddleware()
declare global {
    namespace Express {
        interface Request {
            user: UserDto; // Define your custom property here
        }
    }
}