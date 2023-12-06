import { Request, Response }  from "express";

class UserController {
    public getAllUser(req: Request, res: Response) {
        res.send("Demo user list")
    }
    public getUserById(req: Request, res: Response) {
        res.send("Fetching a single user")
    }
    public updateUserById(req: Request, res: Response) {
        res.send("updated user successfully")
    }
    public deleteUserById(req: Request, res: Response) {
        res.send("deleted a single user ")
    }
}

export default new UserController();



