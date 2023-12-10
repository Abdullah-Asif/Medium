import { Router} from "express";
import BlogController from "../controllers/blogController";
import AuthMiddleware from "../middlewares/authMiddleware";
const blogRoute = Router();

blogRoute.get('/', AuthMiddleware.verify, BlogController.getAllBlogs);
blogRoute.get('/:id', AuthMiddleware.verify, BlogController.getBlogById);
blogRoute.post('/',AuthMiddleware.verify, BlogController.createBlog);
blogRoute.put('/:id', AuthMiddleware.verify, BlogController.updateBlog);
blogRoute.delete('/:id', AuthMiddleware.verify, BlogController.deleteBlogById);

export { blogRoute }