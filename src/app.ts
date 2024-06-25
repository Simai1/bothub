import express, {Express} from 'express';
import dotenv from 'dotenv'; // eslint-disable-line
import corsMiddleware from './middlewares/cors';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

import authRoute from './routes/auth';
import usersRoute from './routes/users';
import booksRoute from './routes/books';

const app: Express = express();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(cookieParser());

app.use('/users', authRoute);
app.use('/users', usersRoute);
app.use('/books', booksRoute);
export default app;
