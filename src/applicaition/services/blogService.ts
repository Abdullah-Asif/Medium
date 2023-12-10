import BlogRepository from "../../infrastructure/repositories/blogRepository";
import {Blog} from "../../domain/entities/blog";
import {PaginationQueryRequest} from "../../domain/models/paginationQueryRequest";

class BlogService {

    public async getAllBlogsWithPagination(paginationQueryRequest: PaginationQueryRequest) {
        return await BlogRepository.getAllBlogsWithPagination(paginationQueryRequest);
    }
    public async  getUsersBlogWithPagination(username: string, paginationQueryRequest: PaginationQueryRequest) {
        return await BlogRepository.getUsersBlogWithPagination(username, paginationQueryRequest);
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