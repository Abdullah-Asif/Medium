import express, { Request, Response }  from "express";
import {Blog} from "../../domain/models/blog";
import BlogService from "../../applicaition/services/blogService";
import { v4 as uuidv4 } from 'uuid';

class BlogController {

    public async getBlogsByUserName(req: Request, res: Response) {
        const {username} = req.params;
        const blogs = await BlogService.getUsersBlog(username);
        res.status(200).json(blogs);
    }
    public async getBlogById(req: Request, res: Response) {
        const {id} = req.params;
        const blog = await BlogService.getBlogById(id);
        if (blog == null) {
            return res.status(404).send("Not found")
        }
        res.status(200).json(blog);
    }
    public async createBlog(req: Request, res: Response) {
        try {
            const {username} = req.params;
            const blog: Blog= req.body;
            blog.id = uuidv4();
            blog.username = username;
            await BlogService.createBlog(blog);
            res.status(201).send("Blog created successfully");
        }
        catch(err: any) {
            res.send(err.message);
        }
    }
    public async updateBlog(req: Request, res: Response) {
        try{
            const {id} = req.params;
            const content = req.body;
            await BlogService.updateBlog(id, content);
            res.status(200).send('Blog updated successfully')
        }
        catch (err: any) {
            console.log(err.message);
        }
    }
    public async deleteBlogById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await BlogService.deleteBlog(id);
            res.status(200).send("Blog deleted successfully");
        }
        catch (err: any) {
            console.log(err.message);
        }
    }
}
export default new BlogController()