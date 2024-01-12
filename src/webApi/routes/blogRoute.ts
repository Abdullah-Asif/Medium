import { Router } from "express";
import BlogController from "../controllers/blogController";
import AuthMiddleware from "../middlewares/authMiddleware";
const blogRoute = Router();

blogRoute.get("/", BlogController.getAllBlogsWithPagination);
blogRoute.get("/count", BlogController.getTotalBlogsCount);
blogRoute.get("/:id", BlogController.getBlogById);
blogRoute.get("/:id/download", BlogController.downloadBlog);
blogRoute.post("/", AuthMiddleware.verify, BlogController.createBlog);
blogRoute.put("/:id", AuthMiddleware.verify, BlogController.updateBlog);
blogRoute.delete("/:id", AuthMiddleware.verify, BlogController.deleteBlogById);

export { blogRoute };
