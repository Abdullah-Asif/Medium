import { Router} from "express";
import  UserController   from "../controllers/userController"
import AuthMiddleware from "../middlewares/authMiddleware";
import UserValidator from "../../applicaition/validators/userValidator";
const userRoute = Router();

userRoute.post('/', AuthMiddleware.verify, UserValidator.validate, UserController.createUser);
userRoute.get('/', AuthMiddleware.verify, UserController.getAllUser);
userRoute.get('/:username',AuthMiddleware.verify, UserController.getUserByName)
userRoute.put('/:username', AuthMiddleware.verify, UserValidator.validate, UserController.updateUserByName);
userRoute.get('/:username/blogs', AuthMiddleware.verify, UserController.getBlogsByUserName);
userRoute.delete('/:username', AuthMiddleware.verify, UserController.deleteUserByUserName);

export { userRoute }