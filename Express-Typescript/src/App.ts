import express, { Application } from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
// import compression from 'compression';
// import helmet from 'helmet';
// import morgan from 'morgan';
import ErrorMiddleware from './middlewares/error.middleware.js';
import Controller from './utils/interfaces/controller.interface.js';

export class App {
    public express: Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase();
        this.initializeErrorHandling();
        this.listen();
    }
    private initializeMiddlewares(): void {
        this.express.use(express.json());
        // this.express.use(cors());
        // this.express.use(compression());
        // this.express.use(helmet());
        // this.express.use(morgan('dev'));
        this.express.use(express.urlencoded({ extended: true }));
    }
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/', controller.router);
        });
    }
    private connectToDatabase(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.connect(
            `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        );
    }
    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }
    public listen() {
        this.express.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
