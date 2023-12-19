import {Blog} from "../../domain/models/blog.model";
import {PaginationQueryRequest} from "../../applicaition/dtos/paginationQueryRequest.dto";
import {DatabaseAccessException} from "../../applicaition/exceptions/databaseAccessException";
class BlogRepository {
    constructor() {
    }
    public async create(blog: Blog): Promise<void> {
        await Blog.create({
            id: blog.id,
            username: blog.username,
            title: blog.title,
            content: blog.content
        });

    }
    public async getAllBlogsWithPagination(paginationQueryRequest: PaginationQueryRequest): Promise<Blog[]> {
        return await Blog.findAll({limit: paginationQueryRequest.limit, offset: paginationQueryRequest.offset});
    }
    public async getUsersBlogWithPagination(username: string, paginationQueryRequest: PaginationQueryRequest): Promise<Blog[]> {
        return await Blog.findAll({limit: paginationQueryRequest.limit, offset: paginationQueryRequest.offset, where: {username}});
    }
    public async getBlogById(id: string) : Promise<Blog|null>{
        return await Blog.findOne({where: {id}});
    }

    public async update(id: string, content: Partial<Blog>) : Promise<void>{
        await Blog.update(content, {where: {id}});
    }
    public async delete(id: string): Promise<void> {
        await Blog.destroy({where: {id}});
    }
}

export default new BlogRepository()