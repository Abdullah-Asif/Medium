import { Router} from "express";
import  UserController   from "../controllers/userController"
import AuthMiddleware from "../middlewares/authMiddleware";
const userRoute = Router();

userRoute.post('/', AuthMiddleware.verify, UserController.createUser);
userRoute.get('/', AuthMiddleware.verify, UserController.getAllUser);
userRoute.get('/:username',AuthMiddleware.verify, UserController.getUserByName)
userRoute.put('/:username', AuthMiddleware.verify, UserController.updateUserByName);
userRoute.get('/:username/blogs', AuthMiddleware.verify, UserController.getBlogsByUserName);
userRoute.delete('/:username', AuthMiddleware.verify, UserController.deleteUserByUserName);

export { userRoute }