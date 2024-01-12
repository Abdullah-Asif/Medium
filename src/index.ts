import express, { Request, Response } from 'express';
import { userRoute } from './webApi/routes/userRoute';
import { blogRoute } from "./webApi/routes/blogRoute";
import { authRoute} from "./webApi/routes/authRoute";
import dotenv from 'dotenv';
import {Database} from "./infrastructure/dbConfig";
import {User} from "./domain/models/user.model";
import {UserDto} from "./applicaition/dtos/user.dto";
import {globalExceptionMiddleware} from "./webApi/middlewares/globalExceptionMiddleware"
import cors from 'cors';


dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());

const port = process.env.PORT;
const database = new Database();

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
