import UserService from "./userService";
import {User} from "../../domain/models/user.model";
import jwtTokenService from "../../infrastructure/Identity/jwtTokenService";
import { SignInDTO} from "../dtos/signIn.dto";
import {TokenDTO} from "../dtos/token.dto";
import UserRepository from "../../infrastructure/repositories/userRepository";
import {SignUpDto} from "../dtos/signUp.dto";
import Mapper from "../mappings/automapper";
import {Result} from "../dtos/result";
import {AuthenticationException} from "../exceptions/authenticationException";
import {DuplicateUserException} from "../exceptions/duplicateUserException";
class AuthService {
    public async signUp(signUpDto : SignUpDto): Promise<Result<string>>  {
        const usernameExist = await UserRepository.getUserByName(signUpDto.username);
        if (usernameExist) {
            throw new DuplicateUserException("username already exist");
        }
        const userEmailExist = await UserRepository.getUserByEmail(signUpDto.email);
        if (userEmailExist) {
            throw new DuplicateUserException("email already exist");
        }
        const user = Mapper.map(signUpDto, User)
        await UserRepository.create(user);
        return Result.success("User Created Successfully");
    }

    public async signIn(user: SignInDTO): Promise<Result<TokenDTO>>{
        const userEntity = await UserRepository.getUserByName(user.username);
        if (!userEntity) {
            throw new AuthenticationException("Incorrect username");
        }
        if (user.password != userEntity.password) {
            throw new AuthenticationException("Incorrect password");
        }
        const token = jwtTokenService.createToken({username: userEntity.username});
        return Result.success<TokenDTO>(token);
    }
    public async RefreshToken(token: TokenDTO): Promise<Result<string>> {
        const  accessToken =  await jwtTokenService.RefreshToken(token);
        return Result.success<string>(accessToken);
    }
}

export default new AuthService()