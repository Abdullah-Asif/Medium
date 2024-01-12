import {NextFunction, Request, Response} from "express";
import  UserService  from "../../applicaition/services/userService";
import {createPaginationQueryObject} from "../utils/pageQueryConverter";
import BlogService from "../../applicaition/services/blogService";
import ContentNegotiation from "../utils/contentNegotiation";
import {UserDto} from "../../applicaition/dtos/user.dto";

class UserController {

    public async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            const paginationRequest = createPaginationQueryObject(req, res);
            const users = await UserService.getAllUser(paginationRequest);
            return ContentNegotiation.sendResponse(req, res, 200, users.value);
        }
        catch (err: any) {
            next(err);
        }
    }
    public async getUserByName(req: Request, res: Response, next: NextFunction) {
        try {
            const {username} = req.params;
            const result = await UserService.getUserByName(username);
            return ContentNegotiation.sendResponse(req, res, 200, result.value);
        }
        catch (err: any) {
            next(err);
        }
    }
    public async getBlogsByUserName(req: Request, res: Response, next: NextFunction) {
        try {
            const {username} = req.params;
            const paginationRequest = createPaginationQueryObject(req, res);
            const blogs = await BlogService.getUsersBlogWithPagination(username, paginationRequest);
            return ContentNegotiation.sendResponse(req, res, 200, blogs);
        }
        catch (err: any) {
            next(err);
        }
    }
    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user: UserDto= req.body;
            await UserService.createUser(user);
            return ContentNegotiation.sendResponse(req, res, 201, "User created successfully");
        }
        catch(err: any) {
            next(err);
        }
    }
    public async updateUserByName(req: Request, res: Response, next: NextFunction) {
        try{
            const {username} = req.params;
            const currentUserName = req.user.username;
            const user:UserDto = req.body;
            await UserService.updateUser(username, user, currentUserName);
            return ContentNegotiation.sendResponse(req, res, 204, "User updated successfully");
        }
        catch (err: any) {
            next(err);
        }
    }

    public async deleteUserByUserName(req: Request, res: Response, next: NextFunction) {
        try {
            const {username} = req.params;
            const currentUserName = req.user.username;
            await UserService.deleteUser(username, currentUserName);
            return ContentNegotiation.sendResponse(req, res, 204, "User deleted successfully");
        }
        catch (err: any) {
            next(err);
        }
    }
}
 export default new UserController()