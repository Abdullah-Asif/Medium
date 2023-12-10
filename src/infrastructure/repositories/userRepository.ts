import { User} from "../../domain/entities/user";
import {PaginationQueryRequest} from "../../domain/models/paginationQueryRequest";
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

    public async getAll(paginationQueryRequest: PaginationQueryRequest) {
        return await User.findAll({limit:paginationQueryRequest.limit, offset: paginationQueryRequest.offset});
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