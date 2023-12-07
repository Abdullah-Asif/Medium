import { Router} from "express";
import  UserController   from "../controllers/userController"
const userRoute = Router();

userRoute.post('/',UserController.createUser);
userRoute.get('/', UserController.getAllUser);
userRoute.get('/:username', UserController.getUserByName)
userRoute.put('/:username', UserController.updateUserByName);
userRoute.delete('/:username', UserController.deleteUserByUserName);

export { userRoute }