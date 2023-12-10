import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
@Table({
    tableName: 'tokens'
})
export class RefreshToken extends Model {
    @PrimaryKey
    @Unique
    @Column
    refreshToken!: string

    @Column
    expiresAt!: Date;

    @Column
    valid!: boolean
}
