import BlogRepository from "../../infrastructure/repositories/blogRepository";
import {Blog} from "../../domain/models/blog";

class BlogService {
    constructor() {
    }
    public async  getUsersBlog(username: string) {
        return await BlogRepository.getUsersBlog(username);
    }
    public async getBlogById(id: string) {
        return await BlogRepository.getBlogById(id)
    }
    public async createBlog(blog: Blog) {
        await BlogRepository.create(blog);
    }
    public async updateBlog(id: string, content: Blog) {
        await BlogRepository.update(id, content);
    }
    public async deleteBlog(id: string) {
        await BlogRepository.delete(id)
    }
}
export default new BlogService();