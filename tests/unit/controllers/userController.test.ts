import {Database} from "../../../src/infrastructure/dbConfig";
import mocks from "node-mocks-http";
import {NextFunction} from "express";
import UserController from "../../../src/webApi/controllers/userController";
import {NotFoundException} from "../../../src/applicaition/exceptions/notFoundException";
import {AuthorizationException} from "../../../src/applicaition/exceptions/authorizationException";



let database : Database
beforeAll(async () => {
    database = new Database();
})

describe('UserController GetUserByName method', () => {
    test('Should return 200 when username exist',() => {
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "GET",
            user: {username: 'asif'},
            params: {username: 'asif'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        UserController.getUserByName(req, res, mNext);
        expect(res.statusCode).toBe(200);
    })


    test('Should throw NotFound Exception when username not found',async () => {
        const mockedError =  new NotFoundException();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "GET",
            user: {username: 'asif'},
            params: {username: 'as'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        await UserController.getUserByName(req, res, mNext);
        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.status).not.toBe(200);
    })
})

describe('User Controller update method', () =>{
    test('Update user should throw Authorization Exception when a user trying to update another user', async () => {
        const mockedError =  new AuthorizationException();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "PUT",
            params: {username: 'asif1'},
            body: {
                user: 'Abdullah Al Asif'
            },
            user: {username: 'ranak'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();

        await UserController.updateUserByName(req, res, mNext);
        expect(mNext).toHaveBeenCalledWith(mockedError)
    })
})

describe('User Controller Delete method', () =>{
    test('Delete user should throw Authorization Exception when a user trying to delete another user', async () => {
        const mockedError =  new AuthorizationException();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "DELETE",
            params: {username: 'asif1'},
            body: {
                user: 'Abdullah Al Asif'
            },
            user: {username: 'ranak'}
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();

        await UserController.deleteUserByUserName(req, res, mNext);
        expect(mNext).toHaveBeenCalledWith(mockedError)
    })
})
