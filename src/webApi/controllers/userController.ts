import { Request, Response }  from "express";
import { User} from "../../domain/models/user";
import  UserService  from "../../applicaition/services/userService";

class UserController {

    public async getAllUser(req: Request, res: Response) {
        const user = await UserService.getAllUser();
        res.status(200).json(user);
    }
    public async getUserByName(req: Request, res: Response) {
        const {username} = req.params;
        const user = await UserService.getUserByName(username);
        res.status(200).json(user);
    }
    public async createUser(req: Request, res: Response) {
        try {
            const user: User= req.body;
            await UserService.createUser(user);
            res.status(201).send("User created successfully");
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
            res.status(200).send('User updated successfully')
        }
        catch (err: any) {
            console.log(err.message);
        }
    }
    public async deleteUserByUserName(req: Request, res: Response) {
        try {
            const {username} = req.params;
            await UserService.deleteUser(username);
            res.status(200).send("User deleted successfully");
        }
        catch (err: any) {
            console.log(err.message);
        }
    }
}
 export default new UserController()