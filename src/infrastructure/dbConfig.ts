import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import {Dialect} from "sequelize";
import {User} from "../domain/models/user.model";
import {Blog} from "../domain/models/blog.model";
import {RefreshToken} from "../domain/models/refreshToken.model";
import {logger} from "sequelize/types/utils/logger";
import {sequelize} from "@automapper/sequelize";

dotenv.config();

export class Database {
    url: string = '';
    constructor() {
        if (process.env.NODE_ENV =='test') {
            this.url = process.env.TEST_DB_URL!;
        }
        else{
            this.url = process.env.DB_URL!;
        }
        this.connect();
    }
    private async connect() {
         const sequelize = new Sequelize(this.url,{
             // database: this.database,
             // username: process.env.DB_USER,
             // password: process.env.DB_PASSWORD,
             // host: process.env.HOST,
             models: [User, Blog, RefreshToken],
             dialect: process.env.DB_DIALECT as Dialect,
             logging: true
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

