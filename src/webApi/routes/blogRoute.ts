import { Router} from "express";
import BlogController from "../controllers/blogController";
const blogRoute = Router();

// blogRoute.post('/',BlogController.createBlog);
// blogRoute.get('/:username', BlogController.getBlogsByUserName);
blogRoute.get('/:id', BlogController.getBlogById);
blogRoute.put('/:id', BlogController.updateBlog);
blogRoute.delete('/:id', BlogController.deleteBlogById);

export { blogRoute }