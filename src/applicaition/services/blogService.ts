import BlogRepository from "../../infrastructure/repositories/blogRepository";
import {Blog} from "../../domain/models/blog.model";
import {PaginationQueryRequest} from "../dtos/paginationQueryRequest.dto";
import Mapper from "../mappings/automapper"
import {BlogDto} from "../dtos/blog.dto";
import BlogValidator from "../validators/blogDtoValidator";
import {Result} from "../dtos/result";
import {NotFoundException} from "../exceptions/notFoundException";
import {AuthorizationException} from "../exceptions/authorizationException";

class BlogService {

    public async getAllBlogsWithPagination(paginationQueryRequest: PaginationQueryRequest): Promise<Result<BlogDto[]>>{
        const blogs =  await BlogRepository.getAllBlogsWithPagination(paginationQueryRequest);
        const blogDtos = blogs.map(blog => Mapper.map(blog.dataValues, BlogDto));
        return Result.success<BlogDto[]>(blogDtos);
    }
    public async  getUsersBlogWithPagination(username: string, paginationQueryRequest: PaginationQueryRequest) :Promise<Result<BlogDto[]>> {
        const blogs =  await BlogRepository.getUsersBlogWithPagination(username, paginationQueryRequest);
        const blogDtos = blogs.map(blog => Mapper.map(blog.dataValues, BlogDto));
        return Result.success<BlogDto[]>(blogDtos);
    }
    public async getBlogById(id: string): Promise<Result<BlogDto>> {
        const blog = await BlogRepository.getBlogById(id)
        if (!blog) throw new NotFoundException();
        return Result.success<BlogDto>(Mapper.map(blog.dataValues, BlogDto));
    }
    public async createBlog(blogDto: BlogDto): Promise<void> {
        const blog = Mapper.map(blogDto, Blog);
        await BlogRepository.create(blog);
    }
    public async updateBlog(id: string, content: BlogDto, currentUserName: string): Promise<void> {

        const blogModel = await this.getBlogById(id);
        if(blogModel.value?.username != currentUserName) {
            throw new AuthorizationException();
        }
        const blog = Mapper.map(content, Blog);
        await BlogRepository.update(id, blog);
    }
    public async deleteBlog(id: string, currentUserName: string): Promise<void> {
        const blogModel = await this.getBlogById(id);
        if (blogModel.value?.username != currentUserName) {
            throw new AuthorizationException();
        }
        await BlogRepository.delete(id)
    }
}
export default new BlogService();