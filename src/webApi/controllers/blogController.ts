import {NextFunction, Request, Response} from "express";
import BlogService from "../../applicaition/services/blogService";
import { v4 as uuidv4 } from 'uuid';
import {createPaginationQueryObject} from "../utils/pageQueryConverter";
import ContentNegotiation from "../utils/contentNegotiation";
import {BlogDto} from "../../applicaition/dtos/blog.dto";

class BlogController {

    public async getAllBlogsWithPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const paginationRequest = createPaginationQueryObject(req, res);
            const blogs = await BlogService.getAllBlogsWithPagination(paginationRequest);
            return ContentNegotiation.sendResponse(req, res, 200, blogs.value);
        }
        catch (err: any) {
            next(err);
        }
    }

    public async getBlogById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const result = await BlogService.getBlogById(id);
            return ContentNegotiation.sendResponse(req, res, 200, result.value);
        }
        catch (err: any) {
            next(err);
        }
    }

    public async downloadBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const result = await BlogService.downloadBlogAsPDF(id);
            return res.status(200).send(result);
        }
        catch (err: any) {
            next(err);
        }
    }

    public async getTotalBlogsCount(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await BlogService.getTotalBlogsCount();
            return ContentNegotiation.sendResponse(req, res, 200, result.value);
        }
        catch (err: any) {
            next(err);
        }
    }
    public async createBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.user.username!;
            const blog: BlogDto= req.body;
            blog.id = uuidv4();
            blog.username = username;
            const result = await BlogService.createBlog(blog);
            return ContentNegotiation.sendResponse(req, res, 201, result.value);
        }
        catch (err: any){
            next(err);
        }
    }
    public async updateBlog(req: Request, res: Response, next : NextFunction) {
        try {
            const {id} = req.params;
            const currentUserName = req.user.username;
            const content: BlogDto = req.body;
            await BlogService.updateBlog(id, content, currentUserName);
            return ContentNegotiation.sendResponse(req, res, 200, "Blog updated successfully");
        }
        catch (err: any) {
            next(err);
        }
    }
    public async deleteBlogById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const currentUserName = req.user.username;
            await BlogService.deleteBlog(id, currentUserName);
            return ContentNegotiation.sendResponse(req, res, 200, "Blog deleted successfully");
        }
        catch (err: any) {
            next(err);
        }
    }
}
export default new BlogController()