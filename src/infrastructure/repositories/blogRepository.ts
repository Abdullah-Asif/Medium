import {Blog} from "../../domain/entities/blog";
import {PaginationQueryRequest} from "../../domain/models/paginationQueryRequest";
class BlogRepository {
    constructor() {
    }
    public async create(blog: Blog) {
        await Blog.create({
            id: blog.id,
            username: blog.username,
            title: blog.title,
            content: blog.content,
        });
    }
    public async getAllBlogsWithPagination(paginationQueryRequest: PaginationQueryRequest) {
        return await Blog.findAll({limit: paginationQueryRequest.limit, offset: paginationQueryRequest.offset});
    }
    public async getUsersBlogWithPagination(username: string, paginationQueryRequest: PaginationQueryRequest) {
        return await Blog.findAll({limit: paginationQueryRequest.limit, offset: paginationQueryRequest.offset, where: {username}});
    }
    public async getBlogById(id: string) {
        return await Blog.findOne({where: {id}});
    }

    public async update(id: string, content: Partial<Blog>) {
        await Blog.update(content, {where: {id}});
    }
    public async delete(id: string) {
        await Blog.destroy({where: {id}});
    }
}

export default new BlogRepository()