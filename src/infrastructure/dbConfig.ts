import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import {Dialect} from "sequelize";
import {User} from "../domain/entities/user";
import {Blog} from "../domain/entities/blog";
import {RefreshToken} from "../domain/entities/refreshToken";

dotenv.config();

export class Database {
    constructor() {
        this.connect();
    }
    private async connect() {
         const sequelize = new Sequelize({
             database: process.env.DB_NAME,
             username: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             host: process.env.HOST,
             models: [User, Blog, RefreshToken],
             dialect: process.env.DB_DIALECT as Dialect
         });
         try {
             await sequelize.authenticate();
             await sequelize.sync();
             console.log('Database connected successfully')
         }
         catch(err: any){
                console.log('Unable to connect to the database', err.message);
         }
    }
}

