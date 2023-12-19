import {Model, Table, PrimaryKey, Column, DataType, Unique, ForeignKey, BelongsTo} from "sequelize-typescript";
import {User} from "./user.model";
import {Col} from "sequelize/types/utils";
import {DataTypes} from "sequelize";
import {AutoMap} from "@automapper/classes";

@Table({
    tableName:  "blogs",
})
export class Blog extends Model{
    @AutoMap()
    @PrimaryKey
    @Unique
    @Column({
        type: DataType.UUID,
    })id!: string

    @AutoMap()
    @ForeignKey(() => User)
    @Column
    username!: string

    @BelongsTo(() => User)
    user!: User

    @AutoMap()
    @Column
    title!: string


    @AutoMap()
    @Column({
        type: DataType.TEXT
    })
     content!: string
}