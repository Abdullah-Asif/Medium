import {Model, Table, PrimaryKey, Column, DataType, Unique, ForeignKey, BelongsTo} from "sequelize-typescript";
import {User} from "./user";
import {Col} from "sequelize/types/utils";

@Table({
    tableName:  "blogs",
})
export class Blog extends Model{

    @PrimaryKey
    @Unique
    @Column({
        type: DataType.UUID,
    })id!: string

    @ForeignKey(() => User)
    @Column
    username!: string

    @BelongsTo(() => User)
    user!: User

    @Column
    title!: string

    @Column
     content!: string
}