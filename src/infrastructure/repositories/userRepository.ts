import { User} from "../../domain/models/user";
import e from "express";
class UserRepository {
    constructor() {
    }
    public async create(user: User) {
        await User.create({
            username: user.username,
            name: user.name,
            email: user.email,
            password: user.password
        });
    }

    public async getAll() {
        return await User.findAll();
    }

    public async getUserByName(username: string) {
        return await User.findOne({where: {username}});
    }

    public async update(username: string, user: Partial<User>) {
        await User.update(user, {where: {username}});
    }

    public async delete(username: string) {
        await User.destroy({where: {username}});
    }
}

export default new UserRepository()