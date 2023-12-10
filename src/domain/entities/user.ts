import {Table, Model, Column, PrimaryKey, DataType, Unique, IsEmail, Validate, HasMany} from "sequelize-typescript";
import {Blog} from "./blog";

@Table({
    tableName: "users",
})
export class User extends Model {

    @PrimaryKey
    @Unique
    @Column({
        field: 'username',
        type: DataType.STRING(255),
    })username!: string;


    @Column({
        field: 'name',
        type: DataType.STRING(255),
    })name!: string


    @IsEmail
    @Column({
        type: DataType.STRING(255),
    }) email!: string



    @Validate({
        isStrongPassword: (value: string) => {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(value)) {
                throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long');
            }
        },
    })
    @Column({
        type: DataType.STRING
    })password!: string;

    @HasMany(() => Blog)
    blogs!: Blog[]

}
