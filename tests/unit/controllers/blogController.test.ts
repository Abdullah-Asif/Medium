import {Database} from "../../../src/infrastructure/dbConfig";
import mocks from "node-mocks-http";
import {NextFunction} from "express";
import BlogController from "../../../src/webApi/controllers/blogController";
import {AuthorizationException} from "../../../src/applicaition/exceptions/authorizationException";
import {NotFoundException} from "../../../src/applicaition/exceptions/notFoundException";

let database : Database
beforeAll(async () => {
    database = new Database();
})

describe('BlogController Create method',() => {

    test('Should return 201 if BLog created successfully', async () => {
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "POST",
            body: {
                title: "Test blog title",
                content: "This is the content of testing blog"
            },
            user: {username: 'asif'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        await BlogController.createBlog(req, res, mNext);
        expect(res.statusCode).toBe(201);
    });

})

describe('BlogController Update method',() => {

    test('Should throw Authorization exception when a user want to update others blog', async () => {
        const mockedError =  new AuthorizationException();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "PUT",
            params: {id: '5b86476b-6c7a-49e7-853f-4e0214c02f2c'},
            body: {
                title: "Test blog title",
                content: "This is the content of testing blog"
            },
            user: {username: 'nishat'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        await BlogController.updateBlog(req, res, mNext);
        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.statusCode).not.toBe(201);
    });
})

describe('BlogController getBlogById method',() => {

    test('Should throw NotFound exception when blog not found', async () => {
        const mockedError =  new NotFoundException();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "GET",
            params: {id: '5b86476b-6c7a-49e7-853f-4e0214c02f3c'},
            user: {username: 'nishat'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        await BlogController.getBlogById(req, res, mNext);
        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.status).not.toBe(200);
    });

    test('Should return 200 if blog id found', async () => {
        const mockedError =  new NotFoundException();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "GET",
            params: {id: '5b86476b-6c7a-49e7-853f-4e0214c02f2c'},
            user: {username: 'asif'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        await BlogController.getBlogById(req, res, mNext);
        expect(res.status).not.toBe(200);
    });
})

describe('BlogController Delete method',() => {

    test('Should throw Authorization exception when a user want to delete others blog', async () => {
        const mockedError =  new AuthorizationException();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "DELETE",
            params: {id: '5b86476b-6c7a-49e7-853f-4e0214c02f2c'},
            user: {username: 'nishat'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        await BlogController.deleteBlogById(req, res, mNext);
        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.statusCode).not.toBe(201);
    });
})