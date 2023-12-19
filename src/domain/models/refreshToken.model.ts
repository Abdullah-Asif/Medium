import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {AutoMap} from "@automapper/classes";
@Table({
    tableName: 'tokens'
})
export class RefreshToken extends Model {
    @PrimaryKey
    @Unique
    @Column
    refreshToken!: string

}
