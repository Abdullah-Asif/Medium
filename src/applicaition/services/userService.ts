import UserRepository  from "../../infrastructure/repositories/userRepository";
import {User} from "../../domain/models/user.model";
import {PaginationQueryRequest} from "../dtos/paginationQueryRequest.dto";
import {UserDto} from "../dtos/user.dto";
import Mapper from "../mappings/automapper"
import {NotFoundException} from "../exceptions/notFoundException";

import {Result} from "../dtos/result";
import {AuthorizationException} from "../exceptions/authorizationException";
 class UserService {
    public async  getAllUser(paginationQueryRequest: PaginationQueryRequest): Promise<Result<UserDto[]>> {
         const users = await UserRepository.getAll(paginationQueryRequest);
         const userDtos: UserDto[] = users.map(user => Mapper.map(user.dataValues, UserDto));
         return Result.success<UserDto[]>(userDtos);
    }
    public async getUserByName(userName: string):Promise<Result<UserDto>> {
        const userModel =  await UserRepository.getUserByName(userName);
        if (!userModel) throw new NotFoundException();
        return Result.success(Mapper.map(userModel.dataValues, UserDto));
    }
     public async getUserByEmail(email: string):Promise<Result<UserDto>> {
         const userModel =  await UserRepository.getUserByEmail(email);
         if (!userModel) throw new NotFoundException();
         return Result.success(Mapper.map(userModel.dataValues, UserDto));
     }
    public async createUser(userDto: UserDto) {
        const userModel = Mapper.map(userDto, User);
        await UserRepository.create(userModel.dataValues);
        return Result.success("User created successfully");
    }
    public async updateUser(userName: string, userDto: UserDto, currentUserName: string) {
        const user = await UserRepository.getUserByName(userName);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        if (userDto.username != currentUserName) {
            throw new AuthorizationException()
        }
        const userModel = Mapper.map(userDto, User);
        await UserRepository.update(userName, userModel.dataValues);
        return Result.success("User updated successfully");
    }
    public async  deleteUser(userName: string, currentUserName: string) {
        const user = await UserRepository.getUserByName(userName);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        if (user.username != currentUserName) {
            throw new AuthorizationException()
        }
        await UserRepository.delete(userName)
    }
}
export default new UserService();