import express, { Request, Response } from 'express';
import { userRoute } from './webApi/routes/userRoute';
import { blogRoute } from "./webApi/routes/blogRoute";
import { authRoute} from "./webApi/routes/authRoute";
import dotenv from 'dotenv';
import {Database} from "./infrastructure/dbConfig";
import {User} from "./domain/models/user.model";
import {UserDto} from "./applicaition/dtos/user.dto";
import {globalExceptionMiddleware} from "./webApi/middlewares/globalExceptionMiddleware";


dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;
const database = new Database();
const user = new UserDto();

//
// console.log('------------------------')
// const sourceObj:UserDto = {username: "asif",
//     name: "Asif",
//     email: "as@gmail.com"
// }
// const destinationObj = mapObjects<UserDto, User>(sourceObj, User);
// console.log(destinationObj.dataValues);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Pants!!!!');
});
app.use('/users', userRoute);
app.use('/blogs', blogRoute);
app.use('/auth', authRoute);
app.use(globalExceptionMiddleware);
//global exception middleware
//cors
//rate limiter

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
