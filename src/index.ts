import { Server } from 'http';
import app from './app';
import prisma from './client';
import dotenv from 'dotenv'; // eslint-disable-line

let server: Server;
prisma.$connect().then(() => {
    console.log('Connected to SQL Database');
    server = app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});


const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
