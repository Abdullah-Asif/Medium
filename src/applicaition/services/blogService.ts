import BlogRepository from "../../infrastructure/repositories/blogRepository";
import {Blog} from "../../domain/models/blog.model";
import {PaginationQueryRequest} from "../dtos/paginationQueryRequest.dto";
import Mapper from "../mappings/automapper"
import {BlogDto} from "../dtos/blog.dto";
import {Result} from "../dtos/result";
import {NotFoundException} from "../exceptions/notFoundException";
import {AuthorizationException} from "../exceptions/authorizationException";
import PDFDocument from 'pdfkit';
import fs from 'fs';


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
    public async getTotalBlogsCount(){
        const totalcount = await BlogRepository.getTotalBlogsCount();
        return Result.success<number>(totalcount);
    }

    public async createBlog(blogDto: BlogDto): Promise<Result<BlogDto>> {
        const blog = Mapper.map(blogDto, Blog);
        const createdBlog = await BlogRepository.create(blog);
        return Result.success<BlogDto>(Mapper.map(createdBlog.dataValues, BlogDto));
    }
    public async updateBlog(id: string, blogDto: BlogDto, currentUserName: string): Promise<void> {
        const blogModel = await this.getBlogById(id);

        if(blogModel.value?.username != currentUserName) {
            throw new AuthorizationException();
        }
        const updatedBlog : Partial<Blog> = {
            title: blogDto.title,
            content: blogDto.content
        };
        await BlogRepository.update(id, updatedBlog);
    }
    public async deleteBlog(id: string, currentUserName: string): Promise<void> {
        const blogModel = await this.getBlogById(id);
        if (blogModel.value?.username != currentUserName) {
            throw new AuthorizationException();
        }
        await BlogRepository.delete(id)
    }

    public async downloadBlogAsPDF(id: string): Promise<Buffer> {
        const blogModel = await this.getBlogById(id);

        if (!blogModel.value) {
            throw new NotFoundException();
        }

        const blog = blogModel.value;

        const pdfDoc = new PDFDocument();
        const pdfStream: Buffer[] = [];

        pdfDoc.text(`Title: ${blog.title}`);
        pdfDoc.text(`Author: ${blog.username}`);
        pdfDoc.text(`Content: ${blog.content}`);

        pdfDoc.on('data', (data: Buffer) => pdfStream.push(data));
        pdfDoc.end();

        const headers = {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${blog.title}`
        };

        return new Promise((resolve, reject) => {
            pdfDoc.on('end', () => {
                const pdfBuffer = Buffer.concat(pdfStream);
                resolve(pdfBuffer);
            });

            pdfDoc.on('error', (err: Error) => {
                reject(err);
            });
        });
    }
}
export default new BlogService();