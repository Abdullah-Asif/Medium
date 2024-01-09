import AuthController from "../../../src/webApi/controllers/authController";
import mocks from "node-mocks-http";
import AuthService from "../../../src/applicaition/services/authService";
import {NextFunction} from "express";
import {Database} from "../../../src/infrastructure/dbConfig";
import {DuplicateUserException} from "../../../src/applicaition/exceptions/duplicateUserException";
import UserRepository from "../../../src/infrastructure/repositories/userRepository";
import {AuthenticationException} from "../../../src/applicaition/exceptions/authenticationException";

let userSignUpBody = {
    username: 'asif3',
    name: 'Asif Abdullah',
    email: 'asif1@gmail.com',
    password: 'Asif123#'
}

let databaseInstance : Database;

beforeAll(async () => {
    databaseInstance = new Database();
});

describe('AuthController signUp Method',() =>{

    test('Should return 201 for valid signup request', async () =>{
        jest.spyOn(AuthService, 'signUp' );
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "POST",
            body: userSignUpBody
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();
        await AuthController.signUp(req, res, mNext);
        expect(AuthService.signUp).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(201);
    })

    test('Should catch err message of DuplicationUserExist when trying to sign up with existing username', async () =>{
        const mockedError = new DuplicateUserException('username already exist');

        jest.spyOn(AuthService, 'signUp');
        jest.spyOn(UserRepository,'getUserByName');
        jest.spyOn(UserRepository,'getUserByEmail');
        jest.spyOn(UserRepository,'create');
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "POST",
            body: userSignUpBody
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();

        await AuthController.signUp(req, res, mNext);

        expect(AuthService.signUp).toHaveBeenCalledTimes(1);
        expect(UserRepository.getUserByEmail).toHaveBeenCalledTimes(0);
        expect(UserRepository.create).toHaveBeenCalledTimes(0);
        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.statusCode).not.toBe(201);
    })

    test('Should catch err message of DuplicationUserExist when trying to sign up with existing email', async () =>{
        const mockedError = new DuplicateUserException('email already exist');
        jest.spyOn(AuthService, 'signUp');
        jest.spyOn(UserRepository,'getUserByName');
        jest.spyOn(UserRepository,'getUserByEmail');
        jest.spyOn(UserRepository,'create');
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "POST",
            body: userSignUpBody
        });

        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();

        await AuthController.signUp(req, res, mNext);

        expect(AuthService.signUp).toHaveBeenCalledTimes(1);
        expect(UserRepository.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(UserRepository.create).toHaveBeenCalledTimes(0);
        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.statusCode).not.toBe(201);
    })
});

describe('AuthController SignIn method', () => {
    test('Should catch Authentication exception when username is incorrect', async () => {

        // jest.spyOn(AuthService, 'signIn' );
        // jest.spyOn(UserRepository, 'getUserByName');
        const mockedError = new AuthenticationException('Incorrect username');

        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "POST",
            body: {
                username: "asi",
                password: "Asif123#"
            }
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();

        await AuthController.signIn(req, res, mNext);

        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.status).not.toBe(200);
    })

    test('Should catch Authentication exception when password is incorrect', async () => {
        const mockedError = new AuthenticationException('Incorrect password');
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            method: "POST",
            body: {
                username: "asif",
                password: "Asif12#"
            }
        });
        const res = mocks.createResponse();
        const mNext: NextFunction = jest.fn();

        await AuthController.signIn(req, res, mNext);

        expect(mNext).toHaveBeenCalledWith(mockedError);
        expect(res.status).not.toBe(200);
    })
})