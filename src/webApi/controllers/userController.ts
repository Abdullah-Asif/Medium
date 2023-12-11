import { Request, Response }  from "express";
import { User} from "../../domain/entities/user";
import  UserService  from "../../applicaition/services/userService";
import {createPaginationQueryObject} from "../utils/pageQueryConverter";
import BlogService from "../../applicaition/services/blogService";
import ContentNegotiation from "../utils/contentNegotiation";

class UserController {

    public async getAllUser(req: Request, res: Response) {
        const paginationRequest = createPaginationQueryObject(req, res);
        const users = await UserService.getAllUser(paginationRequest);
        return ContentNegotiation.sendResponse(req, res, 200, users);

    }
    public async getUserByName(req: Request, res: Response) {
        const {username} = req.params;
        const user = await UserService.getUserByName(username);
        if (user == null) {
            return res.status(404).send("User not found");
        }
        return ContentNegotiation.sendResponse(req, res, 200, user);
    }
    public async getBlogsByUserName(req: Request, res: Response) {
        const {username} = req.params;
        const paginationRequest = createPaginationQueryObject(req, res);
        const blogs = await BlogService.getUsersBlogWithPagination(username, paginationRequest);
        return ContentNegotiation.sendResponse(req, res, 200, blogs);
    }
    public async createUser(req: Request, res: Response) {
        try {
            const user: User= req.body;
            await UserService.createUser(user);
            return ContentNegotiation.sendResponse(req, res, 201, "User created successfully");
        }
        catch(err: any) {
            res.send(err.message);
        }
    }
    public async updateUserByName(req: Request, res: Response) {
        try{
            const {username} = req.params;
            const user = req.body;
            await UserService.updateUser(username, user);
            return ContentNegotiation.sendResponse(req, res, 200, "User updated successfully");
        }
        catch (err: any) {
            console.log(err.message);
        }
    }
    public async deleteUserByUserName(req: Request, res: Response) {
        try {
            const {username} = req.params;
            await UserService.deleteUser(username);
            return ContentNegotiation.sendResponse(req, res, 200, "User deleted successfully");
        }
        catch (err: any) {
            console.log(err.message);
        }
    }
}
 export default new UserController()