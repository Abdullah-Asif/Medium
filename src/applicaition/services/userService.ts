import UserRepository  from "../../infrastructure/repositories/userRepository";
import {User} from "../../domain/models/user";

 class UserService {
    constructor() {
    }
    public async  getAllUser() {
        return await UserRepository.getAll();
    }
    public async getUserByName(userName: string) {
        return await UserRepository.getUserByName(userName)
    }
    public async createUser(user: User) {
        await UserRepository.create(user);
    }
    public async updateUser(userName: string, user: User) {
        await UserRepository.update(userName, user);
    }
    public async deleteUser(userName: string) {
        await UserRepository.delete(userName)
    }
}
export default new UserService();