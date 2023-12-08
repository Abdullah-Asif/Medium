import {Blog} from "../../domain/models/blog";
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
    public async getUsersBlog(username: string) {
        return await Blog.findAll({where: {username}});
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