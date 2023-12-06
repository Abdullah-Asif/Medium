import { Request, Response, Router} from "express";
import  UserController   from "../controllers/userController"
const userRoute = Router();

userRoute.get('/', UserController.getAllUser);
userRoute.get('/:id', UserController.getUserById)
userRoute.put('/:id', UserController.updateUserById);
userRoute.delete('/:id', UserController.deleteUserById);

export { userRoute }