import {NextFunction, Request, Response} from "express";
import JwtTokenService from "../../infrastructure/Identity/jwtTokenService";
import {User} from "../../domain/entities/user";
import exp from "constants";
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
            req.user  = decoded.user;
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
            user?: User; // Define your custom property here
        }
    }
}