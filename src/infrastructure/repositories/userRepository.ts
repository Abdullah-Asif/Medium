import { User} from "../../domain/models/user.model";
import {PaginationQueryRequest} from "../../applicaition/dtos/paginationQueryRequest.dto";
import {Error, ValidationError} from "sequelize";
import {DatabaseAccessException} from "../../applicaition/exceptions/databaseAccessException";
class UserRepository {
    public async create(user: User): Promise<void> {
        await User.create({
            username: user.username,
            name: user.name,
            email: user.email,
            password: user.password
        });
    }

    public async getAll(paginationQueryRequest: PaginationQueryRequest): Promise<User[]> {
        return await User.findAll({limit:paginationQueryRequest.limit, offset: paginationQueryRequest.offset, });
    }

    public async getUserByName(username: string):Promise<User|null>     {
        return await User.findOne({where: {username}});
    }
    public async getUserByEmail(email: string):Promise<User|null>     {
        return await User.findOne({where: {email}});
    }

    public async update(username: string, user: Partial<User>): Promise<void> {
        await User.update(user, {where: {username: username}});
    }

    public async delete(username: string): Promise<void> {
        await User.destroy({where: {username}});
    }
}
export default new UserRepository()